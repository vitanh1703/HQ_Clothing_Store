import { useState } from "react";

const CartPage = () => {
  // Fake data (có thêm image)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Basic Slim Fit T-Shirt",
      price: 199,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?q=80&w=844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/120x150"
    },
    {
      id: 2,
      name: "Oversized Hoodie",
      price: 299,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/120x150"
    },
  ]);

  const increase = (id: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrease = (id: number) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const remove = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-8 py-6">
      <h1 className="text-2xl font-black mb-6 uppercase">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng trống</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                {/* LEFT: Ảnh + thông tin */}
                <div className="flex items-center gap-4">
                  {/* Ảnh */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />

                  {/* Thông tin */}
                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>

                {/* RIGHT: action */}
                <div className="flex items-center gap-6">
                  
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrease(item.id)}
                      className="px-2 py-1 border"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="px-2 py-1 border"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Tạm tính</span>
              <span>${total}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>$0</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Tổng</span>
              <span>${total}</span>
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