import { PRIMARY } from "../components/constants/Theme";

const F = "'Plus Jakarta Sans', sans-serif";

// Icon xóa giỏ hàng
function RemoveIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke={PRIMARY}
      strokeWidth="1.8"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
      <line x1="17" y1="10" x2="11" y2="10" />
    </svg>
  );
}

function QuantityControl({ qty, onIncrease, onDecrease }) {
  return (
    <div
      className="flex items-center border border-gray-200 rounded overflow-hidden w-fit"
      style={{ fontFamily: F }}
    >
      <button
        onClick={onDecrease}
        className="w-8 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg font-medium"
      >
        −
      </button>
      <span className="w-9 h-9  flex shrink-0 items-center justify-center text-sm font-semibold text-gray-800 border-x border-gray-200">
        {qty}
      </span>
      <button
        onClick={onIncrease}
        className="w-9 h-9  flex shrink-0 items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg font-medium"
      >
        +
      </button>
    </div>
  );
}

function CartRow({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.priceNum * item.qty;

  const formatPrice = (num) => num.toLocaleString("vi-VN") + "Đ";

  return (
    <>
      <tr className="border-b border-gray-100">
        {/* Product */}
        <td className="py-5 pr-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/80x80?text=img";
                }}
              />
            </div>
            <div>
              <p
                className="font-semibold text-gray-800 text-sm mb-1"
                style={{ fontFamily: F }}
              >
                {item.name}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: PRIMARY, fontFamily: F }}
              >
                {formatPrice(item.priceNum)}
              </p>
            </div>
          </div>
        </td>

        {/* Quantity */}
        <td className="py-5 px-4">
          <QuantityControl
            qty={item.qty}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </td>

        {/* Subtotal */}
        <td className="py-5 px-4">
          <span
            className="font-bold text-base"
            style={{ color: PRIMARY, fontFamily: F }}
          >
            {formatPrice(subtotal)}
          </span>
        </td>

        {/* Remove */}
        <td className="py-5 pl-4 text-right">
          <button
            onClick={onRemove}
            className="opacity-70 hover:opacity-100 transition-opacity"
            title="Xóa sản phẩm"
          >
            <RemoveIcon />
          </button>
        </td>
      </tr>
    </>
  );
}

function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  if (!items || items.length === 0) {
    return (
      <div
        className="text-center py-16 text-gray-400 text-sm"
        style={{ fontFamily: F }}
      >
        Giỏ hàng trống.{" "}
        <a href="/shop" style={{ color: PRIMARY }}>
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th
              className="text-left py-3 text-sm font-semibold text-gray-700 pr-4"
              style={{ fontFamily: F }}
            >
              Product
            </th>
            <th
              className="text-left py-3 text-sm font-semibold text-gray-700 px-4"
              style={{ fontFamily: F }}
            >
              Quantity
            </th>
            <th
              className="text-left py-3 text-sm font-semibold text-gray-700 px-4"
              style={{ fontFamily: F }}
            >
              Subtotal
            </th>
            <th className="py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartRow
              key={item.name}
              item={item}
              onIncrease={() => onIncrease(item.name)}
              onDecrease={() => onDecrease(item.name)}
              onRemove={() => onRemove(item.name)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
