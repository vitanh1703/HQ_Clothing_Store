import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts, useCart } from "../services/hooks";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  
  // ĐÃ SỬA: Đổi true thành false để vào trang là ẩn Sidebar ngay
  const [showFilters, setShowFilters] = useState(false);

  // Lắng nghe tín hiệu từ Header
  useEffect(() => {
    const handleToggle = () => {
      setShowFilters(prev => !prev);
    };

    window.addEventListener("toggle-products-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-products-sidebar", handleToggle);
  }, []);

  const filters = ["Size", "Availability", "Category", "Colors", "Price Range", "Collections", "Ratings"];

  if (error) return <div className="h-screen flex items-center justify-center text-red-500 uppercase font-black tracking-tight">Error: {error}</div>;

  return (
    <div className="bg-[#F8F8F8] h-screen overflow-hidden flex flex-col font-sans px-10 py-6">
      {/* HEADER TRANG - Breadcrumb tối giản và sang trọng */}
      <header className="mb-8 shrink-0">
        <div className="text-[9px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-1">Home / Shop</div>
        <div className="flex justify-between items-end border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-black text-[#1A1A1A] uppercase tracking-tighter italic">SẢN PHẨM</h1>
        </div>
      </header>

      <div className="flex gap-12 flex-1 overflow-hidden relative">
        
        {/* SIDEBAR FILTERS - Chỉ hiện khi ấn nút Menu trên Header */}
        <aside 
          className={`shrink-0 overflow-y-auto scrollbar-hide transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${showFilters ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-10 pointer-events-none"}`}
        >
          <div className="min-w-[240px]">
            <h3 className="font-black uppercase text-[11px] tracking-[0.25em] mb-8 text-black border-b-2 border-black pb-2 w-fit">Filters</h3>
            
            <div className="mb-10">
              <p className="text-[10px] font-black uppercase text-gray-900 mb-4 tracking-widest text-left">Size</p>
              <div className="grid grid-cols-3 gap-2">
                {["XS", "S", "M", "L", "XL", "2X"].map((s) => (
                  <button key={s} className="aspect-square border border-gray-200 text-[10px] font-bold hover:bg-black hover:text-white transition-all bg-white flex items-center justify-center">{s}</button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {filters.slice(1).map((f) => (
                <div key={f} className="flex justify-between items-center py-5 border-b border-gray-100 cursor-pointer group hover:pl-2 transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 group-hover:text-black">{f}</span>
                  <ChevronDown size={12} className="text-gray-300 group-hover:text-black" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT - GRID SẢN PHẨM */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-4 pb-24 scrollbar-thin">
            {loading ? (
              <div className="flex h-full items-center justify-center text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 animate-pulse">Loading Collection...</div>
            ) : (
              <div className={`grid gap-x-10 gap-y-14 transition-all duration-700
                ${showFilters 
                  ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                {products.map((item) => (
                  <div key={item.id} className="hover:-translate-y-2 transition-transform duration-500">
                    <ProductCard product={item} onAddToCart={addToCart} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;