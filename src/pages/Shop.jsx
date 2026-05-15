import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import PromoBanners from "../sections/PromoBanners";
import Reviews from "../sections/Reviews";
import LatestPosts from "../sections/LatestPosts";
import Features from "../sections/Features";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";
import Footer from "../components/layout/Footer";
import ShopGrid from "../components/shop/ShopGrid";
import PageBanner from "../components/common/PageBanner";
export default function About() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageBanner />
      <ShopGrid />
      <Reviews />
      <Newsletter />
      <ShopInsta />
      <Footer />
    </div>
  );
}
