import StarIcon from "../ui/StarIcon";
import { useState } from "react";
import { PRIMARY } from "../constants/Theme";
function ProductCard({ p }) {
  const [wish, setWish] = useState(false);
  return (
    <div className="relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
      <div className="overflow-hidden">
        {p.badge && (
          <span
            className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: p.badge === "New" ? "#111" : PRIMARY }}
          >
            {p.badge}
          </span>
        )}
        <button
          onClick={() => setWish(!wish)}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill={wish ? PRIMARY : "none"}
            stroke={wish ? PRIMARY : "#aaa"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        <img
          src={p.image} // Dùng p.image thay vì p.icon
          alt={p.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
        />
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-gray-800 mb-1.5 leading-snug">
          {p.name}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: PRIMARY }}>
            {p.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
