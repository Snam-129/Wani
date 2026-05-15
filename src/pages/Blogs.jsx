import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../components/common/PageBanner";
import Pagination from "../components/shop/Pagination";
import { blogPosts } from "../components/constants/MockData";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";
import Footer from "../components/layout/Footer";

const POSTS_PER_PAGE = 6;

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Hàm xử lý cuộn lên đầu trang ngay lập tức
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // 2. Hàm xử lý khi người dùng đổi trang ở Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleScrollTop(); // Cuộn lên đầu để xem nội dung trang mới
  };

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const currentPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <>
      {/* Banner đầu trang */}
      <PageBanner title="Blogs" linkText="Blogs" linkPath="/blogs" />

      <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR */}
          <div className="lg:w-80 shrink-0">
            {/* Ô tìm kiếm */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full border border-gray-200 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:border-black transition-colors text-sm"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </button>
            </div>

            {/* Danh mục */}
            <div className="mb-8">
              <h3 className="font-bold mb-4 text-lg text-gray-900">
                Categories
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {["All", "Phones", "Accessories", "Tablets", "Watches"].map(
                  (cat) => (
                    <li
                      key={cat}
                      className="cursor-pointer hover:text-orange-500 transition-colors flex justify-between items-center"
                    >
                      <span>{cat}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-bold mb-4 text-lg text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["White", "Cheap", "Mobile", "Modern"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold border border-gray-200 px-4 py-1.5 rounded-full hover:bg-black hover:text-white cursor-pointer transition-all uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BLOG LIST SECTION */}
          <div className="flex-1">
            {/* Kết quả hiển thị */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-500 italic">
                Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}–
                {Math.min(currentPage * POSTS_PER_PAGE, blogPosts.length)} of{" "}
                {blogPosts.length} results
              </p>
            </div>

            {/* Grid bài viết */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <Link
                  to={`/blogs/${post.id}`}
                  key={post.id}
                  className="group flex flex-col cursor-pointer"
                  onClick={handleScrollTop} // 3. Cuộn lên đầu khi bấm vào chi tiết bài viết
                >
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-4/3 shadow-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-orange-500">{post.category}</span>
                  </div>
                  <h3 className="font-bold leading-tight text-lg group-hover:text-orange-500 transition-colors line-clamp-2 text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>

            {/* Phân trang */}
            <div className="mt-12 flex justify-center">
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={handlePageChange} // 4. Cuộn lên đầu khi đổi trang
              />
            </div>
          </div>
        </div>
      </div>

      {/* Các section bổ sung */}
      <Newsletter />
      <ShopInsta />
      <Footer />
    </>
  );
}
