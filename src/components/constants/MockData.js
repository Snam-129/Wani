import airport from "../../assets/images/airport.png";
import iphone from "../../assets/images/ctg_ip.png";
import mac from "../../assets/images/ctg_mac.png";
import watch from "../../assets/images/ctg_watch.png";

// ── CATEGORIES ──
export const cats = [
  { img: airport, name: "Air Pods", count: "12 Items" },
  { img: watch, name: "Smart Watches", count: "8 Items" },
  { img: mac, name: "Laptops", count: "24 Items" },
  { img: iphone, name: "Mobile Phones", count: "36 Items" },
];

// ── PRODUCT CARD (ĐÃ BỔ SUNG ĐẦY ĐỦ CATEGORY, TAGS, BRAND, PRICENUM) ──
export const products = [
  {
    id: 1,
    name: "iPhone 17 Pro Max 256GB",
    price: "37.990.000đ",
    old: "42.990.000đ",
    image: "/ip17.png",
    badge: "Sale",
    bg: "#fff5f0",
    category: "iPhone", // 🌟 Thêm danh mục cụ thể
    brand: "Apple", // 🌟 Thêm thương hiệu để phục vụ bộ lọc Brand
    tags: ["Sale", "Popular"], // 🌟 Thêm mảng tags để khớp với logic p.tags?.includes()
    priceNum: 37990000, // 🌟 Thêm số nguyên để bộ lọc khoảng giá và sort chạy mượt
  },
  {
    id: 2,
    name: "iPhone 16 Pro Max",
    price: "32.990.000đ",
    image: "/ip16.png",
    badge: null,
    bg: "#f5f5ff",
    category: "iPhone",
    brand: "Apple",
    tags: ["Popular"],
    priceNum: 32990000,
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: "6.790.000đ",
    image: "/airportpro.png",
    badge: null,
    bg: "#f0f8ff",
    category: "AirPods",
    brand: "Apple",
    tags: ["New"],
    priceNum: 6790000,
  },
  {
    id: 4,
    name: "iPhone 15 Plus",
    price: "17.990.000đ",
    image: "/ip15pls.png",
    badge: null,
    bg: "#f5f5f5",
    category: "iPhone",
    brand: "Apple",
    tags: [],
    priceNum: 17990000,
  },
  {
    id: 5,
    name: "Apple MacBook Pro",
    price: "41.990.000đ",
    old: "46.990.000đ",
    image: "/macpro.png",
    badge: "New",
    bg: "#f9f9f9",
    category: "MacBook",
    brand: "Apple",
    tags: ["New"],
    priceNum: 41990000,
  },
  {
    id: 6,
    name: "Laptop Lenovo IdeaPad Slim 5",
    price: "14.990.000đ",
    image: "/laptop.png",
    badge: "Sale",
    bg: "#fff8f0",
    category: "Laptop",
    brand: "Lenovo",
    tags: ["Sale"],
    priceNum: 14990000,
  },
  {
    id: 7,
    name: "Chuột Gaming Razer Basilisk V3 Pro",
    price: "3.190.000đ",
    image: "/basilok.png",
    badge: null,
    bg: "#fff0f5",
    category: "Accessories",
    brand: "Razer",
    tags: ["Popular"],
    priceNum: 3190000,
  },
  {
    id: 8,
    name: "Amazfit T-Rex 3 Pro 46mm",
    price: "4.690.000đ",
    old: "5.290.000đ",
    image: "/rex3pro.png",
    badge: null,
    bg: "#f5f0ea",
    category: "Smartwatch",
    brand: "Amazfit",
    tags: [],
    priceNum: 4690000,
  },
];

// ── REVIEWS ──
export const reviews = [
  {
    name: "Nguyên Vinh",
    text: '"Tôi phải giá rất tốt, sản phẩm chính hãng, giao hàng siêu nhanh!"',
    stars: 5,
    init: "NV",
    color: "#fff0e8",
  },
  {
    name: "Diệu Linh",
    text: '"Nhân viên tư vấn nhiệt tình, mua MacBook được tặng thêm phụ kiện xịn."',
    stars: 4,
    init: "DL",
    color: "#e8f0ff",
  },
  {
    name: "Quang Teo",
    text: '"Tôi phải giá rất đúng, sản phẩm đúng như mô tả. Sẽ ủng hộ tiếp!"',
    stars: 5,
    init: "QT",
    color: "#e8ffe8",
  },
];

