import React from "react";
import { Link } from "react-router-dom";

function PromoBanners() {
  // Hàm xử lý cuộn lên đầu trang đồng bộ với các phần khác
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Banner 1 */}
        <div
          className="relative w-full max-w-187.5 aspect-750/430 rounded-2xl overflow-hidden flex items-center p-8 bg-center bg-no-repeat bg-cover opacity-100"
          style={{ backgroundImage: "url(/promobn2.png)" }}
        >
          <div>
            <h3 className="text-white font-extrabold capitalize mb-4 text-[30px] md:text-[45px] leading-[100%] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.06)]">
              20% Off On Laptops
            </h3>
            <p className="text-white capitalize mb-1 font-medium text-[16px] md:text-[20px] leading-[100%] tracking-[0.02em] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.06)]">
              Products On Sale For Limited Time Only
            </p>
            <div className="pt-8">
              {/* 2. Bọc Link và thêm handleScrollTop */}
              <Link to="/shop" onClick={handleScrollTop}>
                <button className="flex items-center justify-center gap-2.5 px-10 py-4 rounded-[90px] border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all active:scale-95">
                  Shop It Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Banner 2 */}
        <div
          className="relative w-full max-w-187.5 aspect-750/430 rounded-2xl overflow-hidden flex items-center p-8 bg-center bg-no-repeat bg-cover opacity-100"
          style={{ backgroundImage: "url(/promobn1.png)" }}
        >
          <div>
            <h3 className="text-white font-extrabold capitalize mb-4 text-[30px] md:text-[45px] leading-[100%] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.06)]">
              Apple Collections
            </h3>
            <p className="text-white capitalize mb-1 font-medium text-[16px] md:text-[20px] leading-[100%] tracking-[0.02em] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.06)]">
              Get Your Best Apple Products.
            </p>
            <div className="pt-8">
              {/* 2. Bọc Link và thêm handleScrollTop */}
              <Link to="/shop" onClick={handleScrollTop}>
                <button className="flex items-center justify-center gap-2.5 px-10 py-4 rounded-[90px] border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all active:scale-95">
                  Shop It Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanners;
