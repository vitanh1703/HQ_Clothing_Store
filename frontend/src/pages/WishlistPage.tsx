import { useEffect, useState } from "react";
import { Heart, ChevronRight } from "lucide-react";
import { useProducts, useCart } from "../services/hooks";
import type { Product, Variant } from "../services/api";

type WishlistItem = {
  id: number;
  productId: number;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  image: string;
  description: string;
};

const DEFAULT_WISHLIST = [4, 5]; // sample variant ids from backend

const WishlistPage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart, isAdding } = useCart();

  const [wishlistVariantIds, setWishlistVariantIds] = useState<number[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlistVariantIds");
    const variantIds = stored ? (JSON.parse(stored) as number[]) : DEFAULT_WISHLIST;
    setWishlistVariantIds(variantIds);
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const items: WishlistItem[] = [];

    products.forEach((product: Product) => {
      product.variants.forEach((variant: Variant) => {
        if (wishlistVariantIds.includes(variant.id)) {
          items.push({
            id: variant.id,
            productId: product.id,
            name: product.name,
            sku: variant.sku ?? "",
            color: variant.color,
            size: variant.size,
            price: variant.price,
            image: product.imageUrl || "https://via.placeholder.com/250",
            description: product.description || "Không có mô tả",
          });
        }
      });
    });

    setWishlistItems(items);
  }, [products, wishlistVariantIds]);

  const saveWishlist = (variantIds: number[]) => {
    localStorage.setItem("wishlistVariantIds", JSON.stringify(variantIds));
    setWishlistVariantIds(variantIds);
  };

  const handleRemoveFavorite = (variantId: number) => {
    saveWishlist(wishlistVariantIds.filter((id) => id !== variantId));
  };

  const handleAddToCart = async (variantId: number) => {
    await addToCart(variantId, 1);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="border-t border-gray-100 bg-[#f9f9f9] py-4">
          <nav className="max-w-7xl mx-auto px-4">
            <div className="flex flex-nowrap overflow-x-auto md:grid md:grid-cols-6 gap-2 scrollbar-hide">
              {["SHIRTS", "POLO SHIRTS", "SHORTS", "T-SHIRTS", "JEANS", "JACKETS"].map((category) => (
                <a
                  key={category}
                  href="#"
                  className="flex-shrink-0 min-w-[120px] bg-white border border-gray-300 py-2.5 text-center text-[12px] font-bold text-gray-800 hover:bg-black hover:text-white transition-all tracking-widest shadow-sm"
                >
                  {category}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <aside className="col-span-1 space-y-8">
          <section>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Tư cách thành viên</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Lịch sử mua hàng</li>
              <li className="hover:text-black cursor-pointer">Phiếu giảm giá</li>
              <li className="font-bold text-black border-l-2 border-black pl-3">Yêu thích</li>
              <li className="hover:text-black cursor-pointer">Đánh giá đã đăng</li>
              <li className="hover:text-black cursor-pointer">Khảo sát dịch vụ đặt hàng online</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Cài đặt hồ sơ</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Hồ sơ</li>
              <li className="hover:text-black cursor-pointer">Sổ địa chỉ</li>
              <li className="hover:text-black cursor-pointer">Thay đổi mật khẩu</li>
              <li className="hover:text-black cursor-pointer">Thẻ của tôi</li>
              <li className="hover:text-black cursor-pointer">Cài đặt tùy chọn</li>
              <li className="hover:text-black cursor-pointer text-red-500">Hủy bỏ thành viên</li>
            </ul>
          </section>
        </aside>

        <div className="col-span-3">
          <h1 className="text-3xl font-bold mb-6 italic">Yêu thích</h1>

          <div className="flex gap-8 border-b border-gray-200 mb-4">
            <button className="pb-2 border-b-2 border-black font-bold text-sm">Sản phẩm</button>
            <button className="pb-2 text-gray-400 font-bold text-sm hover:text-black">Phong cách</button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm">Kết quả: {wishlistItems.length} sản phẩm</p>
            <button className="flex items-center gap-1 text-sm font-bold border-b border-black">
              Sắp xếp theo <ChevronRight size={14} className="rotate-90" />
            </button>
          </div>

          {loading && <p className="text-sm text-gray-500">Đang tải wishlist...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && !wishlistItems.length && (
            <p className="text-sm text-gray-500">Không có sản phẩm yêu thích nào. Hãy thêm vào wishlist từ trang sản phẩm.</p>
          )}

          <div className="space-y-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-8 relative group">
                <div className="w-36 h-44 bg-gray-100 flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <h2 className="font-bold text-lg leading-tight">{item.name}</h2>
                  <p className="text-xs text-gray-500">Mã sản phẩm: {item.sku}</p>
                  <p className="text-xs text-gray-500">Màu sắc: {item.color}</p>
                  <p className="text-xs text-gray-500">Kích cỡ: {item.size}</p>
                  <p className="text-lg font-black mt-2">{item.price.toLocaleString("vi-VN")} VND</p>
                  <p className="text-[11px] text-gray-400 italic">{item.description}</p>
                </div>

                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="absolute top-3 right-3 p-2 text-red-500 hover:text-red-700 transition"
                  aria-label="Xóa khỏi yêu thích"
                >
                  <Heart size={22} fill="red" className="text-red-500" />
                </button>

                <div className="absolute bottom-4 right-0">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={isAdding}
                    className="bg-black text-white px-6 py-2 text-[10px] font-bold rounded-full hover:bg-gray-900 transition-all uppercase tracking-widest shadow-md active:scale-95 disabled:opacity-60"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WishlistPage;