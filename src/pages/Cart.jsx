import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import CartBanner from "../sections/CartBanner";
import CartTable from "../sections/CartTable";
import CartTotals from "../sections/CartTotals";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";
import Footer from "../components/layout/Footer";

// Mock cart data — sau này replace bằng context/zustand
const INITIAL_CART = [
  {
    name: "Iphone 15",
    priceNum: 16900000,
    image: "/ip15pls.png",
    qty: 1,
  },
  {
    name: "Watch",
    priceNum: 9900000,
    image: "/rex3pro.png",
    qty: 1,
  },
];

export default function Cart() {
  const [items, setItems] = useState(INITIAL_CART);

  const handleIncrease = (name) =>
    setItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, qty: item.qty + 1 } : item,
      ),
    );

  const handleDecrease = (name) =>
    setItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, qty: Math.max(1, item.qty - 1) } : item,
      ),
    );

  const handleRemove = (name) =>
    setItems((prev) => prev.filter((item) => item.name !== name));

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <CartBanner />

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <CartTable
          items={items}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
        <CartTotals items={items} />
      </section>

      <Newsletter />
      <ShopInsta />
      <Footer />
    </div>
  );
}
