import React from "react";
import { Link } from "react-router-dom";
import { PRIMARY } from "../components/constants/Theme";
import PageBanner from "../components/common/PageBanner";

const Login = () => {
  return (
    <>
      {/* 1. Banner tiêu đề - Tắt breadcrumb */}
      <PageBanner title="Log In Wmember" showBreadcrumb={false} />

      <div className="w-full bg-white">
        {/* 2. Form Login */}
        <div className="max-w-md mx-auto px-6 py-16">
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                Email
              </label>
              <input
                type="email"
                placeholder="Value"
                // Bo tròn 200px, padding trái 20px (px-5) để text không chạm mép
                className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                Password
              </label>
              <input
                type="password"
                placeholder="Value"
                className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#222] text-white py-4 rounded-[200px] font-bold text-sm hover:bg-black transition-colors uppercase mt-4"
            >
              Sign In
            </button>

            {/* 3. Link hỗ trợ & Đăng ký */}
            <div className="flex justify-between items-center px-4 mt-4">
              {/* Quên mật khẩu */}
              <Link
                to="/forgot-password"
                className="text-xs text-gray-500 underline hover:text-black transition-colors"
              >
                Forgot password?
              </Link>

              {/* Đăng ký tài khoản mới */}
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
