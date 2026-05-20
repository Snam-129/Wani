const poolPromise = require("../server");

// ======================================================
// LOGIN
// ======================================================
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        error: "Vui lòng nhập email và mật khẩu",
      });
    }

    const [users] = await poolPromise.query(
      `
      SELECT *
      FROM Customer
      WHERE Email = ? AND Password = ?
      `,
      [Email, Password],
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Sai email hoặc mật khẩu",
      });
    }

    const user = users[0];

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
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
      error: err.message,
    });
  }
};

// ======================================================
// REGISTER
// ======================================================
const register = async (req, res) => {
  try {
    const { FullName, Email, Password, PhoneNumber, Address } = req.body;

    const [emailCheck] = await poolPromise.query(
      `
      SELECT CustomerID
      FROM Customer
      WHERE Email = ?
      `,
      [Email],
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Email đã tồn tại",
      });
    }

    const [result] = await poolPromise.query(
      `
      INSERT INTO Customer
      (
        FullName,
        Email,
        Password,
        PhoneNumber,
        Address,
        Status
      )
      VALUES (?, ?, ?, ?, ?, 'Active')
      `,
      [FullName, Email, Password, PhoneNumber, Address],
    );

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      customerId: result.insertId,
    });
  } catch (err) {
    console.error("Lỗi register:", err.message);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  login,
  register,
};
