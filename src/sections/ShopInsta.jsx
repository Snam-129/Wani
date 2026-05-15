import { instaIcons } from "../components/constants/MockData";

function ShopInsta() {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      {/* Tiêu đề căn giữa */}
      <h2 className="text-center text-2xl font-bold mb-10 text-gray-900 font-['Plus_Jakarta_Sans']">
        Shop Our Insta
      </h2>

      {/* Grid chứa 5 ảnh */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {instaIcons.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden group shadow-sm transition-all hover:shadow-md"
            style={{
              width: "100%", // Co giãn theo grid nhưng tối đa là 282px
              aspectRatio: "1/1", // Đảm bảo luôn là hình vuông (282x282)
              borderRadius: "20px",
              opacity: 1,
            }}
          >
            <img
              src={`/${item.image}`}
              alt={`insta-post-${index}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShopInsta;
