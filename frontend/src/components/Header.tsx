import { Menu, ShoppingBag, User, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); 

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#F5F5F5] border-b border-gray-200">
      <div className="flex items-center gap-8 text-sm font-medium">
        <Menu className="cursor-pointer" size={20} />
        <button onClick={() => navigate("/home")} className="hover:text-gray-500 transition-colors uppercase font-bold">Home</button>
        <button onClick={() => navigate("/products")} className="hover:text-gray-500 transition-colors uppercase font-bold">Products</button>
        <button onClick={() => navigate("/news")} className="hover:text-gray-500 transition-colors uppercase font-bold">News</button>
      </div>

      {/* Đoạn code mới - Tên nhãn hàng */}
      <div className="flex items-center">
        <span onClick={() => navigate("/home")} className="text-2xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-70 transition-opacity">H&Q</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <Heart size={20} />
        </button>
        <div  onClick={() => navigate("/cart")}
              className="flex items-center bg-black text-white px-4 py-2 rounded-full gap-2 cursor-pointer hover:bg-gray-800 transition-all"
        >
          <span className="text-sm font-bold uppercase tracking-widest">Cart</span>
          <div className="bg-white text-black rounded-full p-1">
            <ShoppingBag size={14} />
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Header;