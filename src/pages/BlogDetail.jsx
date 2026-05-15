import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../components/constants/MockData"; // Đường dẫn file data của bạn
import { PRIMARY } from "../components/constants/Theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Newsletter from "../sections/Newsletter";
import ShopInsta from "../sections/ShopInsta";

const F = "'Plus Jakarta Sans', sans-serif";

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div className="text-center py-20">Blog post not found!</div>;
  }

  // Lấy 3 bài viết liên quan (bỏ bài hiện tại)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12" style={{ fontFamily: F }}>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <Link to="/blogs" className="hover:text-black">
            {post.category}
          </Link>
        </nav>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Main Image */}
        <div className="w-full rounded-3xl overflow-hidden mb-10 shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          <p className="mb-6">
            In the rapidly evolving world of technology, staying ahead means
            more than just having the latest gadgets. It's about understanding
            the subtle nuances of how these devices integrate into our daily
            lives.
            {post.excerpt}. Whether you are a professional or a casual user,
            mastering these small details can significantly boost your
            efficiency and creative output.
          </p>

          <p className="mb-8">
            The first thing to consider is the environment in which you use your
            equipment. Lighting, stability, and even the software version can
            make a world of difference. For instance, when we talk about
            <strong> {post.category}</strong>, we aren't just talking about
            hardware; we are talking about an ecosystem designed to make tasks
            seamless and intuitive.
          </p>

          {/* Blockquote */}
          <blockquote className="border-l-4 border-black pl-6 my-10 italic text-2xl text-gray-800 font-medium py-2">
            "Technology is best when it brings people together and makes our
            daily tasks feel like a natural extension of our own capabilities."
          </blockquote>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Is This Great?
          </h3>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Optimized for professional performance and longevity.</li>
            <li>Seamless integration with multi-device ecosystems.</li>
            <li>Intuitive interface designed for users of all skill levels.</li>
          </ul>

          <p className="mb-10">
            As we look further into the year 2024, the focus has shifted toward
            sustainability and "Smart Living." It’s no longer enough for a
            product to be fast; it must also be energy-efficient and provide
            long-term value to the consumer. This is exactly where our top picks
            for the season come into play.
          </p>

          {/* Sub-section with Image */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-3xl mb-10">
            <div className="md:w-1/3">
              <img
                src="/macpro.png"
                alt="sub-img"
                className="rounded-2xl shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Velit, Praesent Pharetra Malesuada
              </h4>
              <p className="text-sm">
                Focusing on the finer details allows us to appreciate the
                craftsmanship behind the screen. Every pixel and every component
                is a result of years of research and development aimed at
                perfection. This approach ensures that you aren't just buying a
                product, but an experience that lasts.
              </p>
            </div>
          </div>

          <p>
            In conclusion, while the market is flooded with options, focusing on
            quality and purpose-driven technology will always lead to better
            results. Stay tuned for more deep dives into your favorite gadgets
            and tech hacks.
          </p>
        </div>

        {/* Tags & Share */}
        <div className="flex flex-wrap justify-between items-center border-t border-b border-gray-100 py-6 mt-12">
          <div className="flex gap-2">
            <span className="font-bold mr-2">Tags:</span>
            {["Tech", "Gadgets", "Trends"].map((tag) => (
              <span
                key={tag}
                className="text-gray-500 hover:text-black cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold">Share:</span>
            <div className="flex gap-3">
              <i className="fab fa-facebook-f text-gray-400 hover:text-blue-600 cursor-pointer"></i>
              <i className="fab fa-twitter text-gray-400 hover:text-blue-400 cursor-pointer"></i>
              <i className="fab fa-linkedin-in text-gray-400 hover:text-blue-700 cursor-pointer"></i>
            </div>
          </div>
        </div>

        {/* Navigation Posts */}
        <div className="flex justify-between py-10 text-sm font-bold">
          <span className="cursor-pointer hover:underline">
            ← PREVIOUS POST
          </span>
          <span className="cursor-pointer hover:underline">NEXT POST →</span>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">3 Comments</h3>
          <div className="space-y-8">
            <CommentItem
              name="Alex Smith"
              date="March 12, 2024"
              text="This hack totally changed my workflow! I never knew my device could do that. Great write-up!"
              avatar="https://i.pravatar.cc/150?u=alex"
            />
            <CommentItem
              name="Sarah Connor"
              date="March 13, 2024"
              text="Very informative. I've been struggling with my gimbal for weeks, but these tips finally made it click."
              avatar="https://i.pravatar.cc/150?u=sarah"
            />
          </div>
        </div>

        {/* Leave a Comment */}
        <div className="mt-16 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold mb-6">Leave A Comment</h3>
          <form className="space-y-4">
            <textarea
              placeholder="Your Comment"
              className="w-full p-4 bg-gray-50 rounded-2xl h-32 focus:outline-none focus:ring-1 focus:ring-black"
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition">
              POST COMMENT
            </button>
          </form>
        </div>

        {/* Related Posts */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {relatedPosts.map((p) => (
              <Link
                key={p.id}
                to={`/blogs/${p.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden mb-4 aspect-video">
                    <img
                      src={p.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {p.date} • {p.category}
                  </p>
                  <h4 className="font-bold group-hover:text-gray-600 transition">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Newsletter />
      <ShopInsta />
      <Footer />
    </>
  );
}

function CommentItem({ name, date, text, avatar }) {
  return (
    <div className="flex gap-4">
      <img src={avatar} className="w-12 h-12 rounded-full" />
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-bold text-sm">{name}</h4>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
        <button className="text-xs font-bold mt-2 hover:underline">
          REPLY
        </button>
      </div>
    </div>
  );
}
