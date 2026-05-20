import { useState, useEffect } from "react"; // 🚀 Nạp thêm hook để quản lý số lượng
import axios from "axios"; // 🚀 Nạp thêm thư viện gọi API
import UserIcon from "../../assets/userIcon.svg?react";
import CartIcon from "../ui/CartIcon";
import { PRIMARY } from "../constants/Theme";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
const F = "'Plus Jakarta Sans', sans-serif";

function Navbar() {
  const links = ["HOME", "ABOUT", "SHOP", "BLOGS", "PAGES", "CONTACT"];
  const location = useLocation();

  // 1. TẠO STATE LƯU TRỮ SỐ LƯỢNG SẢN PHẨM THẬT
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  // 2. TỰ ĐỘNG GỌI API ĐẾM SỐ LƯỢNG TỪ SQL SERVER
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        // Gọi API đếm tổng số lượng (Sử dụng CustomerID = 1 đồng bộ với các trang khác)
        const response = await axios.get(
          "http://localhost:5000/api/cart/count/1",
        );
        setCartCount(response.data.total); // Cập nhật con số thật vào giao diện
      } catch (error) {
        console.error("Lỗi đếm số lượng giỏ hàng phía Navbar:", error);
      }
    };

    fetchCartCount(); // Chạy ngay lập tức khi load trang

    // Cơ chế Polling: Cứ mỗi 2 giây hệ thống tự động kiểm tra database một lần
    // để cập nhật số icon ngay lập tức nếu người dùng bấm "Thêm vào giỏ" ở trang khác
    const interval = setInterval(fetchCartCount, 2000);
    return () => clearInterval(interval); // Dọn dẹp bộ nhớ khi chuyển trang
  }, []);

  const isActive = (link) => {
    if (link === "HOME") return location.pathname === "/";
    if (link === "PAGES") {
      return (
        location.pathname === "/cart" ||
        location.pathname.startsWith("/pages/") ||
        location.pathname.startsWith("/checkout") ||
        location.pathname.startsWith("/blogs/")
      );
    }
    return location.pathname === `/${link.toLowerCase()}`;
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-extrabold"
          style={{ color: PRIMARY, fontFamily: F }}
        >
          Wani.
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex gap-7 items-center">
          {links.map((l) => {
            const active = isActive(l);
            return (
              <a
                key={l}
                href={
                  l === "HOME"
                    ? "/"
                    : l === "PAGES"
                      ? "/blogs"
                      : `/${l.toLowerCase()}`
                }
                className="text-xs font-semibold tracking-wider transition-colors relative"
                style={{
                  color: active ? PRIMARY : "#6b7280",
                  fontFamily: F,
                }}
              >
                {l}
              </a>
            );
          })}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4 text-gray-600">
          <div className="relative group">
            {/* Nếu chưa login */}
            {!user ? (
              <Link
                to="/login"
                className="relative cursor-pointer hover:text-gray-900 transition-colors"
                style={{
                  color: ["/login", "/register", "/forgot-password"].includes(
                    location.pathname,
                  )
                    ? PRIMARY
                    : "#4b5563",
                }}
              >
                <UserIcon />
              </Link>
            ) : (
              <>
                {/* Icon User */}
                <div className="cursor-pointer text-gray-600 hover:text-black transition">
                  <UserIcon />
                </div>

                {/* Dropdown */}
                <div
                  className="
          absolute right-0 top-10
          w-52 bg-white rounded-xl shadow-xl border border-gray-100
          opacity-0 invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all duration-200
          z-50 overflow-hidden
        "
                >
                  {/* Tên user */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Đang đăng nhập</p>

                    <p
                      className="font-semibold text-sm truncate"
                      style={{
                        color: PRIMARY,
                        fontFamily: F,
                      }}
                    >
                      {user.FullName}
                    </p>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="
            w-full flex items-center gap-2
            px-4 py-3 text-sm
            text-gray-600
            hover:bg-red-500
            hover:text-white
            transition-all
          "
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              </>
            )}
          </div>
          <Link
            to="/cart"
            className="relative cursor-pointer hover:text-gray-900 transition-colors"
          >
            <CartIcon />
            {/* 3. THAY THẾ SỐ 3 CỨNG BẰNG BIẾN SỐ LƯỢNG THẬT ĐỘNG */}
            <span
              className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: PRIMARY, fontFamily: F }}
            >
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
