import { useState, useMemo } from "react";
import Toolbar from "./Toolbar";
import ShopProductCard from "./ShopProductCard";
import ShopSidebar from "./ShopSidebar";
import Pagination from "./Pagination";
import ProductDetail from "../../pages/ProductDetail"; // ← Import modal
import { products } from "../constants/MockData";

const PER_PAGE = 6;

const defaultFilters = {
  category: null,
  tag: null,
  brand: null,
  priceLabel: null,
  priceMin: null,
  priceMax: null,
};

export default function ShopGrid() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // ← State modal

  // ── Filter + sort logic ──
  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.category)
      list = list.filter((p) => p.category === filters.category);

    if (filters.tag) list = list.filter((p) => p.tags?.includes(filters.tag));

    if (filters.brand) list = list.filter((p) => p.brand === filters.brand);

    if (filters.priceMin !== null)
      list = list.filter(
        (p) => p.priceNum >= filters.priceMin && p.priceNum <= filters.priceMax,
      );

    if (search.trim())
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );

    if (sort === "asc") list.sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "desc") list.sort((a, b) => b.priceNum - a.priceNum);

    return list;
  }, [filters, sort, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSort = (val) => {
    setSort(val);
    setPage(1);
  };
  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Toolbar */}
      <Toolbar
        total={filtered.length}
        shown={paged.length}
        sort={sort}
        setSort={handleSort}
        search={search}
        setSearch={handleSearch}
      />

      {/* Main Content */}
      <div className="flex gap-10 items-start">
        <div className="flex-1 min-w-0">
          {paged.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paged.map((p, index) => (
                <ShopProductCard
                  key={p.name || index}
                  product={p}
                  onClick={() => setSelectedProduct(p)} // ← Click mở modal
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 text-sm">
              Không tìm thấy sản phẩm nào.
            </div>
          )}

          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>

        <div className="hidden lg:block">
          <ShopSidebar filters={filters} setFilters={handleFilter} />
        </div>
      </div>

      {/* Modal Product Detail */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
