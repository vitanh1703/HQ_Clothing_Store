import { Menu, ShoppingBag, User, Heart, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import { useState, useEffect } from "react";
import { useCategories, useNewsTitles } from "../services/hooks";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const { categories } = useCategories();
  const { newsTitles } = useNewsTitles();

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
        setIsProductsDropdownOpen(false);
        setIsNewsDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isProductsDropdownOpen || isNewsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isProductsDropdownOpen, isNewsDropdownOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate("/logout"); 
  };

  // --- HÀM MỚI ĐỂ ĐIỀU KHIỂN SIDEBAR ---
  const handleToggleSidebar = () => {
    // Nếu đang ở trang products thì phát tín hiệu toggle
    if (location.pathname === "/products") {
      window.dispatchEvent(new Event("toggle-products-sidebar"));
    } else {
      // Nếu ở trang khác mà bấm Menu thì có thể navigate về sản phẩm hoặc làm gì đó tuỳ bạn
      navigate("/products");
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#F5F5F5] border-b border-gray-200">
      <div className="flex items-center gap-8 text-sm font-medium">
        {/* ĐÃ SỬA: Thêm onClick vào Menu */}
        <Menu 
          className="cursor-pointer hover:text-gray-500 transition-all active:scale-90" 
          size={20} 
          onClick={handleToggleSidebar} 
        />
        
        <button onClick={() => navigate("/home")} className="hover:text-gray-500 transition-colors uppercase font-bold">Trang chủ</button>
        
        <div className="relative">
          <button 
            onClick={() => navigate("/products")} 
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
            className="hover:text-gray-500 transition-colors uppercase font-bold"
          >
            Sản phẩm
          </button>
          {isProductsDropdownOpen && (
            <div 
              className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => {
                    navigate(`/products?category=${category.id}`);
                    setIsProductsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => navigate("/news")} 
            onMouseEnter={() => setIsNewsDropdownOpen(true)}
            onMouseLeave={() => setIsNewsDropdownOpen(false)}
            className="hover:text-gray-500 transition-colors uppercase font-bold"
          >
            Tin tức
          </button>
          {isNewsDropdownOpen && (
            <div 
              className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 max-h-64 overflow-y-auto"
              onMouseEnter={() => setIsNewsDropdownOpen(true)}
              onMouseLeave={() => setIsNewsDropdownOpen(false)}
            >
              {newsTitles.map((news) => (
                <button 
                  key={news.id}
                  onClick={() => {
                    navigate(`/news/${news.id}`);
                    setIsNewsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{news.title}</div>
                  <div className="text-xs text-gray-500">{news.category}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <span onClick={() => navigate("/home")} className="text-2xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-70 transition-opacity">H&Q</span>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/wishlist")}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <Heart size={20} className="group-hover:fill-black transition-all" />
        </button>
        <div onClick={() => navigate("/cart")}
              className="flex items-center bg-black text-white px-4 py-2 rounded-full gap-2 cursor-pointer hover:bg-gray-800 transition-all"
        >
          <span className="text-sm font-bold uppercase tracking-widest">Cart</span>
          <div className="bg-white text-black rounded-full p-1">
            <ShoppingBag size={14} />
          </div>
        </div>
        
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
          
          {isLoggedIn && isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                Thông tin cá nhân
              </button>
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/wishlist");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors md:hidden"
              >
                Yêu thích
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