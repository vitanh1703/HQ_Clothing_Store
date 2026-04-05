import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Variant {
  id: number;
  size: string;
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
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- Gọi API để lấy chi tiết sản phẩm ---
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios.get(`http://localhost:5257/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedVariant(res.data.variants?.[0] || null); // mặc định chọn variant đầu tiên
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
  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Vui lòng chọn size!");
      return;
    }
    const auth = localStorage.getItem("auth");
    if (!auth) {
      alert("Vui lòng đăng nhập để mua hàng!");
      navigate("/auth");
      return;
    }

    // Gọi API thêm vào giỏ hàng hoặc dùng callback
    alert(`Đã thêm ${quantity} sản phẩm size ${selectedVariant.size} vào giỏ hàng`);
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

        {/* Chọn size */}
        <div className="flex gap-2 mt-2">
          {product.variants?.map(v => (
            <button 
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`px-3 py-1 border rounded text-xs font-bold
                ${selectedVariant?.id === v.id ? "bg-black text-white" : "bg-white text-black"}`}
            >
              {v.size}
            </button>
          ))}
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
          {selectedVariant ? `Add - ${(selectedVariant.price * quantity).toLocaleString()}đ` : "Chọn Size"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;