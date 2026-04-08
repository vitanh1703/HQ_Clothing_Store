import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";
import { useProducts, useCart, useCategories } from "../services/hooks";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get("category");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;
  const { products, loading, error } = useProducts(categoryId);
  const { categories } = useCategories();
  const { addToCart } = useCart();

  const selectedCategory = categories.find((category) => category.id === categoryId);

  if (error) return <div className="h-screen flex items-center justify-center text-red-500 uppercase font-black tracking-tight">Error: {error}</div>;

  return (
    <div className="bg-[#F8F8F8] h-screen overflow-hidden flex flex-col font-sans px-10 py-6">
      <header className="mb-8 shrink-0">
        <div className="text-[9px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-1">Home / Shop</div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-[#1A1A1A] uppercase tracking-tighter italic">
              SẢN PHẨM
            </h1>
            {selectedCategory && (
              <p className="text-sm uppercase mt-2 text-gray-500">
                Danh mục: <span className="font-bold text-black">{selectedCategory.name}</span>
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="flex gap-12 flex-1 overflow-hidden relative">
        
        <aside className="shrink-0 overflow-y-auto scrollbar-hide w-64">
          <SidebarFilters />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-4 pb-24 scrollbar-thin">
            {loading ? (
              <div className="flex h-full items-center justify-center text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 animate-pulse">Loading Collection...</div>
            ) : (
              <div className="grid gap-x-10 gap-y-14 transition-all duration-700 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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