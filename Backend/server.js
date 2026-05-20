const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const app = express();

// Cấu hình CORS mở cổng cho Frontend

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await poolPromise.query(
      `
      SELECT *
      FROM Customer
      WHERE Email = ? AND Password = ?
      `,
      [email, password],
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Sai email hoặc mật khẩu",
      });
    }

    const user = users[0];

    res.status(200).json({
      success: true,
      user: {
        CustomerID: user.CustomerID,
        FullName: user.FullName,
        Email: user.Email,
      },
    });
  } catch (err) {
    console.error("Lỗi login:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const dbConfig = {
  host: "localhost",
  database: "StoreManagementDB",
  user: "root",
  password: "Toan@2025",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Khởi tạo kết nối tổng duy nhất
const poolPromise = mysql.createPool(dbConfig);

// Test kết nối MySQL
(async () => {
  try {
    const connection = await poolPromise.getConnection();

    console.log("✅ Kết nối MySQL StoreManagementDB thành công!");

    connection.release();
  } catch (err) {
    console.error("❌ Lỗi kết nối CSDL MySQL:", err.message);
  }
})();

// ==========================================================
// API ĐĂNG NHẬP
// ==========================================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra thiếu dữ liệu
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập email và mật khẩu",
      });
    }

    // Tìm user trong DB
    const [users] = await poolPromise.query(
      `
      SELECT *
      FROM Customer
      WHERE Email = ? AND Password = ?
      `,
      [email, password],
    );

    // Sai tài khoản
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Sai email hoặc mật khẩu",
      });
    }

    // Thành công
    const user = users[0];

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        CustomerID: user.CustomerID,
        FullName: user.FullName,
        Email: user.Email,
      },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ====================================================================
