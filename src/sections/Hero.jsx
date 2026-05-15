import { PRIMARY } from "../components/constants/Theme";
import heroBg from "../assets/homepage.png";
function Hero() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
      }}
    >
      {/* BG texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, #F4890A 0%, transparent 60%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 py-16 flex items-center min-h-100 relative z-10">
        <div className="max-w-sm">
          <p className="text-gray-400 text-sm mb-2 font-medium">
            Limited Stocks Available. Grab It Now!
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Iphone 15
            <br />
            Series
          </h1>
          <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider hover:bg-gray-100 transition-colors uppercase">
            Shop Collection
          </button>
        </div>
      </div>
      {/* Phone image placeholder */}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div
          className="w-5 h-2 rounded-full"
          style={{ backgroundColor: PRIMARY }}
        />
        <div className="w-2 h-2 rounded-full bg-gray-500" />
        <div className="w-2 h-2 rounded-full bg-gray-500" />
      </div>
    </div>
  );
}
export default Hero;
