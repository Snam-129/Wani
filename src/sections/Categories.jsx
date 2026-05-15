import { cats } from "../components/constants/MockData";
import { PRIMARY } from "../components/constants/Theme";

function Categories() {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <h2 className="text-center text-xl font-bold mb-8 text-gray-900">
        Our Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cats.map((c) => (
          <div
            key={c.name}
            className="relative overflow-hidden rounded-xl cursor-pointer group"
          >
            <div className="bg-gray-100 h-full w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <img src={c.img} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent rounded-xl" />
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <p className="text-white font-bold text-sm">{c.name}</p>
              <p className="text-gray-300 text-xs">{c.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-5">
        <div
          className="w-5 h-2 rounded-full"
          style={{ backgroundColor: PRIMARY }}
        />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </section>
  );
}
export default Categories;
