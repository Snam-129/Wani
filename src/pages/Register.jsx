import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PageBanner from "../components/common/PageBanner";

const Register = () => {
  const navigate = useNavigate();

  // Đã chuyển đổi hoàn toàn sang 'phoneNumber'
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    country: "United States (US)",
    streetAddress: "",
    townCity: "",
    state: "Florida",
    zipCode: "",
    phoneNumber: "", // Sử dụng đồng bộ phoneNumber ở đây
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu nhập lại
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp", {
        position: "top-right",
      });
      return;
    }

    try {
      // Gộp địa chỉ thành chuỗi hoàn chỉnh
      const fullAddress = `${formData.streetAddress}, ${formData.townCity}, ${formData.state}, ${formData.country}`;

      // Chuẩn hóa dữ liệu gửi lên API Backend
      const dataToSend = {
        fullName: formData.fullName.trim(),
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: fullAddress,
      };

      // Gửi request tới API backend
      const response = await axios.post(
        "http://localhost:5000/api/register",
        dataToSend,
      );

      if (response.data.success) {
        toast.success("Đăng ký thành công!", {
          position: "top-right",
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Lỗi đăng ký tại Frontend:", error);

      const backendError =
        error.response?.data?.error || "Đăng ký thất bại, thử lại sau!";

      toast.error(backendError, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {/* Banner */}
      <PageBanner title="Register Wmember" showBreadcrumb={false} />

      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-8 text-gray-900 ml-2">
            Billing Details
          </h2>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Full name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Country / Region *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Street address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="House number and street name"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Town / City *
                </label>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Zip */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Phone Input - Đã cập nhật name="phoneNumber" và value */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Email address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  Re-enter the password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#222] text-white py-4 rounded-[200px] font-bold text-sm hover:bg-black transition-colors uppercase"
              >
                Register an account
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-xs text-gray-400">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-xs font-bold text-gray-700 underline hover:text-black transition-colors"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
