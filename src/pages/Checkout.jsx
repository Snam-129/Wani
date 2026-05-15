import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PRIMARY } from "../components/constants/Theme";
import PageBanner from "../components/common/PageBanner";
const F = "'Plus Jakarta Sans', sans-serif";

export default function Checkout() {
  return (
    <>
      <PageBanner title="Checkout" linkText="Checkout" linkPath="/checkout" />
      <div className="max-w-7xl mx-auto px-4 py-10" style={{ fontFamily: F }}>
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT - BILLING DETAILS */}
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500">
                  <option>United States (US)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House number and street name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Apartments, suite, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
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
                    defaultValue="Florida"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* RIGHT - ADDITIONAL INFO + CART TOTALS */}
          <div className="space-y-10">
            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Additional Information
              </h2>
              <label className="block text-sm font-medium mb-2">
                Order notes (optional)
              </label>
              <textarea
                placeholder="Notes about your order. Like special notes for delivery."
                className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Cart Totals */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Subtotal</span>
                  <span style={{ color: PRIMARY }}>23.800.000đ</span>
                </div>
                <div className="flex justify-between py-4 border-b font-bold">
                  <span>Total</span>
                  <span style={{ color: PRIMARY }}>23.800.000đ</span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Direct bank transfer",
                    "Check payments",
                    "Cash on delivery",
                    "PayPal",
                  ].map((method, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={i === 0}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>

                <button className="w-full mt-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition">
                  PLACE AN ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
