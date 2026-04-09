import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cartApi, promotionsApi } from "../services/api";
import type { PromotionItem, PromotionValidationResult } from "../services/api";
import { PromoSelectionModal } from "../components/PromoSelectionModal";

interface CartItem {
  id: number;
  variantId: number;
  productId: number;
  productName: string;
  size: string;
  color: string;
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
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoResult, setPromoResult] = useState<PromotionValidationResult | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const userId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    fetchCart();
    fetchPromotions();
    restorePromo();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://localhost:7137/api/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi lấy cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotions = async () => {
    try {
      const data = await promotionsApi.getAll();
      setPromotions(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách mã giảm giá:", err);
    }
  };

  const restorePromo = () => {
    const stored = localStorage.getItem("selectedPromo");
    if (!stored) return;

    try {
      const parsed: PromotionValidationResult = JSON.parse(stored);
      setPromoCode(parsed.code);
      setPromoResult(parsed);
      setPromoMessage(`Mã ${parsed.code} đã được áp dụng.`);
    } catch {
      localStorage.removeItem("selectedPromo");
    }
  };

  // --- Cập nhật số lượng item ---
  const handleQuantity = (id: number, newQuantity: number) => {
    if (!cart) return;

    const qty = Math.max(newQuantity, 1); // số lượng tối thiểu 1
    const updatedItems = cart.items.map(item =>
      item.id === id
        ? { ...item, quantity: qty, total: qty * item.price }
        : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  // --- Xóa sản phẩm ---
  const handleRemove = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?");
    if (!confirmDelete) return;

    try {
      await cartApi.remove(id);
      if (!cart) return;
      const updatedItems = cart.items.filter(item => item.id !== id);
      setCart({ ...cart, items: updatedItems });
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      alert("Không thể xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoMessage("Vui lòng nhập mã giảm giá.");
      return;
    }

    setIsApplyingPromo(true);
    try {
      const result = await promotionsApi.validateCode(promoCode.trim());
      setPromoResult(result);
      setPromoMessage(`Áp dụng mã ${result.code} thành công!`);
      localStorage.setItem("selectedPromo", JSON.stringify(result));
    } catch (err: any) {
      setPromoResult(null);
      setPromoMessage(err.response?.data?.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      localStorage.removeItem("selectedPromo");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleSelectPromo = async (promo: PromotionItem) => {
    setPromoCode(promo.code);
    setShowPromoModal(false);
    try {
      const result = await promotionsApi.validateCode(promo.code);
      setPromoResult(result);
      setPromoMessage(`Áp dụng mã ${result.code} thành công!`);
      localStorage.setItem("selectedPromo", JSON.stringify(result));
    } catch (err: any) {
      setPromoResult(null);
      setPromoMessage(err.response?.data?.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      localStorage.removeItem("selectedPromo");
    }
  };

  const clearPromo = () => {
    setPromoCode("");
    setPromoResult(null);
    setPromoMessage("");
    localStorage.removeItem("selectedPromo");
  };

  const totalPrice = cart?.items.reduce((sum, item) => sum + item.total, 0) || 0;
  const discountAmount = promoResult
    ? promoResult.discountType === "Percentage"
      ? Math.round((totalPrice * promoResult.discountValue) / 100)
      : Math.min(promoResult.discountValue, totalPrice)
    : 0;
  const totalAfterDiscount = totalPrice - discountAmount;

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-8 py-6">
      <h1 className="text-2xl font-black mb-6 uppercase">Shopping Cart</h1>

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
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/products/${item.productId}`)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-24 object-cover rounded-md cursor-pointer"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  />

                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="font-bold">{item.productName}</h2>
                      <p className="text-gray-500">{item.price.toLocaleString()}đ</p>
                      <p className="text-xs text-gray-400">Size: {item.size}   |   Màu: {item.color}</p>
                    </div>

                    {/* Nút + / - và Xóa */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (item.quantity === 1) {
                            handleRemove(item.id); 
                          } else {
                            handleQuantity(item.id, item.quantity - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="ml-4 px-3 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(item.id);
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">{item.total.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>

            <div className="mb-4">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-semibold text-gray-700">Mã giảm giá</label>
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Chọn mã
                </button>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Nhập mã"
                  className="min-w-45 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                  className="rounded-lg bg-black px-4 py-2 text-sm text-white uppercase tracking-[0.15em] hover:bg-gray-900 transition-colors disabled:opacity-50"
                >
                  {isApplyingPromo ? "Áp dụng..." : "Áp dụng"}
                </button>
              </div>
              {promoResult && (
                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold">{promoResult.code}</span>
                    <span>{promoResult.description}</span>
                    <button
                      onClick={clearPromo}
                      className="ml-auto rounded-lg border border-green-600 bg-white px-3 py-1 text-green-600 hover:bg-green-100"
                    >
                      Xóa mã
                    </button>
                  </div>
                </div>
              )}
              {promoMessage && (
                <p className="mt-3 text-sm text-gray-600">{promoMessage}</p>
              )}
            </div>

            <div className="flex justify-between mb-2">
              <span>Tạm tính</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Giảm giá</span>
                <span>-{discountAmount.toLocaleString()}đ</span>
              </div>
            )}

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>0đ</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Tổng</span>
              <span>{totalAfterDiscount.toLocaleString()}đ</span>
            </div>

            <button
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>

      <PromoSelectionModal
        isOpen={showPromoModal}
        onClose={() => setShowPromoModal(false)}
        promotions={promotions}
        onSelectPromo={handleSelectPromo}
      />
        </div>
      )}
    </div>
  );
};

export default CartPage;