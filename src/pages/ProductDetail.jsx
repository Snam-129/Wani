  import { useParams, useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { PRIMARY } from "../components/constants/Theme";
  import { products } from "../components/constants/MockData";
  import { Link } from "react-router-dom";
  import ShopProductCard from "../components/shop/ShopProductCard";
  // Layout components
  import TopBar from "../components/layout/TopBar";
  import Navbar from "../components/layout/Navbar";
  import Footer from "../components/layout/Footer";
  import Newsletter from "../sections/Newsletter";
  import ShopInsta from "../sections/ShopInsta";
  import axios from 'axios';
  const F = "'Plus Jakarta Sans', sans-serif";

  export default function ProductDetail() {
    const { name } = useParams();
    const navigate = useNavigate();

    // 1. Tìm product trước
    const product = products.find(
      (p) => p.name.toLowerCase() === decodeURIComponent(name?.toLowerCase()),
    );

    // 2. Khởi tạo State (Sử dụng optional chaining ?. để không bị crash nếu product undefined)
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product?.image);
    const [selectedColor, setSelectedColor] = useState("Black");
    const [selectedCapacity, setSelectedCapacity] = useState("512GB");

    // 3. Cập nhật lại ảnh khi route thay đổi (đổi sang sản phẩm khác)
    useEffect(() => {
      if (product) {
        setMainImage(product.image);
      }
    }, [product]);
  // =============== ĐOẠN CODE ĐẤU DÂY BACKEND NÂNG CẤP ===============
 const handleCartAction = async (actionType) => {
    try {
      const isBuyNow = actionType === 'BUY_NOW';
      
      // 1. Lấy ID động từ file dữ liệu mẫu
      const finalProductID = product.id || product.ProductID; 

      // 2. Làm sạch giá tiền từ chuỗi thành số thuần túy
      const cleanPrice = typeof product.price === 'string' 
        ? parseInt(product.price.replace(/[^0-9]/g, ''), 10) 
        : product.price;

      // 3. Gọi API gửi thông tin sang Backend để tự động đồng bộ
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        CustomerID: 1, 
        ProductID: finalProductID, 
        ProductName: product.name, 
        Price: cleanPrice,         
        Image: product.image,       
        Quantity: quantity,
        isBuyNow: isBuyNow 
      });
      
      if (response.status === 200) {
        if (isBuyNow) {
          // 🚀 NẾU LÀ MUA NGAY: Chuyển thẳng tới trang Thanh toán (Checkout)
          navigate("/checkout"); 
        } else {
          // 📥 NẾU LÀ THÊM VÀO GIỎ: Chỉ hiện thông báo, KHÔNG chuyển trang (Khách ở lại mua tiếp)
          alert(`🎉 Đã thêm thành công ${quantity} sản phẩm vào giỏ hàng!`); 
        }
      }
    } catch (error) {
      console.error("Lỗi chi tiết:", error);
      if (error.response && error.response.status === 400) {
        alert("❌ Lỗi: " + error.response.data.error);
      } else {
        alert("🔌 Hệ thống gặp sự cố, vui lòng kiểm tra lại Terminal Backend!");
      }
    }
  };
