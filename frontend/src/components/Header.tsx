import { Menu, ShoppingBag, User, Heart } from "lucide-react";

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#F5F5F5] border-b border-gray-200">
      <div className="flex items-center gap-8 text-sm font-medium">
        <Menu className="cursor-pointer" size={20} />
        <a href="#" className="hover:text-gray-500 transition-colors">Home</a>
        <a href="#" className="hover:text-gray-500 transition-colors">Collections</a>
        <a href="#" className="hover:text-gray-500 transition-colors">New</a>
      </div>

      {/* Đoạn code mới - Tên nhãn hàng */}
      <div className="flex items-center">
        <span className="text-2xl font-black tracking-tighter uppercase cursor-pointer">H&Q</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <Heart size={20} />
        </button>
        <div className="flex items-center bg-black text-white px-4 py-2 rounded-full gap-2 cursor-pointer hover:bg-gray-800 transition-all">
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