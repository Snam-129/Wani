import { features } from "../components/constants/MockData";

function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center justify-center bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.06)] transition-all hover:shadow-md border border-[#F2F2F2] rounded-[20px] p-10 h-58.75"
              style={{
                opacity: 1,
              }}
            >
              {/* Icon Container */}
              <div className="text-3xl mb-5 flex items-center justify-center">
                <span
                  style={{
                    filter:
                      "sepia(1) saturate(5) hue-rotate(-15deg) brightness(0.9)",
                  }}
                >
                  {f.icon}
                </span>
              </div>

              {/* Title */}
              <h4
                className="font-bold capitalize mb-2 text-center"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "20px",
                  color: "#1A1A1A",
                  lineHeight: "100%",
                }}
              >
                {f.title}
              </h4>

              {/* Description */}
              <p
                className="text-center capitalize"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px", // Giảm xuống 1 chút để cân đối với khung 6xl
                  lineHeight: "160%",
                  letterSpacing: "0.02em",
                  color: "#808080",
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
