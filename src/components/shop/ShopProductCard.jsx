import { Link } from "react-router-dom";
import { PRIMARY } from "../constants/Theme";
const F = "'Plus Jakarta Sans', sans-serif";

export default function ShopProductCard({ product }) {
  return (
    <Link
      to={`/pages/${encodeURIComponent(product.name)}`}
      className="bg-white border border-gray-150 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 hover:shadow-md block"
      style={{ borderColor: "#ebebeb" }}
    >
      <div
        className="relative w-full overflow-hidden bg-white flex items-center justify-center"
        style={{ height: 240 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.badge && (
          <span
            className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded"
            style={{
              backgroundColor: product.badge === "New" ? "#111" : PRIMARY,
              fontFamily: F,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        <h3
          className="text-sm font-medium text-gray-800 mb-1 text-center leading-snug"
          style={{ fontFamily: F }}
        >
          {product.name}
        </h3>
        <p
          className="text-sm font-semibold text-center"
          style={{ color: PRIMARY, fontFamily: F }}
        >
          {product.price}
        </p>
      </div>
    </Link>
  );
}
