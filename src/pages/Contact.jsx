import PageBanner from "../components/common/PageBanner";
import TopBar from "../components/layout/TopBar";
import ContactContent from "../sections/ContactContent";
import Navbar from "../components/layout/Navbar";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";
import Footer from "../components/layout/Footer";
function Contact() {
  return (
    <>
      {/* Banner cho trang Contact */}
      <PageBanner title="Contact" linkText="Contact" linkPath="/contact" />

      {/* Các phần nội dung khác của trang Contact bên dưới */}
      <ContactContent />
      <Newsletter />
      <ShopInsta />
      <Footer />
    </>
  );
}

export default Contact;
