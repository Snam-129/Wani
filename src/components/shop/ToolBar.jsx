import SearchIcon from "../ui/SearchIcon";
import { PRIMARY } from "../constants/Theme";

const F = "'Plus Jakarta Sans', sans-serif";

const SORT_OPTIONS = [
  { label: "Default sorting", value: "default" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

export default function Toolbar({
  total,
  shown,
  sort,
  setSort,
  search,
  setSearch,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Left: result count */}
      <p className="text-sm text-gray-500" style={{ fontFamily: F }}>
        Showing 1–{shown} of{" "}
        <span className="font-semibold text-gray-800">{total}</span> results
      </p>

      {/* Right: sort + search */}
      <div className="flex items-center gap-3">
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none text-sm text-gray-600 border border-gray-200 rounded px-4 py-2 pr-8 bg-white outline-none cursor-pointer hover:border-gray-400 transition-colors"
            style={{ fontFamily: F }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Search box */}
        <div className="flex items-center border border-gray-200 rounded overflow-hidden hover:border-gray-400 transition-colors focus-within:border-gray-400">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm px-4 py-2 outline-none text-gray-700 w-40 placeholder-gray-400"
            style={{ fontFamily: F }}
          />
          <button
            className="px-3 py-2.5 flex items-center justify-center text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            <SearchIcon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
