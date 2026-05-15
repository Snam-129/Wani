import UserIcon from "../../assets/userIcon.svg?react";
import CartIcon from "../ui/CartIcon";
import { PRIMARY } from "../constants/Theme";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const F = "'Plus Jakarta Sans', sans-serif";

function Navbar() {
  const links = ["HOME", "ABOUT", "SHOP", "BLOGS", "PAGES", "CONTACT"];
  const location = useLocation();

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
                href={l === "HOME" ? "/" : `/${l.toLowerCase()}`}
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
          <Link
            to="/login"
            className="relative cursor-pointer hover:text-gray-900 transition-colors"
            style={{
              // Sử dụng mảng để kiểm tra: nếu pathname thuộc danh sách này thì sáng màu
              color: ["/login", "/register", "/forgot-password"].includes(
                location.pathname,
              )
                ? PRIMARY
                : "#4b5563",
            }}
          >
            <UserIcon />
          </Link>
          <Link
            to="/cart"
            className="relative cursor-pointer hover:text-gray-900 transition-colors"
          >
            <CartIcon />
            <span
              className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: PRIMARY, fontFamily: F }}
            >
              3
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
