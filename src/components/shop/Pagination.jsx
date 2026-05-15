import { PRIMARY } from "../constants/Theme";

const F = "'Plus Jakarta Sans', sans-serif";

export default function Pagination({
  current = 1,
  total = 1,
  onChange,
  prevText = "Prev",
  nextText = "Next",
  showNumbers = true,
  className = "",
}) {
  if (total <= 1) return null;

  return (
    <div
      className={`flex items-center justify-center gap-2 mt-12 ${className}`}
    >
      {/* Prev Button */}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="text-sm px-5 py-2.5 text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        style={{ fontFamily: F }}
      >
        {prevText}
      </button>

      {/* Page Numbers */}
      {showNumbers && (
        <div className="flex items-center gap-1">
          {[...Array(total)].map((_, i) => {
            const page = i + 1;
            const isActive = page === current;

            return (
              <button
                key={page}
                onClick={() => onChange(page)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? "shadow-sm" : "hover:bg-gray-100"
                }`}
                style={{
                  fontFamily: F,
                  backgroundColor: isActive ? PRIMARY : "transparent",
                  color: isActive ? "#fff" : "#6b7280",
                }}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="text-sm px-5 py-2.5 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        style={{
          color: current === total ? "#9ca3af" : PRIMARY,
          fontFamily: F,
        }}
      >
        {nextText}
      </button>
    </div>
  );
}
