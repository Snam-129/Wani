import { useState } from "react";
import Hero from "../sections/Hero";
import Categories from "../sections/Categories";
import BestSellers from "../sections/BestSellers";
import PromoBanners from "../sections/PromoBanners";
import Reviews from "../sections/Reviews";
import LatestPosts from "../sections/LatestPosts";
import Features from "../sections/Features";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";
import Footer from "../components/layout/Footer";
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";

// Inject font
const style = document.createElement("style");
style.textContent = `
  @import url('${FONT_LINK}');
  * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(style);

// ── FOOTER ──

// ── APP ──
export default function Home() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Hero />
      <Categories />
      <BestSellers />
      <PromoBanners />
      <Reviews />
      <LatestPosts />
      <Features />
      <Newsletter />
      <ShopInsta />
      <Footer />
    </div>
  );
}
