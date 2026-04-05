import { ChevronDown, Search } from "lucide-react";

const ProductsPage = () => {
  // Danh sách các bộ lọc bên trái
  const filters = ["Size", "Availability", "Category", "Colors", "Price Range", "Collections", "Tags", "Ratings"];
  
  // Danh sách danh mục (Categories) xếp 2 hàng bên phải
  const categories = [
    "NEW", "SHIRTS", "POLO SHIRTS", "SHORTS", "SUITS", 
    "BEST SELLERS", "T-SHIRTS", "JEANS", "JACKETS", "COATS"
  ];

  // Tạo mảng giả 12 sản phẩm để hiển thị lưới
  const products = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    // Toàn bộ trang: Khóa cuộn toàn màn hình (h-screen)
    <div className="bg-[#F5F5F5] h-screen overflow-hidden flex flex-col font-sans px-8 py-4">
      
      {/* 1. PHẦN TIÊU ĐỀ & BREADCRUMB (Cố định lề trái) */}
      <header className="mb-4 shrink-0">
        <div className="text-[10px] text-gray-400 font-normal tracking-tight uppercase">
          Home / Products
        </div>
        <h1 className="text-xl font-bold text-[#333] uppercase tracking-normal mt-0.5">
          PRODUCTS
        </h1>
      </header>

      {/* VÙNG NỘI DUNG CHÍNH (Sidebar + Main) */}
      <div className="flex gap-12 flex-1 overflow-hidden">
        
        {/* SIDEBAR FILTERS (Đứng yên khi cuộn sản phẩm) */}
        <aside className="w-64 space-y-8 shrink-0 overflow-y-auto pr-2 scrollbar-hide">
          <h3 className="font-bold uppercase text-xs tracking-widest mb-6">Filters</h3>
          
          {/* Size Filter */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase text-gray-800">Size</p>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "2X"].map((s) => (
                <button key={s} className="w-10 h-10 border border-gray-300 text-[10px] font-bold hover:bg-black hover:text-white transition-all bg-white">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Các bộ lọc kiểu Accordion */}
          {filters.slice(1).map((f) => (
            <div key={f} className="flex justify-between items-center py-4 border-t border-gray-200 cursor-pointer hover:opacity-70">
              <span className="text-[10px] font-bold uppercase tracking-widest">{f}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          ))}
        </aside>

        {/* MAIN CONTENT (Phần bên phải bao gồm Search và Grid sản phẩm) */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* 2. THANH SEARCH & CATEGORIES (Nằm sát nhau dưới Tiêu đề) */}
          <div className="flex items-start justify-between mb-8 gap-4 shrink-0">
            {/* Ô Search màu xám */}
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2.5 bg-[#E2E2E2] border-none outline-none text-xs text-gray-500 placeholder-gray-400" 
              />
            </div>

            {/* Các nút Categories (Lưới 5 cột x 2 hàng) */}
            <div className="grid grid-cols-5 gap-1 shrink-0">
              {categories.map(c => (
                <button 
                  key={c} 
                  className="px-3 py-1 text-[9px] border border-gray-200 bg-white font-bold hover:bg-black hover:text-white transition-all uppercase min-w-22.5 h-7 flex items-center justify-center leading-none shadow-sm"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 3. PRODUCT GRID (Đây là phần duy nhất cuộn được khi lăn chuột) */}
          <div className="flex-1 overflow-y-auto pr-2 pb-20 scrollbar-thin scrollbar-thumb-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {products.map((item) => (
                <div key={item} className="group cursor-pointer">
                  {/* Khung ảnh xám tỉ lệ 3:4 */}
                  <div className="bg-[#D1D5DB] aspect-3/4 mb-4 flex items-center justify-center relative overflow-hidden">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                      Ảnh {item}
                    </span>
                    {/* Hiệu ứng mờ khi di chuột vào */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                  </div>
                  
                  {/* Thông tin Text bên dưới */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                        Cotton T-Shirt + 5
                      </p>
                      <p className="text-black text-sm uppercase font-black tracking-tight leading-tight">
                        Basic Slim Fit T-Shirt
                      </p>
                    </div>
                    <p className="text-sm font-bold text-black shrink-0 leading-none">$ 199</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;