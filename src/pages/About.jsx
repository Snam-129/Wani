import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
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
import AboutDetail from "../sections/AboutDetail";
import PageBanner from "../components/common/PageBanner";
export default function About() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageBanner title="About Us" linkText="About Us" linkPath="about" />
      <Features />
      <AboutDetail />
      <Reviews />
      <Newsletter />
      <ShopInsta />
      <Footer />
    </div>
  );
}
