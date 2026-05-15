import React from "react";
import { Link } from "react-router-dom";
import PageBanner from "../components/common/PageBanner";

const ForgotPassword = () => {
  const fields = [
    { label: "Email", type: "email" },
    { label: "New Password", type: "password" },
    { label: "Re-enter the password*", type: "password" },
    { label: "Enter the authentication code *", type: "text" },
  ];

  return (
    <>
      {/* 1. Banner tiêu đề */}
      <PageBanner title="Forgot Password" showBreadcrumb={false} />

      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tiêu đề phụ */}
          <h2 className="text-2xl font-bold mb-8 text-gray-900 ml-2">
            Billing Details
          </h2>

          <form className="space-y-6">
            {fields.map((f, index) => (
              <div key={index}>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder="Value"
                  className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                />
              </div>
            ))}

            {/* Các lựa chọn thao tác bên dưới theo ảnh */}
            <div className="flex flex-col gap-4 mt-6 ml-4">
              <button
                type="button"
                className="text-left text-sm font-bold text-gray-800 hover:text-black transition-colors"
              >
                Resend the code
              </button>

              <button
                type="submit"
                className="text-left text-sm font-bold text-gray-800 hover:text-black transition-colors"
              >
                Create a new password
              </button>
            </div>

            {/* Điều hướng quay lại */}
            <div className="text-center mt-10 pt-6 border-t border-gray-50">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-700 underline hover:text-black transition-colors"
              >
                Back to Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
