import React from "react";
import { Link } from "react-router-dom";
import PageBanner from "../components/common/PageBanner";

const Register = () => {
  const formFields = [
    { label: "First name *", type: "text", placeholder: "" },
    { label: "Last name *", type: "text", placeholder: "" },
    { label: "Company name (optional)", type: "text", placeholder: "" },
    {
      label: "Country / Region *",
      type: "text",
      placeholder: "United States (US)",
    },
    {
      label: "Street address *",
      type: "text",
      placeholder: "House number and street name",
    },
    { label: "Town / City *", type: "text", placeholder: "" },
    { label: "State *", type: "text", placeholder: "Florida" },
    { label: "ZIP Code *", type: "text", placeholder: "" },
    { label: "Phone *", type: "text", placeholder: "" },
    { label: "Email address *", type: "email", placeholder: "" },
    { label: "Password *", type: "password", placeholder: "" },
    { label: "Re-enter the password *", type: "password", placeholder: "" },
    { label: "Enter the authentication code *", type: "text", placeholder: "" },
  ];

  return (
    <>
      {/* 1. Banner tiêu đề */}
      <PageBanner title="Register Wmember" showBreadcrumb={false} />

      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tiêu đề phụ */}
          <h2 className="text-2xl font-bold mb-8 text-gray-900 ml-2">
            Billing Details
          </h2>

          <form className="space-y-5">
            <div className="grid grid-cols-1 gap-6">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 ml-4">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 py-3 px-5 rounded-[200px] focus:outline-none focus:border-black transition-colors text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Nút Register */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#222] text-white py-4 rounded-[200px] font-bold text-sm hover:bg-black transition-colors uppercase"
              >
                Register an account
              </button>
            </div>

            {/* Link quay lại Login */}
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