// API REGISTER
// ====================================================================
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;

    // Kiểm tra dữ liệu
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    // Kiểm tra email tồn tại
    const [emailCheck] = await poolPromise.query(
      "SELECT * FROM Customer WHERE Email = ?",
      [email],
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
    }

    // Insert user
    await poolPromise.query(
      `
      INSERT INTO Customer
      (
        FullName,
        Email,
        Password,
        PhoneNumber,
        Address,
        RegisterDate,
        Status
      )
      VALUES (?, ?, ?, ?, ?, NOW(), ?)
      `,
      [fullName, email, password, phoneNumber || "", address || "", "Active"],
    );

    res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
    });
  } catch (err) {
    console.error("Lỗi register:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// ====================================================================
// ĐẦU DÂY 1: API THÊM SẢN PHẨM & TỰ ĐỘNG ĐỒNG BỘ HÓA SẢN PHẨM ẢO
// ====================================================================
app.post("/api/cart/add", async (req, res) => {
  try {
    const {
      CustomerID,
      ProductID,
      ProductName,
      Price,
      Image,
      Quantity,
      isBuyNow,
    } = req.body;

    // 1. Kiểm tra sản phẩm đã có dưới CSDL thật chưa
    let [productCheck] = await poolPromise.query(
      "SELECT Stock FROM Product WHERE ProductID = ?",
      [ProductID],
    );

    // Nếu chưa có -> Tự động nạp sản phẩm ảo này thành hàng thật
    if (productCheck.length === 0) {
      console.log(
        `📌 Phát hiện sản phẩm mới: ${ProductName}. Đang tự động nạp vào MySQL...`,
      );

      await poolPromise.query(
        `INSERT INTO Product
        (ProductID, CategoryID, SupplierID, ProductName, Price, Stock, Image)
        VALUES (?, 2, 2, ?, ?, 100, ?)`,
        [ProductID, ProductName, Price, Image],
      );

      // Gán giá trị tồn kho mặc định sau khi tạo thành công
      productCheck = [{ Stock: 100 }];
    }

    const currentStock = productCheck[0].Stock;

    // 2. Lấy hoặc tạo mới Giỏ hàng (Cart)
    let [cartCheck] = await poolPromise.query(
      "SELECT CartID FROM Cart WHERE CustomerID = ?",
      [CustomerID],
    );

    let cartId;

    if (cartCheck.length === 0) {
      const [newCart] = await poolPromise.query(
        "INSERT INTO Cart (CustomerID) VALUES (?)",
        [CustomerID],
      );

      cartId = newCart.insertId;
    } else {
      cartId = cartCheck[0].CartID;
    }

    // 3. Kiểm tra sản phẩm trong chi tiết giỏ hàng
    let [detailCheck] = await poolPromise.query(
      `SELECT Cart_DetailID, Quantity
       FROM Cart_Detail
       WHERE CartID = ? AND ProductID = ?`,
      [cartId, ProductID],
    );

    let quantityInCart = detailCheck.length > 0 ? detailCheck[0].Quantity : 0;

    let totalRequestedQuantity = quantityInCart + parseInt(Quantity);

    if (totalRequestedQuantity > currentStock) {
      return res.status(400).json({
        error: `Kho chỉ còn ${currentStock} sản phẩm`,
      });
    }

    if (detailCheck.length > 0) {
      await poolPromise.query(
        `UPDATE Cart_Detail
         SET Quantity = ?
         WHERE CartID = ? AND ProductID = ?`,
        [totalRequestedQuantity, cartId, ProductID],
      );
    } else {
      await poolPromise.query(
        `INSERT INTO Cart_Detail
        (CartID, ProductID, Quantity)
        VALUES (?, ?, ?)`,
        [cartId, ProductID, Quantity],
      );
    }

    res.status(200).json({
      message: "Thêm vào giỏ hàng thành công",
      isBuyNow: isBuyNow || false,
    });
  } catch (err) {
    console.error("Lỗi thêm giỏ hàng:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ====================================================================
// ĐẦU DÂY 2: API LẤY DANH SÁCH GIỎ HÀNG
// ====================================================================
app.get("/api/cart/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const [result] = await poolPromise.query(
      `
      SELECT
        cd.Cart_DetailID,
        p.ProductID,
        p.ProductName,
        p.Price,
        p.Image,
        cd.Quantity,
        (p.Price * cd.Quantity) AS SubTotal
      FROM Cart c
      JOIN Cart_Detail cd ON c.CartID = cd.CartID
      JOIN Product p ON cd.ProductID = p.ProductID
      WHERE c.CustomerID = ?
      `,
      [customerId],
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi lấy danh sách giỏ hàng:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ====================================================================
// API 3: GIẢM SỐ LƯỢNG SẢN PHẨM TRONG GIỎ HÀNG
// ====================================================================
app.post("/api/cart/decrease", async (req, res) => {
  try {
    const { CustomerID, ProductID } = req.body;

    // Lấy hoặc tìm Giỏ hàng (CartID) của khách
    let [cartCheck] = await poolPromise.query(
      "SELECT CartID FROM Cart WHERE CustomerID = ?",
      [CustomerID],
    );

    if (cartCheck.length > 0) {
      const cartId = cartCheck[0].CartID;

      // Kiểm tra số lượng hiện tại trong giỏ
      let [detailCheck] = await poolPromise.query(
        `SELECT Quantity
         FROM Cart_Detail
         WHERE CartID = ? AND ProductID = ?`,
        [cartId, ProductID],
      );

      if (detailCheck.length > 0) {
        let currentQty = detailCheck[0].Quantity;

        // Nếu số lượng lớn hơn 1 thì mới giảm tiếp
        if (currentQty > 1) {
          await poolPromise.query(
            `UPDATE Cart_Detail
             SET Quantity = Quantity - 1
             WHERE CartID = ? AND ProductID = ?`,
            [cartId, ProductID],
          );
        }
      }
    }

    res.status(200).json({
      message: "Giảm số lượng thành công",
    });
  } catch (err) {
    console.error("Lỗi giảm số lượng:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ====================================================================
// API 4: XÓA HẲN SẢN PHẨM KHỎI GIỎ HÀNG
// ====================================================================
app.post("/api/cart/remove", async (req, res) => {
  try {
    const { CustomerID, ProductID } = req.body;

    let [cartCheck] = await poolPromise.query(
      "SELECT CartID FROM Cart WHERE CustomerID = ?",
      [CustomerID],
    );

    if (cartCheck.length > 0) {
      const cartId = cartCheck[0].CartID;

      // Tiến hành xóa bản ghi khỏi bảng Cart_Detail
      await poolPromise.query(
        `DELETE FROM Cart_Detail
         WHERE CartID = ? AND ProductID = ?`,
        [cartId, ProductID],
      );
    }

    res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (err) {
    console.error("Lỗi xóa sản phẩm:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ====================================================================
// API 5: ĐẾM TỔNG SỐ LƯỢNG SẢN PHẨM TRONG GIỎ ĐỂ HIỂN THỊ LÊN NAVBAR
// ====================================================================
app.get("/api/cart/count/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // 1. Kiểm tra xem khách hàng này đã từng có Giỏ hàng chưa
    let [cartCheck] = await poolPromise.query(
      "SELECT CartID FROM Cart WHERE CustomerID = ?",
      [customerId],
    );

    let cartId;

    // Nếu chưa từng có giỏ hàng, tự tạo mồi luôn 1 giỏ trống
    if (cartCheck.length === 0) {
      const [newCart] = await poolPromise.query(
        "INSERT INTO Cart (CustomerID) VALUES (?)",
        [customerId],
      );

      cartId = newCart.insertId;
    } else {
      cartId = cartCheck[0].CartID;
    }

    // 2. Đếm số LOẠI sản phẩm
    const [result] = await poolPromise.query(
      `SELECT COUNT(ProductID) AS TotalLines
       FROM Cart_Detail
       WHERE CartID = ?`,
      [cartId],
    );

    // Trả về số loại dòng sản phẩm thực tế
    res.status(200).json({
      total: result[0].TotalLines,
    });
  } catch (err) {
    console.error("Lỗi đếm số loại giỏ hàng:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ====================================================================
// API 6: XỬ LÝ ĐẶT HÀNG VÀ THANH TOÁN
// ====================================================================
app.post("/api/checkout/place-order", async (req, res) => {
  try {
    const { CustomerID } = req.body;

    console.log("\n=== BẮT ĐẦU CHỐT ĐƠN ===");

    // 1. Tìm Giỏ hàng
    let [cartCheck] = await poolPromise.query(
      "SELECT CartID FROM Cart WHERE CustomerID = ?",
      [CustomerID],
    );

    if (cartCheck.length === 0) {
      return res.status(400).json({
        error: "Giỏ hàng trống",
      });
    }

    const cartId = cartCheck[0].CartID;

    // 2. Lấy chi tiết giỏ hàng và giá sản phẩm
    let [cartDetails] = await poolPromise.query(
      `
      SELECT
        cd.ProductID,
        cd.Quantity,
        p.Price AS UnitPrice
      FROM Cart_Detail cd
      JOIN Product p ON cd.ProductID = p.ProductID
      WHERE cd.CartID = ?
      `,
      [cartId],
    );

    if (cartDetails.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Giỏ hàng rỗng",
      });
    }

    // 3. Tính tổng tiền
    let totalAmount = 0;

    for (let item of cartDetails) {
      totalAmount += item.UnitPrice * item.Quantity;
    }

    console.log("👉 Đang tạo Hóa đơn (Invoice)...");

    // 4. Tạo hóa đơn
    const [orderResult] = await poolPromise.query(
      `
      INSERT INTO Invoice
      (CustomerID, OrderDate, TotalAmount, Status)
      VALUES (?, NOW(), ?, 'Chờ xử lý')
      `,
      [CustomerID, totalAmount],
    );

    const newInvoiceId = orderResult.insertId;

    console.log("👉 Đang chèn chi tiết hóa đơn (Invoice_Detail)...");

    // 5. Chèn chi tiết hóa đơn và trừ kho
    for (let item of cartDetails) {
      await poolPromise.query(
        `
        INSERT INTO Invoice_Detail
        (InvoiceID, ProductID, Quantity, UnitPrice)
        VALUES (?, ?, ?, ?)
        `,
        [newInvoiceId, item.ProductID, item.Quantity, item.UnitPrice],
      );

      // Trừ kho hàng
      await poolPromise.query(
        `
        UPDATE Product
        SET Stock = Stock - ?
        WHERE ProductID = ?
        `,
        [item.Quantity, item.ProductID],
      );
    }

    console.log("👉 Đang dọn dẹp giỏ hàng...");

    await poolPromise.query("DELETE FROM Cart_Detail WHERE CartID = ?", [
      cartId,
    ]);

    console.log("✅ ĐẶT HÀNG HOÀN TẤT THÀNH CÔNG!");

    res.status(200).json({
      success: true,
      message: "Đặt hàng thành công",
      orderId: newInvoiceId,
    });
  } catch (err) {
    console.error("Lỗi đặt hàng:", err.message);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend Server đang chạy tại http://localhost:${PORT}`);
});
