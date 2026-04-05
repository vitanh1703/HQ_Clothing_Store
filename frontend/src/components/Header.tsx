import { Menu, ShoppingBag, User, Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("auth");
      setIsLoggedIn(!!auth);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.relative')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/auth");
  }; 

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
        
        {/* Account Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/auth");
              } else {
                setIsDropdownOpen(!isDropdownOpen);
              }
            }}
            className="flex items-center gap-1 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <User size={20} />
            {isLoggedIn && <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
          </button>
          
          {/* Dropdown Menu */}
          {isLoggedIn && isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  // TODO: Navigate to profile page
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                Thông tin cá nhân
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-red-600"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;