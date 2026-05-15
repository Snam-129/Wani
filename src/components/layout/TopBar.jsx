import { PRIMARY } from "../constants/Theme";

function TopBar() {
  return (
    <div style={{ backgroundColor: "#FFEBD2" }} className="w-full py-2 px-4">
      <div
        className="max-w-6xl mx-auto flex justify-between items-center text-xs"
        style={{ color: "#7a5c3a" }}
      >
        <span>Need Help? Call Us: 0333344400</span>
        <span className="hidden sm:block">
          Summer Sale Discount Off 40% OFF!{" "}
          <span
            style={{ color: PRIMARY }}
            className="font-semibold cursor-pointer"
          >
            Shop Now
          </span>
        </span>
        <span className="hidden md:block">
          2–3 Business Days Delivery & Free Returns
        </span>
      </div>
    </div>
  );
}
export default TopBar;
