import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PageBanner from "../components/common/PageBanner";

const Login = () => {
  const navigate = useNavigate();

  // State form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // Login success
      if (response.data.success) {
        // Lưu user vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Popup success
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 1500,
        });

        // Chuyển trang
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Sai email hoặc mật khẩu", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);

      toast.error(error.response?.data?.message || "Đăng nhập thất bại", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {/* Banner */}
      <PageBanner title="Log In Wmember" showBreadcrumb={false} />

      <div className="w-full bg-white">
        {/* Form */}
        <div className="max-w-md mx-auto px-6 py-16">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Value"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Value"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#222] text-white py-4 rounded-[200px] font-bold text-sm hover:bg-black transition-colors uppercase mt-4"
            >
              Sign In
            </button>

            {/* Footer */}
            <div className="flex justify-between items-center px-4 mt-4">
              {/* Forgot password */}
              <Link
                to="/forgot-password"
                className="text-xs text-gray-500 underline hover:text-black transition-colors"
              >
                Forgot password?
              </Link>

              {/* Register */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">New member?</span>

                <Link
                  to="/register"
                  className="text-xs font-bold text-gray-700 underline hover:text-black transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
