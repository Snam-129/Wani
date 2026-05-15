import { PRIMARY } from "../constants/Theme";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10">
          <div>
            <div
              className="text-xl font-extrabold mb-2"
              style={{ color: PRIMARY }}
            >
              Wani
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Khách hàng là thượng đế
            </p>
            <div className="flex gap-2">
              {["f", "in", "tw", "yt", "li"].map((s) => (
                <div
                  key={s}
                  className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 cursor-pointer hover:border-orange-400 hover:text-orange-400 transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-800">
              Quick Links
            </h5>
            {["Home", "About", "Shop", "Blogs", "Pages", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-xs text-gray-400 mb-2 hover:text-orange-500 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-800">
              Help & Info
            </h5>
            {[
              "Track Your Order",
              "Returns Policies",
              "Shipping + Delivery",
              "Contact Us",
              "FAQs",
              "Pages",
            ].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-xs text-gray-400 mb-2 hover:text-orange-500 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-800">
              Contact Us
            </h5>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Do you have any queries or suggestions?
            </p>
            <p className="text-xs text-gray-600 mb-3">yourinfo@gmail.com</p>
            <p className="text-xs text-gray-400 mb-1">
              If you need support? Just give us a call
            </p>
            <p className="text-xs font-bold text-gray-700">
              +55 111 222 333 44
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>We ship with:</span>
            <span className="bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[10px] font-bold">
              DHL
            </span>
            <span className="bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[10px] font-bold">
              GHN
            </span>
            <span className="ml-2">Payment options:</span>
            {["VISA", "MC", "MOMO"].map((p) => (
              <span
                key={p}
                className="border border-gray-200 rounded px-2 py-0.5 text-[10px] font-bold text-gray-500"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            © Copyright 2024 BasicStore. Design by TemplatesJungle
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
