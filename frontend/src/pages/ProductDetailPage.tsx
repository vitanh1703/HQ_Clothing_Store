import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Variant {
  id: number;
  size: string;
  color: string;
  price: number;
  stockQuantity: number;
}

interface Product {
  id: number;
  name: string;
  brandText?: string;
  description?: string;
  imageUrl?: string;
  variants: Variant[];
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- Gọi API để lấy chi tiết sản phẩm ---
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios.get(`https://localhost:7137/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        // Không set mặc định selectedColor và selectedSize
      })
      .catch(err => {
        console.error(err);
        setError("Không tải được sản phẩm");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  // Tính toán availableColors từ tất cả variants
  const availableColors = Array.from(new Set(product.variants?.map(v => v.color) || []));

  // Tính toán tất cả sizes có thể có
  const allSizes = Array.from(new Set(product.variants?.map(v => v.size) || []));

  // Tính toán availableSizes dựa trên màu được chọn
  const availableSizes = selectedColor
    ? product.variants?.filter(v => v.color === selectedColor).map(v => v.size) || []
    : allSizes; // Nếu chưa chọn màu, hiển thị tất cả sizes

  // Tìm variant được chọn dựa trên color và size
  const selectedVariant = selectedColor && selectedSize
    ? product.variants?.find(v => v.color === selectedColor && v.size === selectedSize) || null
    : null;

  // --- Hàm tăng/giảm số lượng ---
  const handleQuantity = (type: "plus" | "minus") => {
    if (type === "plus") {
      const maxStock = selectedVariant?.stockQuantity || 99;
      if (quantity < maxStock) setQuantity(q => q + 1);
    } else {
      if (quantity > 1) setQuantity(q => q - 1);
    }
  };

  // --- Hàm add to cart ---
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu và size!");
      return;
    }

    if (!selectedVariant) {
      alert("Variant không hợp lệ!");
      return;
    }

    const userId = Number(localStorage.getItem("userId"));

    if (!userId) {
      alert("Chưa đăng nhập!");
      return;
    }

    try {
      await axios.post("https://localhost:7137/api/cart/add", {
        userId: userId,
        variantId: selectedVariant.id,
        quantity: quantity
      });

      alert("✅ Đã thêm vào giỏ hàng!");
      navigate("/cart");

    } catch (err: any) {
      console.error(err);
      alert("Lỗi thêm giỏ hàng!");
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Ảnh sản phẩm */}
      <div className="flex-1">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full rounded object-cover"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
        <p className="text-gray-500">{product.brandText || "H&Q"}</p>
        <p className="mt-2">{product.description}</p>

        {/* Giá sản phẩm */}
        <p className="text-xl font-bold mt-4">
          {selectedVariant ? selectedVariant.price.toLocaleString() : product.variants?.[0]?.price.toLocaleString()}đ
        </p>

        {/* Chọn màu */}
        <div className="flex gap-2 mt-2">
          <span className="text-sm font-medium">Màu sắc:</span>
          {availableColors.map(color => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                // Reset size nếu size hiện tại không có cho màu mới
                if (selectedSize && !product.variants?.some(v => v.color === color && v.size === selectedSize)) {
                  setSelectedSize(null);
                }
              }}
              className={`px-3 py-1 border rounded text-xs font-bold
                ${selectedColor === color ? "bg-black text-white" : "bg-white text-black"}`}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Chọn size */}
        <div className="flex gap-2 mt-2">
          <span className="text-sm font-medium">Size:</span>
          {allSizes.map(size => {
            const isAvailable = !selectedColor || availableSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => isAvailable && setSelectedSize(size)}
                disabled={!isAvailable}
                className={`px-3 py-1 border rounded text-xs font-bold
                  ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}
                  ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Số lượng */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={() => handleQuantity("minus")} className="px-2 border">-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantity("plus")} className="px-2 border">+</button>
        </div>

        {/* Add to Cart */}
        <button 
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;