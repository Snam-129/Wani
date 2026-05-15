import StarIcon from "../components/ui/StarIcon";
import { reviews } from "../components/constants/MockData";
import { PRIMARY } from "../components/constants/Theme";
function Reviews() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-xl font-bold mb-8 text-gray-900">
          Our Customer's Review
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-500 text-sm leading-relaxed mb-4 italic">
                {r.text}
              </p>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < r.stars} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: r.color, color: PRIMARY }}
                >
                  {r.init}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {r.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <div
            className="w-5 h-2 rounded-full"
            style={{ backgroundColor: PRIMARY }}
          />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
        </div>
      </div>
    </section>
  );
}

export default Reviews;
