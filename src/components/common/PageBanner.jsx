// Thêm prop showBreadcrumb, mặc định là false
function PageBanner({
  title = "Shop",
  linkText = "Shop",
  linkPath = "/shop",
  showBreadcrumb = true,
}) {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        height: "281px",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/aboutus.jpg')`,
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: "10px" }}>
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>

        {/* Chỉ hiển thị nếu showBreadcrumb là true */}
        {showBreadcrumb && (
          <nav className="flex items-center text-white text-sm md:text-base">
            <a href="/" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <span className="mx-2 text-gray-400">&gt;</span>
            <a
              href={linkPath}
              className="underline underline-offset-4 decoration-1 opacity-90"
            >
              {linkText}
            </a>
          </nav>
        )}
      </div>
    </section>
  );
}
export default PageBanner;
