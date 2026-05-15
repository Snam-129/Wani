import { PRIMARY } from "../components/constants/Theme";
function ContactContent() {
  const inputStyle =
    "w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-gray-400 transition-colors text-sm bg-gray-50/30";

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 font-['Plus_Jakarta_Sans']">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Cột trái: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Info</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Tortor dignissim convallis aenean et tortor at risus viverra
            adipiscing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold border-b border-black w-fit mb-3">
                Office
              </h4>
              <p className="text-sm text-gray-600 leading-6">
                Đại học Thăng Long
                <br />
                +123 222 333 44
                <br />
                info@yourinfo.com
              </p>
            </div>
            <div>
              <h4 className="font-bold border-b border-black w-fit mb-3">
                Management
              </h4>
              <p className="text-sm text-gray-600 leading-6">
                Đại học Thăng Long
                <br />
                +123 666 777 88
                <br />
                info@yourinfo.com
              </p>
            </div>
          </div>

          {/* Ảnh store bên dưới info */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/contact-store.jpg"
              alt="Our Store"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Cột phải: Form liên hệ */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Any Questions?</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Use the form below to get in touch with us.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your full name *"
                className={inputStyle}
              />
              <input
                type="email"
                placeholder="Write your email here *"
                className={inputStyle}
              />
            </div>
            <input
              type="text"
              placeholder="Phone number"
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Write your subject here"
              className={inputStyle}
            />
            <textarea
              placeholder="Write your message here *"
              rows="5"
              className={inputStyle}
            ></textarea>

            <button
              type="submit"
              className="bg-[#222] text-white px-10 py-4 rounded-lg font-bold text-xs tracking-widest hover:bg-black transition-all uppercase"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* OurStores */}
      <section className="max-w-6xl mx-auto py-16 ">
        <div className="flex flex-col lg:flex-row items-center overflow-hidden rounded-[40px]">
          {/* Bên trái: Ảnh Store (Ảnh bo góc lớn) */}
          <div className="w-full lg:w-1/2 p-4">
            <div className="rounded-[20px]  overflow-hidden lg:aspect-square">
              <img
                src="/ct-ip15.png" // Sử dụng ảnh iPhone bạn cung cấp
                alt="Our Store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bên phải: Nội dung */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 text-black font-['Plus_Jakarta_Sans']">
            <h2 className="text-3xl font-bold mb-4 opacity-90">Our Stores</h2>
            <p className="text-gray-600 mb-12 text-sm">
              You can also directly buy products from our stores.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Hà Nội */}
              <div>
                <h4 className="font-bold border-b border-gray-300 w-fit mb-4 pb-1 text-lg">
                  HaNoi
                </h4>
                <div className="text-sm text-gray-400 space-y-2 leading-relaxed">
                  <p>1x đường Hai Bà Trưng</p>
                  <p>+123 666 777 88</p>
                  <p>info@yourinfo.com</p>
                </div>
              </div>

              {/* TP. Hồ Chí Minh */}
              <div>
                <h4 className="font-bold border-b border-gray-600 w-fit mb-4 pb-1 text-lg">
                  HoChiMinh
                </h4>
                <div className="text-sm text-gray-400 space-y-2 leading-relaxed">
                  <p>Quận 1</p>
                  <p>+123 222 333 44</p>
                  <p>info@yourinfo.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ContactContent;