// ── LATEST POSTS ──
export const posts = [
  {
    tag: "Technology",
    title: "Technology Hack That You Don't Know",
    date: "Aug 21, 2024",
    image: "lt-mac.png",
    bg: "#1a1a2a",
  },
  {
    tag: "Watches",
    title: "Best Digital Watches To Buy In This Year",
    date: "May 12, 2024",
    image: "lt-watch.png",
    bg: "#f0f0f0",
  },
  {
    tag: "Video",
    title: "How To Use Gimbal To Take Video",
    date: "May 5, 2024",
    image: "lt-gimbal.png",
    bg: "#2a2a2a",
  },
];

// ── FEATURES ──
export const features = [
  {
    icon: "🚚",
    title: "Free Delivery",
    desc: "Consectetur adipiscing elit, sed do tempus ut labore et dolore.",
  },
  {
    icon: "✅",
    title: "Quality Guarantee",
    desc: "Dolor sit amet consectetur adipiscing elit, aenean adiquet sit.",
  },
  {
    icon: "🎁",
    title: "Daily Offers",
    desc: "Amet consectetur adipiscing elit, aenean convalis at arcu at ornare purus.",
  },
  {
    icon: "🔒",
    title: "100% Secure Payment",
    desc: "Nam ulputat dolor, at ut amet consectetur adipiscing convallis sit.",
  },
];

// ── SHOP INSTA ──
export const instaIcons = [
  { image: "in-ip1.png" },
  { image: "in-ip2.png" },
  { image: "in-ip3.png" },
  { image: "in-fl1.png" },
  { image: "in-ip4.png" },
];

// Shop
export const FILTER_DATA = {
  CATEGORIES: [
    "All",
    "iPhone",
    "AirPods",
    "MacBook",
    "Laptop",
    "Accessories",
    "Smartwatch",
  ],
  TAGS: ["Sale", "New", "Popular"],
  BRANDS: ["Apple", "Lenovo", "Razer", "Amazfit"],
  PRICE_RANGES: [
    { label: "Dưới 5 triệu", min: 0, max: 5000000 },
    { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
    { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
    { label: "20 - 40 triệu", min: 20000000, max: 40000000 },
    { label: "Trên 40 triệu", min: 40000000, max: Infinity },
  ],
};

// ── BLOG DATA ──
export const blogPosts = [
  {
    id: 1,
    title: "Technology Hack That You Don't Know",
    date: "Feb 22, 2024",
    category: "Technology",
    image: "/lt-mac.png",
    excerpt:
      "Discover amazing tech hacks that will change the way you use your devices daily.",
  },
  {
    id: 2,
    title: "Best Digital Watches To Buy In This Year",
    date: "Feb 22, 2024",
    category: "Watches",
    image: "/lt-watch.png",
    excerpt:
      "Top smartwatches with the best features and battery life in 2024.",
  },
  {
    id: 3,
    title: "How To Use Gimbal To Take Video",
    date: "Feb 22, 2024",
    category: "Gadgets",
    image: "/lt-gimbal.png",
    excerpt: "Master cinematic shots with professional gimbal techniques.",
  },
  {
    id: 4,
    title: "Best Airpod That You Must Get It",
    date: "Feb 22, 2024",
    category: "Gadgets",
    image: "/airportpro.png",
    excerpt:
      "Comparing the latest AirPods models and which one is worth buying.",
  },
  {
    id: 5,
    title: "Best Digital Watches To Buy In This Year",
    date: "Feb 22, 2024",
    category: "Phones",
    image: "/ip17.png",
    excerpt: "Latest flagship phones with incredible cameras and performance.",
  },
  {
    id: 6,
    title: "How To Setup Your GoPro",
    date: "Feb 22, 2024",
    category: "Gadgets",
    image: "/basilok.png",
    excerpt:
      "Complete guide to setting up and getting the most out of your GoPro.",
  },
  {
    id: 7,
    title: "Why People Are Buying These PlayStations",
    date: "Feb 22, 2024",
    category: "Technology",
    image: "/macpro.png",
    excerpt: "The gaming console that everyone is talking about this year.",
  },
  {
    id: 8,
    title: "You Just Need To Use This Headset To Listen Music",
    date: "Feb 22, 2024",
    category: "Laptops",
    image: "/laptop.png",
    excerpt: "Best audio experience with premium noise-cancelling headphones.",
  },
  {
    id: 9,
    title: "Make Your Working Space Need And Clean",
    date: "Feb 22, 2024",
    category: "Gadgets",
    image: "/rex3pro.png",
    excerpt: "Organize your workspace for maximum productivity.",
  },
];
