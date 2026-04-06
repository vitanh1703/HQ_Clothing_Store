import { useEffect, useState } from "react";
import { Heart, ShoppingBag, ChevronRight, Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "AIRism Cotton Áo Thun Dáng Rộng | Tay Lỡ",
      code: "482295",
      color: "17 RED",
      size: "Unisex M",
      price: "391.000 VND",
      image: "https://via.placeholder.com/150",
      description: "Sản phẩm được làm từ chất liệu tái chế"
    },
    {
      id: 2,
      name: "AIRism Cotton Áo Thun Dáng Rộng | Tay Lỡ",
      code: "482295",
      color: "17 RED",
      size: "Unisex XS",
      price: "391.000 VND",
      image: "https://via.placeholder.com/150",
      description: "Sản phẩm được làm từ chất liệu tái chế"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* --- HEADER BẮT ĐẦU --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top Header: Logo & Icons */}
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu size={24} className="md:hidden cursor-pointer" />
            <Link to="/" className="text-2xl font-black tracking-tighter">H&Q</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Search size={20} className="cursor-pointer hover:text-gray-500" />
            <Heart size={20} fill="black" className="cursor-pointer" />
            <User size={20} className="cursor-pointer hover:text-gray-500" />
            <div className="relative cursor-pointer group">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
            </div>
          </div>
        </div>

        {/* Category Row: 1 Hàng Duy Nhất */}
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
      {/* --- HEADER KẾT THÚC --- */}

      <main className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* BÊN TRÁI: SIDEBAR MENU TÀI KHOẢN */}
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

        {/* BÊN PHẢI: DANH SÁCH YÊU THÍCH */}
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

          <div className="space-y-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex gap-6 border-b border-gray-50 pb-8 relative group">
                <div className="w-32 h-44 bg-gray-100 flex-shrink-0 overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="flex-1 space-y-1">
                  <h2 className="font-bold text-md leading-tight pr-10">{item.name}</h2>
                  <p className="text-xs text-gray-500">Mã sản phẩm: {item.code}</p>
                  <p className="text-xs text-gray-500">Màu sắc: {item.color}</p>
                  <p className="text-xs text-gray-500">Kích cỡ: {item.size}</p>
                  <p className="text-lg font-black mt-2">{item.price}</p>
                  <p className="text-[10px] text-gray-400 italic">{item.description}</p>
                </div>

                <button className="absolute top-0 right-0 p-2 hover:scale-110 transition-transform">
                  <Heart size={22} fill="black" className="text-black" />
                </button>

                <div className="absolute bottom-8 right-0">
                  <button className="bg-black text-white px-6 py-2 text-[10px] font-bold rounded-full hover:bg-gray-800 transition-all uppercase tracking-widest shadow-md active:scale-95">
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