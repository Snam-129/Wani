import { PRIMARY } from "../constants/Theme";
import { FILTER_DATA } from "../constants/MockData"; // Import dữ liệu mới

const F = "'Plus Jakarta Sans', sans-serif";

function SidebarSection({ title, children }) {
  return (
    <div className="mb-7">
      <h4
        className="text-sm font-semibold text-gray-700 mb-3"
        style={{ fontFamily: F, color: "#9ca3af" }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function FilterItem({ label, active, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-sm transition-colors duration-150 text-left w-full"
        style={{
          fontFamily: F,
          color: active ? PRIMARY : "#374151",
          fontWeight: active ? 600 : 400,
        }}
      >
        {label}
      </button>
    </li>
  );
}

export default function ShopSidebar({ filters, setFilters }) {
  const toggle = (key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));

  return (
    <aside className="w-44 shrink-0">
      {/* Categories */}
      <SidebarSection title="Categories">
        <ul className="space-y-2">
          {FILTER_DATA.CATEGORIES.map((cat) => {
            const isAll = cat === "All";
            const active = isAll ? !filters.category : filters.category === cat;
            return (
              <FilterItem
                key={cat}
                label={cat}
                active={active}
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    category: isAll ? null : cat === p.category ? null : cat,
                  }))
                }
              />
            );
          })}
        </ul>
      </SidebarSection>

      {/* Tags */}
      <SidebarSection title="Tags">
        <ul className="space-y-2">
          {FILTER_DATA.TAGS.map((tag) => (
            <FilterItem
              key={tag}
              label={tag}
              active={filters.tag === tag}
              onClick={() => toggle("tag", tag)}
            />
          ))}
        </ul>
      </SidebarSection>

      {/* Brands */}
      <SidebarSection title="Brands">
        <ul className="space-y-2">
          {FILTER_DATA.BRANDS.map((brand) => (
            <FilterItem
              key={brand}
              label={brand}
              active={filters.brand === brand}
              onClick={() => toggle("brand", brand)}
            />
          ))}
        </ul>
      </SidebarSection>

      {/* Filter By Price */}
      <SidebarSection title="Filter By Price">
        <ul className="space-y-2">
          {FILTER_DATA.PRICE_RANGES.map((range) => (
            <FilterItem
              key={range.label}
              label={range.label}
              active={filters.priceLabel === range.label}
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  priceLabel: p.priceLabel === range.label ? null : range.label,
                  priceMin: p.priceLabel === range.label ? null : range.min,
                  priceMax: p.priceLabel === range.label ? null : range.max,
                }))
              }
            />
          ))}
        </ul>
      </SidebarSection>
    </aside>
  );
}
