import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { products } from "../components/constants/MockData";

function BestSellers() {
  // Hàm xử lý cuộn lên đầu trang
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section className="py-10 bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề phần */}
        <h2 className="text-center text-xl font-bold mb-8 text-gray-900 uppercase tracking-tight">
          Best Selling Items
        </h2>

        {/* Grid danh sách sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
          {products.map((p) => {
            // Chuẩn hóa đường dẫn theo yêu cầu: /pages/Tên%20Sản%20Phẩm
            const productPath = encodeURIComponent(p.name);

            return (
              <Link
                key={p.name}
                to={`/pages/${productPath}`}
                onClick={handleScrollTop}
                className="block transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductCard p={p} />
              </Link>
            );
          })}
        </div>

        {/* Nút Go To Shop */}
        <div className="flex justify-center mt-8">
          <Link to="/shop" onClick={handleScrollTop}>
            <button className="text-[10px] md:text-xs font-bold px-8 py-3 rounded-[90px] bg-gray-900 text-white tracking-widest hover:bg-black transition-all shadow-md hover:shadow-lg uppercase active:scale-95">
              Go To Shop
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
