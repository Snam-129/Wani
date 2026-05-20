import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartBanner from "../sections/CartBanner";
import CartTable from "../sections/CartTable";
import CartTotals from "../sections/CartTotals";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";
import Footer from "../components/layout/Footer";

// 🚀 ĐẢM BẢO ĐÃ KHAI BÁO CÁC BIẾN GIAO DIỆN NÀY ĐỂ TRÁNH CRASH MÀN HÌNH
const PRIMARY = "#FF6B00"; // Màu cam chủ đạo giống ảnh ban đầu của bạn
const F = "'Plus Jakarta Sans', sans-serif";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. TỰ ĐỘNG LẤY DỮ LIỆU GIỎ HÀNG THẬT TỪ SQL SERVER KHI MỞ TRANG
  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart/1");
      
      const mappedItems = response.data.map(item => ({
        id: item.ProductID,          // Giữ ID để tăng/giảm/xóa
        name: item.ProductName,      // Khợp biến .name của CartTable
        priceNum: Number(item.Price), // Khớp biến .priceNum 
        image: item.Image,           // Khớp biến .image
        qty: item.Quantity           // Khớp biến .qty
      }));
      
      setItems(mappedItems);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu giỏ hàng thật từ database:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // 2. LOGIC TĂNG SỐ LƯỢNG (ĐÃ KẾT NỐI DATABASE)
  const handleIncrease = async (name) => {
    try {
      const targetItem = items.find(item => item.name === name);
      if (!targetItem) return;

      const response = await axios.post('http://localhost:5000/api/cart/add', {
        CustomerID: 1,
        ProductID: targetItem.id,
        Quantity: 1,
        isBuyNow: false
      });

      if (response.status === 200) {
        setItems((prev) =>
          prev.map((item) =>
            item.name === name ? { ...item, qty: item.qty + 1 } : item,
          ),
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        alert("Không thể cập nhật số lượng!");
      }
    }
  };

  // 3. LOGIC GIẢM SỐ LƯỢNG (ĐÃ KẾT NỐI DATABASE)
  const handleDecrease = async (name) => {
    try {
      const targetItem = items.find(item => item.name === name);
      if (!targetItem) return;
      if (targetItem.qty <= 1) return;

      const response = await axios.post('http://localhost:5000/api/cart/decrease', {
        CustomerID: 1,
        ProductID: targetItem.id
      });

      if (response.status === 200) {
        setItems((prev) =>
          prev.map((item) =>
            item.name === name ? { ...item, qty: Math.max(1, item.qty - 1) } : item,
          ),
        );
      }
    } catch (error) {
      console.error("Lỗi giảm số lượng:", error);
    }
  };

  // 4. LOGIC XÓA SẢN PHẨM KHỎI GIỎ (ĐÃ KẾT NỐI DATABASE)
  const handleRemove = async (name) => {
    try {
      const targetItem = items.find(item => item.name === name);
      if (!targetItem) return;

      const response = await axios.post('http://localhost:5000/api/cart/remove', {
        CustomerID: 1,
        ProductID: targetItem.id
      });

      if (response.status === 200) {
        setItems((prev) => prev.filter((item) => item.name !== name));
      }
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-xl text-white bg-[#0A0A0A] min-h-screen" style={{ fontFamily: F }}>
        🔄 Đang tải giỏ hàng từ SQL Server...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: F, backgroundColor: "#0A0A0A" }} className="min-h-screen">
      <CartBanner />

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          /* HIỂN THỊ GIAO DIỆN GIỎ TRỐNG CAO CẤP */
          <div className="text-center py-20 text-gray-400 font-medium">
            <div className="text-6xl mb-6">🛒</div>
            <h3 className="text-2xl font-bold text-white mb-2">Giỏ hàng của bạn đang trống!</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-8">
              Hãy tiếp tục khám phá và lựa chọn những sản phẩm công nghệ đỉnh cao phù hợp với bạn nhé.
            </p>
            <Link 
              to="/shop" 
              className="inline-block px-8 py-3 rounded-full text-xs font-bold tracking-widest text-white uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Khám phá cửa hàng ngay
            </Link>
          </div>
        ) : (
          /* HIỂN THỊ BẢNG SẢN PHẨM NẾU CÓ HÀNG */
          <>
            <CartTable
              items={items}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
            <CartTotals items={items} />
          </>
        )}
      </section>

      <Newsletter />
      <ShopInsta />
      <Footer />
    </div>
  );
}