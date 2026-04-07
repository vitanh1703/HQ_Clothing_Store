import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

const SidebarFilters = () => {
  // State để đóng/mở các mục (Accordion)
  const [openMenus, setOpenMenus] = useState<string[]>(["Size", "Price Range"]);

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Navy", hex: "#000080" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Gray", hex: "#808080" }
  ];

  return (
    <div className="min-w-[240px] space-y-2 pb-20">
      <h3 className="font-black uppercase text-[11px] tracking-[0.25em] mb-8 text-black border-b-2 border-black pb-2 w-fit">
        Filters
      </h3>

      {/* 1. SIZE - Dạng Button Grid */}
      <div className="mb-8">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer group"
          onClick={() => toggleMenu("Size")}
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Size</span>
          <ChevronDown size={12} className={`transition-transform ${openMenus.includes("Size") ? "rotate-180" : ""}`} />
        </div>
        {openMenus.includes("Size") && (
          <div className="grid grid-cols-3 gap-2 mt-2 animate-in fade-in slide-in-from-top-1">
            {sizes.map((s) => (
              <button key={s} className="aspect-square border border-gray-200 text-[10px] font-bold hover:bg-black hover:text-white transition-all bg-white flex items-center justify-center">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. AVAILABILITY - Dạng Checkbox */}
      <FilterWrapper title="Availability" isOpen={openMenus.includes("Availability")} onToggle={() => toggleMenu("Availability")}>
        <div className="space-y-2 mt-2">
          {["In Stock", "Out of Stock", "Pre-order"].map(item => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-black border-gray-300 rounded" />
              <span className="text-[10px] font-bold uppercase text-gray-600 group-hover:text-black">{item}</span>
            </label>
          ))}
        </div>
      </FilterWrapper>

      {/* 3. CATEGORY - Dạng List */}
      <FilterWrapper title="Category" isOpen={openMenus.includes("Category")} onToggle={() => toggleMenu("Category")}>
        <div className="space-y-2 mt-2">
          {["Shirts", "Polo Shirts", "Jeans", "Jackets"].map(cat => (
            <p key={cat} className="text-[10px] font-bold uppercase text-gray-500 hover:text-black cursor-pointer transition-colors">
              {cat} <span className="text-gray-300 ml-1">(12)</span>
            </p>
          ))}
        </div>
      </FilterWrapper>

      {/* 4. COLORS - Dạng Vòng tròn màu */}
      <FilterWrapper title="Colors" isOpen={openMenus.includes("Colors")} onToggle={() => toggleMenu("Colors")}>
        <div className="flex flex-wrap gap-3 mt-3">
          {colors.map(color => (
            <button 
              key={color.name}
              title={color.name}
              className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </FilterWrapper>

      {/* 5. PRICE RANGE - Dạng Range Slider đơn giản */}
      <FilterWrapper title="Price Range" isOpen={openMenus.includes("Price Range")} onToggle={() => toggleMenu("Price Range")}>
        <div className="mt-4 px-2">
          <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black" />
          <div className="flex justify-between mt-2 text-[9px] font-bold text-gray-400 uppercase">
            <span>0đ</span>
            <span>2.000.000đ</span>
          </div>
        </div>
      </FilterWrapper>

      {/* 6. RATINGS - Dạng Sao */}
      <FilterWrapper title="Ratings" isOpen={openMenus.includes("Ratings")} onToggle={() => toggleMenu("Ratings")}>
        <div className="space-y-2 mt-3">
          {[5, 4, 3].map(star => (
            <div key={star} className="flex items-center gap-1 cursor-pointer group">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill={i < star ? "black" : "none"} className={i < star ? "text-black" : "text-gray-200"} />
              ))}
              <span className="text-[9px] font-bold text-gray-400 ml-1 group-hover:text-black">& Up</span>
            </div>
          ))}
        </div>
      </FilterWrapper>
    </div>
  );
};

// Component con để tái sử dụng hiệu ứng đóng mở
const FilterWrapper = ({ title, children, isOpen, onToggle }: any) => (
  <div className="border-b border-gray-100 py-4 transition-all">
    <div className="flex justify-between items-center cursor-pointer group" onClick={onToggle}>
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-black">{title}</span>
      <ChevronDown size={12} className={`text-gray-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </div>
    {isOpen && <div className="animate-in fade-in duration-300">{children}</div>}
  </div>
);

export default SidebarFilters;