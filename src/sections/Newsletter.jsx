import { PRIMARY } from "../components/constants/Theme";

function Newsletter() {
  return (
    <section className="py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="relative py-20 px-6 text-center bg-cover bg-center rounded-[20px] overflow-hidden shadow-xl"
          style={{
            backgroundImage: "url('/sub.jpg')",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Lớp phủ Overlay màu tối giúp chữ rõ hơn */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

          {/* Nội dung bên trong */}
          <div className="relative z-10">
            <h2 className="text-white text-4xl font-bold mb-4 font-['Plus_Jakarta_Sans']">
              Subscribe Us Now
            </h2>
            <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto font-medium">
              Get Latest News, Updates And Deals Directly Mailed To Your Inbox.
            </p>

            {/* Form Input bo tròn mạnh hơn giống trong ảnh */}
            <div className="flex max-w-2xl mx-auto overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <input
                type="email"
                placeholder="Your email address here"
                className="flex-1 px-6 py-5 bg-white backdrop-blur-md text-white text-sm outline-none placeholder-gray-400"
              />
              <button
                className="px-10 py-5 text-white font-bold text-sm tracking-widest transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: PRIMARY }}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
