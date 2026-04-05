import React, { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  itemId: number;
  variantId: number;
  productName: string;
  size: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

interface CartResponse {
  cartId: number;
  items: CartItem[];
}

const CartPage = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = 1; // ⚠️ sau này lấy từ auth

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7137/api/cart/${userId}`
      );
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi lấy cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice =
    cart?.items.reduce((sum, item) => sum + item.total, 0) || 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-8 py-6">
      <h1 className="text-2xl font-black mb-6 uppercase">
        Shopping Cart
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : !cart || cart.items.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng trống</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div
                key={item.itemId}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-24 object-cover rounded-md"
                  />

                  <div>
                    <h2 className="font-bold">{item.productName}</h2>
                    <p className="text-gray-500">
                      {item.price.toLocaleString()}đ
                    </p>
                    <p className="text-xs text-gray-400">
                      Size: {item.size}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p>Số lượng: {item.quantity}</p>
                  <p className="font-bold">
                    {(item.total).toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Tạm tính</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>0đ</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Tổng</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;