// =============== ĐOẠN CODE ĐẤU DÂY BACKEND KẾT THÚC ===============
    // 4. Kiểm tra nếu không có sản phẩm
    if (!product) {
      return (
        <>
          <TopBar />
          <Navbar />
          <div className="text-center py-20 text-2xl" style={{ fontFamily: F }}>
            Không tìm thấy sản phẩm
          </div>
          <Footer />
        </>
      );
    }

    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-8" style={{ fontFamily: F }}>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* LEFT - IMAGE */}
            <div className="lg:w-1/2">
              <div className="mb-8">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-125 object-contain transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 justify-center">
                {[
                  product,
                  ...products.filter((p) => p.name !== product.name).slice(0, 3),
                ].map((p, i) => {
                  const isActive = mainImage === p.image;
                  return (
                    <div
                      key={i}
                      className="w-24 h-24 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105"
                      style={{
                        borderColor: isActive ? PRIMARY : "#E5E7EB",
                      }}
                      onClick={() => setMainImage(p.image)}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT - INFO */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400">★★★★★</span>
                <span className="font-semibold">5.0</span>
              </div>

              <div className="text-4xl font-bold mb-6" style={{ color: PRIMARY }}>
                {product.price}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Điện thoại {product.name} - Cấu hình đỉnh cao, không gian lưu trữ
                khủng.
              </p>

              {/* Color */}
              <div className="mb-8">
                <p className="font-semibold mb-3">Color</p>
                <div className="flex gap-3">
                  {["Orange", "Green", "Blue", "Black"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="px-5 py-2.5 rounded-full border text-sm transition-all"
                      style={{
                        borderColor:
                          selectedColor === color ? PRIMARY : "#E5E7EB",
                        backgroundColor:
                          selectedColor === color ? "#FFF7ED" : "transparent",
                        fontWeight: selectedColor === color ? "600" : "400",
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="mb-8">
                <p className="font-semibold mb-3">Capacity</p>
                <div className="flex gap-3">
                  {["256GB", "512GB", "1T"].map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setSelectedCapacity(cap)}
                      className="px-6 py-2.5 rounded-xl border transition-all"
                      style={{
                        borderColor:
                          selectedCapacity === cap ? PRIMARY : "#E5E7EB",
                        backgroundColor:
                          selectedCapacity === cap ? "#FFF7ED" : "transparent",
                        fontWeight: selectedCapacity === cap ? "600" : "400",
                      }}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="font-semibold mb-3">Quantity</p>
                <div className="flex items-center border rounded-2xl w-fit overflow-hidden">
  {/* Nút giảm số lượng */}
  <button
    type="button"
    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
    className="w-12 h-12 text-2xl hover:bg-gray-100 transition-colors select-none"
  >
    -
  </button>
  
  {/* Ô Nhập số lượng trực tiếp bằng bàn phím */}
  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) => {
      const val = parseInt(e.target.value);
      // Nếu ô nhập trống hoặc không phải số thì tạm để trống hoặc bằng 1
      if (isNaN(val) || val < 1) {
        setQuantity("");
      } else {
        setQuantity(val);
      }
    }}
    onBlur={() => {
      // Khi người dùng click ra ngoài, nếu ô nhập đang trống thì tự động đưa về 1
      if (quantity === "") {
        setQuantity(1);
      }
    }}
    className="w-16 h-12 text-center text-xl font-semibold bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  />

  {/* Nút tăng số lượng */}
  <button
    type="button"
    onClick={() => setQuantity((q) => (q === "" ? 1 : q + 1))}
    className="w-12 h-12 text-2xl hover:bg-gray-100 transition-colors select-none"
  >
    +
  </button>
</div>
              </div>

              {/* Buttons */}
            <div className="flex gap-4 mb-10">
              {/* NÚT BUY NOW: Gọi hàm xử lý và truyền vào chuỗi phân biệt 'BUY_NOW' */}
              <button
                onClick={() => handleCartAction('BUY_NOW')}
                className="flex-1 py-4 rounded-2xl text-white font-bold text-lg hover:brightness-110 transition"
                style={{ backgroundColor: PRIMARY }}
              >
                BUY NOW
              </button>
              
              {/* NÚT ADD TO CART: Gọi hàm xử lý và truyền vào chuỗi phân biệt 'ADD_TO_CART' */}
              <button 
                onClick={() => handleCartAction('ADD_TO_CART')}
                className="flex-1 py-4 rounded-2xl border-2 border-gray-900 font-bold text-lg hover:bg-gray-900 hover:text-white transition"
              >
                ADD TO CART
              </button>
            </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>SKU:</strong> 1223
                </p>
                <p>
                  <strong>Category:</strong> Phone, Screen Touch
                </p>
                <p>
                  <strong>Tags:</strong> Classic, Modern
                </p>
              </div>
            </div>
          </div>

          {/* TABS SECTION (Đúng mẫu ảnh) */}
          <div className="mt-20">
            <div className="flex justify-center items-center gap-12 mb-8 border-b border-gray-100 pb-4">
              <button
                className="text-2xl font-bold transition-all relative pb-4"
                style={{ color: PRIMARY }}
              >
                Description
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: PRIMARY }}
                ></div>
              </button>

              <button className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-all pb-4">
                Additional Information
              </button>

              <button className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-all pb-4">
                Reviews (2)
              </button>
            </div>

            <div className="max-w-5xl mx-auto">
              <p className="text-gray-700 font-medium mb-4">Mô Tả Sản Phẩm:</p>
              <p className="text-gray-600 leading-relaxed text-justify">
                {product.name} là ấn phẩm smartphone mới của Apple, nổi bật với bộ
                nhớ trong lên đến 512GB, cung cấp khả năng ghi nhớ, lưu trữ không
                giới hạn. Bên cạnh đó, thế hệ iPhone mới này cũng đặc biệt mang
                tới những trải nghiệm siêu mượt mà trong mọi tác vụ nhờ được kế
                thừa sức mạnh xử lý từ con chip A17 Pro. Chưa hết, máy còn đi kèm
                với cụm ba camera sau 48MP hỗ trợ chụp đêm và quay phim chuyên
                nghiệp, giúp nâng tầm khả năng nhiếp ảnh của người dùng.
              </p>
            </div>
          </div>

          {/* RELATED PRODUCTS SECTION */}
          <div className="py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4">
              {/* Tiêu đề */}
              <h2
                className="text-center text-gray-500 text-3xl font-bold mb-16 uppercase tracking-widest"
                style={{ fontFamily: F }}
              >
                Related Products
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Lọc bỏ sản phẩm hiện tại để không hiện lại chính nó trong phần liên quan */}
                {products
                  .filter((p) => p.name !== product.name)
                  .slice(0, 4)
                  .map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-center"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      } // Cuộn lên đầu trang khi chọn SP mới
                    >
                      <div className="w-full max-w-70">
                        {/* Sử dụng ShopProductCard của bạn - Link bên trong card sẽ lo việc đổi URL */}
                        <ShopProductCard product={p} />
                      </div>
                    </div>
                  ))}
              </div>

              {/* Nút Go To Shop - Có thể điều hướng về trang cửa hàng tổng */}
              <div className="flex justify-center mt-16">
                <Link
                  to="/shop" // Hoặc đường dẫn trang sản phẩm của bạn
                  className="bg-[#1A1A1A] text-white px-10 py-3.5 rounded-full font-bold text-xs hover:bg-[#333] transition-all uppercase tracking-[0.2em]"
                  style={{ fontFamily: F }}
                >
                  Go To Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
        <ShopInsta />
        <Footer />
      </>
    );
  }
