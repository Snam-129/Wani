import { PRIMARY } from "../components/constants/Theme";
import { Link } from "react-router-dom";
const F = "'Plus Jakarta Sans', sans-serif";

function CartTotals({ items }) {
  const total = items.reduce((sum, item) => sum + item.priceNum * item.qty, 0);

  const formatPrice = (num) => num.toLocaleString("vi-VN") + "Đ";

  return (
    <div className="mt-10 max-w-md">
      <h2
        className="text-xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: F }}
      >
        Cart Totals
      </h2>

      {/* Lines */}
      <div className="border-t border-gray-100">
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <span
            className="text-sm text-gray-600 font-medium"
            style={{ fontFamily: F }}
          >
            Subtotal
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: PRIMARY, fontFamily: F }}
          >
            {formatPrice(total)}
          </span>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <span
            className="text-sm text-gray-600 font-medium"
            style={{ fontFamily: F }}
          >
            Total
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: PRIMARY, fontFamily: F }}
          >
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6 flex-wrap">
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "#1a1a1a", fontFamily: F }}
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "#1a1a1a", fontFamily: F }}
        >
          Proceed To Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartTotals;
