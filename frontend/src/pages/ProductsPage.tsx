import { useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SidebarFilters, { type FilterState } from "../components/SidebarFilters";
import { useProducts, useCart, useCategories } from "../services/hooks";
import { reviewApi, type Review } from "../services/api";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get("category");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;
  const { products, loading, error } = useProducts(categoryId);
  const { categories } = useCategories();
  const { addToCart } = useCart();
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 2000000,
    status: [],
    minRating: null,
  });

  // Reviews state for rating filter
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch all reviews for rating calculation
  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const data = await reviewApi.getAll();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const selectedCategory = categories.find((category) => category.id === categoryId);

  // Memoize average ratings for each product
  const productAverageRatings = useMemo(() => {
    const ratingMap: Record<number, number> = {};
    
    reviews.forEach(review => {
      if (!ratingMap[review.productId]) {
        ratingMap[review.productId] = 0;
      }
      ratingMap[review.productId] += review.rating;
    });

    // Convert to average
    Object.keys(ratingMap).forEach(productId => {
      const productReviews = reviews.filter(r => r.productId === Number(productId));
      if (productReviews.length > 0) {
        ratingMap[Number(productId)] = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      }
    });

    return ratingMap;
  }, [reviews]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Check rating filter first
      if (filters.minRating !== null) {
        const productRating = productAverageRatings[product.id] ?? 0;
        if (productRating < filters.minRating) {
          return false;
        }
      }

      // Check if product has any variants that match the filters
      const hasMatchingVariant = product.variants?.some(variant => {
        // Check size filter
        if (filters.sizes.length > 0 && !filters.sizes.includes(variant.size)) {
          return false;
        }
        
        // Check color filter
        if (filters.colors.length > 0 && !filters.colors.includes(variant.color)) {
          return false;
        }
        
        // Check price filter
        if (variant.price < filters.minPrice || variant.price > filters.maxPrice) {
          return false;
        }

        // Check status filter based on stock_quantity
        if (filters.status.length > 0) {
          const isInStock = variant.stockQuantity > 0;
          const isOutOfStock = variant.stockQuantity === 0;
          
          const matchesStatus = filters.status.some(status => {
            if (status === "in-stock" && isInStock) return true;
            if (status === "out-of-stock" && isOutOfStock) return true;
            return false;
          });

          if (!matchesStatus) {
            return false;
          }
        }
        
        return true;
      });
      
      return hasMatchingVariant ?? false;
    });
  }, [products, filters, productAverageRatings]);

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
          <SidebarFilters 
            products={products}
            onFilterChange={setFilters}
            loading={loading}
          />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-4 pb-24 scrollbar-thin">
            {loading ? (
              <div className="flex h-full items-center justify-center text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 animate-pulse">Loading Collection...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex h-full items-center justify-center flex-col gap-4">
                <div className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                  Không có sản phẩm phù hợp
                </div>
                <p className="text-[10px] text-gray-400">
                  Vui lòng thử lại với các bộ lọc khác
                </p>
              </div>
            ) : (
              <>
                <div className="text-[9px] text-gray-400 font-bold mb-4">
                  Tìm thấy <span className="text-black font-bold">{filteredProducts.length}</span> sản phẩm
                </div>
                <div className="grid gap-x-10 gap-y-14 transition-all duration-700 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((item) => (
                    <div key={item.id} className="hover:-translate-y-2 transition-transform duration-500">
                      <ProductCard product={item} onAddToCart={addToCart} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;