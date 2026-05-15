import { useState } from "react";
import viteLogo from "./assets/vite.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Navbar from "./components/layout/Navbar";
import TopBar from "./components/layout/TopBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/pages/:name" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
