import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../components/constants/MockData";
import { PRIMARY } from "../components/constants/Theme";

function LatestPosts() {
  // Hàm xử lý cuộn lên đầu trang
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Chỉ lấy 3 bài viết đầu tiên (1, 2, 3) cho trang chủ
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 font-sans">
      <h2 className="text-center text-xl font-bold mb-8 text-gray-900 uppercase tracking-tight">
        Latest Posts
      </h2>

      {/* Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {displayPosts.map((p) => (
          <Link
            key={p.id}
            to={`/blogs/${p.id}`} // Đường dẫn chuẩn blogs/id
            onClick={handleScrollTop}
            className="group flex flex-col items-start w-full max-w-122.5 transition-all"
          >
            {/* Ảnh nền của bài viết */}
            <div
              className="w-full h-64 rounded-xl overflow-hidden mb-4 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-[1.02] shadow-sm"
              style={{
                backgroundImage: `url(${p.image})`, // Dữ liệu của bạn đã có dấu / ở đầu
              }}
            ></div>

            {/* Thông tin Tag và Ngày */}
            <div className="flex items-center justify-between w-full mb-3 relative">
              <span
                className="text-[10px] font-bold px-3 py-1 rounded text-white uppercase tracking-wider"
                style={{ backgroundColor: PRIMARY }}
              >
                {p.category}
              </span>

              <p className="text-xs text-gray-400 font-medium">{p.date}</p>
            </div>

            {/* Tiêu đề bài viết */}
            <h4 className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors leading-tight text-gray-900 line-clamp-2">
              {p.title}
            </h4>
          </Link>
        ))}
      </div>

      {/* Nút chuyển hướng sang trang Blog chính */}
      <div className="flex justify-center mt-10">
        <Link to="/blogs" onClick={handleScrollTop}>
          <button className="text-[10px] md:text-xs font-bold px-8 py-3 rounded-[90px] bg-gray-900 text-white tracking-widest hover:bg-black transition-all shadow-md active:scale-95 uppercase">
            Blog Page
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LatestPosts;
