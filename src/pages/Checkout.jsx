import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Dùng để điều hướng trang
import axios from "axios"; // 🚀 Dùng để kết nối API Backend
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PRIMARY } from "../components/constants/Theme";
import PageBanner from "../components/common/PageBanner";

const F = "'Plus Jakarta Sans', sans-serif";

export default function Checkout() {
  const navigate = useNavigate();

  // 1. STATE LƯU TỔNG TIỀN THẬT LẤY TỪ GIỎ HÀNG DƯỚI DATABASE
  const [cartTotal, setCartTotal] = useState(0);

  // 2. STATE THU THẬP THÔNG TIN TỪ CÁC Ô INPUT KHÁCH HÀNG NHẬP
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "United States (US)",
    streetAddress: "",
    apartment: "",
    townCity: "",
    state: "Florida",
    zipCode: "",
    phone: "",
    email: "",
    note: "",
  });

  // 3. TỰ ĐỘNG ĐỌC GIỎ HÀNG ĐỂ ĐỒNG BỘ TỔNG TIỀN THẬT KHI VÀO TRANG
  useEffect(() => {
    const fetchCheckoutTotal = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/1"); // Đọc giỏ hàng khách 1
        const total = response.data.reduce(
          (sum, item) => sum + Number(item.Price) * item.Quantity,
          0
        );
        setCartTotal(total);
      } catch (error) {
        console.error("Lỗi lấy tổng tiền thanh toán từ DB:", error);
      }
    };
    fetchCheckoutTotal();
  }, []);

  // Hàm cập nhật State khi khách hàng gõ chữ vào các ô Input
  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  // 4. LUỒNG XỬ LÝ CHỐT ĐƠN KHI CLICK NÚT "PLACE AN ORDER"
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang khi submit form

    // [Xác nhận thông tin hợp lệ] sơ bộ ở Frontend
    if (!formData.firstName || !formData.streetAddress || !formData.phone) {
      alert("❌ Vui lòng điền đầy đủ các thông tin bắt buộc có dấu (*)");
      return;
    }

    try {
      // Gộp dòng địa chỉ chi tiết và căn hộ thành 1 chuỗi địa chỉ hoàn chỉnh
      const finalAddress = formData.apartment 
        ? `${formData.streetAddress} (${formData.apartment})` 
        : formData.streetAddress;

      // [Gửi yêu cầu xử lý thanh toán] xuống API số 7 ở Backend
      const response = await axios.post("http://localhost:5000/api/checkout/place-order", {
        CustomerID: 1, // Mặc định khách hàng số 1
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Country: formData.country,
        StreetAddress: finalAddress,
        TownCity: formData.townCity,
        State: formData.state,
        ZipCode: formData.zipCode,
        Phone: formData.phone,
        Email: formData.email,
        Note: formData.note,
      });

      // [Kiểm tra kết quả xử lý từ Backend]
      if (response.data.success) {
        // 🟢 Nhánh THÀNH CÔNG: Chuyển hướng sang trang Order Success kèm ID hóa đơn động
        alert("🎉 Đặt hàng thành công!");
        navigate(`/order-success?id=${response.data.orderId}`);
      } else {
        // 🔴 Nhánh THẤT BẠI: Hiển thị lỗi
        alert("❌ Đặt hàng thất bại: " + response.data.error);
      }
    } catch (error) {
      console.error("Lỗi luồng đặt hàng:", error);
      alert("🔌 Hệ thống gặp sự cố, vui lòng kiểm tra Terminal Backend!");
    }
  };

  return (
    <>
      <PageBanner title="Checkout" linkText="Checkout" linkPath="/checkout" />
      
      {/* Bọc toàn bộ các trường nhập liệu vào thẻ <form> để tối ưu hóa nút Submit */}
      <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto px-4 py-10" style={{ fontFamily: F }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT - BILLING DETAILS (Đã liên kết State) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Billing Details</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e, "firstName")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange(e, "lastName")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange(e, "companyName")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select 
                  value={formData.country}
                  onChange={(e) => handleInputChange(e, "country")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                >
                  <option value="United States (US)">United States (US)</option>
                  <option value="Vietnam">Vietnam</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="House number and street name"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange(e, "streetAddress")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Apartments, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange(e, "apartment")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.townCity}
                  onChange={(e) => handleInputChange(e, "townCity")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange(e, "state")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange(e, "zipCode")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* RIGHT - ADDITIONAL INFO + CART TOTALS ĐỘNG */}
          <div className="space-y-10">
            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
              <label className="block text-sm font-medium mb-2">
                Order notes (optional)
              </label>
              <textarea
                placeholder="Notes about your order. Like special notes for delivery."
                value={formData.note}
                onChange={(e) => handleInputChange(e, "note")}
                className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Cart Totals */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>
              <div className="border border-gray-200 rounded-xl p-6">
                
                {/* 🚀 ĐỒNG BỘ TIỀN THẬT LÊN GIAO DIỆN */}
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Subtotal</span>
                  <span style={{ color: PRIMARY }} className="font-bold">
                    {cartTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between py-4 border-b font-bold">
                  <span>Total</span>
                  <span style={{ color: PRIMARY }} className="font-bold text-lg">
                    {cartTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                {/* Giao diện chọn phương thức thanh toán tĩnh */}
                <div className="mt-6 space-y-3">
                  {[
                    "Direct bank transfer",
                    "Check payments",
                    "Cash on delivery",
                    "PayPal",
                  ].map((method, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={i === 0}
                        className="accent-orange-500"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>

                {/* BUTTON KÍCH HOẠT TOÀN BỘ LUỒNG ĐẶT HÀNG */}
                <button 
                  type="submit"
                  className="w-full mt-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition uppercase tracking-wider text-xs"
                >
                  PLACE AN ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Subscribe Section */}
      <div className="bg-black text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-3">Subscribe Us Now</h2>
          <p className="mb-8">
            Get Latest News, Updates And Deals Directly Mailed To Your Inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address here"
              className="flex-1 px-5 py-4 rounded-l-2xl text-black outline-none"
            />
            <button className="bg-orange-500 px-10 rounded-r-2xl font-bold hover:bg-orange-600 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}