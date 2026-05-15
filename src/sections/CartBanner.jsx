import { Link } from "react-router-dom";
function CartBanner() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        height: "281px",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/aboutus.jpg')`,
        opacity: 1,
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: "10px" }}>
        {/* Tiêu đề chính */}
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
          Cart
        </h1>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-white text-sm md:text-base">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>

          <span className="mx-2 text-gray-400">&gt;</span>

          <Link
            to="/cart"
            className="underline underline-offset-4 decoration-1 opacity-90"
          >
            Cart
          </Link>
        </nav>
      </div>
    </section>
  );
}
export default CartBanner;
