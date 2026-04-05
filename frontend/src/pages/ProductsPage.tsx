import { ChevronDown, Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts, useCart } from "../services/hooks";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart, isAdding } = useCart();

  const filters = ["Size", "Availability", "Category", "Colors", "Price Range", "Collections", "Tags", "Ratings"];
  const categories = ["NEW", "SHIRTS", "POLO SHIRTS", "SHORTS", "SUITS", "BEST SELLERS", "T-SHIRTS", "JEANS", "JACKETS", "COATS"];

  if (error) return (
    <div className="h-screen flex items-center justify-center text-red-500 font-bold uppercase tracking-widest">
      Error: {error}
    </div>
  );

  return (
    <div className="bg-[#F5F5F5] h-screen overflow-hidden flex flex-col font-sans px-8 py-4">
      <header className="mb-4 shrink-0">
        <div className="text-[10px] text-gray-400 font-normal tracking-tight uppercase">Home / Products</div>
        <h1 className="text-xl font-bold text-[#333] uppercase tracking-normal mt-0.5">PRODUCTS</h1>
      </header>

      <div className="flex gap-12 flex-1 overflow-hidden">
        {/* SIDEBAR FILTERS */}
        <aside className="w-64 space-y-8 shrink-0 overflow-y-auto pr-2 scrollbar-hide">
          <h3 className="font-bold uppercase text-xs tracking-widest mb-6">Filters</h3>
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase text-gray-800">Size</p>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "2X"].map((s) => (
                <button key={s} className="w-10 h-10 border border-gray-300 text-[10px] font-bold hover:bg-black hover:text-white transition-all bg-white">{s}</button>
              ))}
            </div>
          </div>
          {filters.slice(1).map((f) => (
            <div key={f} className="flex justify-between items-center py-4 border-t border-gray-200 cursor-pointer hover:opacity-70">
              <span className="text-[10px] font-bold uppercase tracking-widest">{f}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          ))}
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-start justify-between mb-8 gap-4 shrink-0">
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2.5 bg-[#E2E2E2] border-none outline-none text-xs text-gray-500 rounded-sm" />
            </div>
            <div className="grid grid-cols-5 gap-1 shrink-0">
              {categories.map(c => (
                <button key={c} className="px-3 py-1 text-[9px] border border-gray-200 bg-white font-bold hover:bg-black hover:text-white transition-all uppercase min-w-22.5 h-7 flex items-center justify-center shadow-sm">{c}</button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 pb-20 scrollbar-thin">
            {loading ? (
              <div className="text-center py-10 font-bold uppercase tracking-widest text-gray-400 animate-pulse">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {products.map((item) => (
                  <ProductCard 
                    key={item.id}
                    product={item} 
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
  
      {isAdding && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center pointer-events-none">
           <div className="bg-white p-4 rounded-full shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;