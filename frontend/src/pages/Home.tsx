import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CreditCard, Plus, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Dữ liệu ảnh Hero
  const images = [
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000",
    "https://images.unsplash.com/photo-1550246140-29f40b909e5a?q=80&w=1000",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000",
  ];

  // Sản phẩm mới
  const newArrivals = [
    { id: 1, name: "Sơ mi thêu Seersucker", category: "Áo cổ chữ V", price: 99, img: "https://static.zara.net/photos///2024/I/0/1/p/0679/302/800/2/w/563/0679302800_6_1_1.jpg" },
    { id: 2, name: "Áo thun Slim Fit cơ bản", category: "Áo thun Cotton", price: 99, img: "https://static.zara.net/photos///2024/I/0/1/p/0679/303/250/2/w/563/0679303250_6_1_1.jpg" },
    { id: 3, name: "Áo thun họa tiết nhòe", category: "Áo Henley", price: 99, img: "https://static.zara.net/photos///2024/I/0/1/p/0679/303/712/2/w/563/0679303712_6_1_1.jpg" },
    { id: 4, name: "Áo khoác kéo khóa tay dài", category: "Áo cổ tròn", price: 99, img: "https://static.zara.net/photos///2024/I/0/1/p/0679/303/400/2/w/563/0679303400_6_1_1.jpg" },
  ];
  
  // Dịch vụ
  const services = [
    { id: 1, icon: <Truck size={32} strokeWidth={1} />, title: "Giao hàng hỏa tốc", desc: "Nhận hàng trong vòng 24h tại nội thành" },
    { id: 2, icon: <ShieldCheck size={32} strokeWidth={1} />, title: "Bảo hành 12 tháng", desc: "Cam kết chất lượng trên từng đường kim mũi chỉ" },
    { id: 3, icon: <RefreshCw size={32} strokeWidth={1} />, title: "Đổi trả dễ dàng", desc: "7 ngày đổi trả miễn phí nếu không vừa ý" },
    { id: 4, icon: <CreditCard size={32} strokeWidth={1} />, title: "Thanh toán bảo mật", desc: "Hỗ trợ nhiều phương thức an toàn" },
  ];
  
  // Tin tức
  const newsData = [
    { id: 1, category: "Biên tập", title: "Xu hướng Denim tái định nghĩa phong cách 2024", date: "15/05", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000", desc: "Khám phá cách chúng tôi kết hợp chất liệu truyền thống với những đường cắt hiện đại..." },
    { id: 2, category: "Sự kiện", title: "H&Q Store khai trương chi nhánh thứ 10 tại Hà Nội", date: "10/05", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000", desc: "Sự kiện ra mắt bộ sưu tập đặc biệt đi kèm những ưu đãi độc quyền dành cho khách hàng..." },
    { id: 3, category: "Lối sống", title: "Nghệ thuật tối giản trong tủ đồ nam giới", date: "05/05", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000", desc: "Làm thế nào để xây dựng một phong cách bền vững chỉ với những món đồ cơ bản..." }
  ];

  const approachImages = [
    "https://images.unsplash.com/photo-1488161628813-244a2ecce59d?q=80&w=1000",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000",
    "https://images.unsplash.com/photo-1529139513402-596975953516?q=80&w=1000",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - 2;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(maxIndex);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-[calc(100vh-70px)] font-sans text-black overflow-hidden select-none">
      
      {/* --- SECTION 1: HERO (BỘ SƯU TẬP MỚI) --- */}
      <main className="grid grid-cols-10 gap-0 px-20 pt-24 items-start mb-20">
        <div className="col-span-4 flex flex-col pt-4">
          <div className="mb-24"> 
            <h1 className="text-[95px] font-[1000] uppercase leading-[0.78] tracking-[-0.05em] mb-8">
              Bộ Sưu Tập<br/>Mới Nhất
            </h1>
            <p className="text-gray-400 font-bold text-[12px] tracking-[0.3em] uppercase opacity-80">
              Mùa Hè 2024
            </p>
          </div>
          <div className="flex items-center gap-4 w-full max-w-105">
            <button 
              onClick={() => navigate("/products")}
              className="flex-1 bg-[#D9D9D9] flex justify-between items-center px-8 py-4 rounded-sm hover:bg-black hover:text-white transition-all group cursor-pointer border-none"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Mua Ngay</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <div className="flex gap-2">
              <button onClick={prevSlide} className="p-4 bg-white border border-gray-200 rounded-sm hover:bg-black hover:text-white transition-all cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button onClick={nextSlide} className="p-4 bg-white border border-gray-200 rounded-sm hover:bg-black hover:text-white transition-all cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 overflow-hidden pt-2 pl-4">
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] gap-5" 
            style={{ transform: `translateX(-${currentIndex * 51}%)` }}
          >
            {images.map((imgUrl, index) => (
              <div key={index} className="min-w-[49%] aspect-[0.88/1] overflow-hidden rounded-sm shadow-sm group relative bg-white">
                <img src={imgUrl} alt="Model" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- SECTION 2: NEW THIS WEEK (SẢN PHẨM NỔI BẬT) --- */}
      <section className="px-20 pb-32 bg-white pt-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-[1000] uppercase leading-[0.8] tracking-tighter">
            Hàng Mới<br />Trong Tuần <span className="text-blue-600 text-sm align-top ml-1 font-bold">(50)</span>
          </h2>
          <button className="text-[11px] font-bold uppercase border-b border-black pb-0.5 hover:text-gray-500">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-3.5/4 bg-[#F5F5F5] rounded-sm overflow-hidden mb-5">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all border-none">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-black text-[11px] uppercase font-black tracking-tight">{product.name}</h3>
                </div>
                <p className="text-[11px] font-bold text-black">$ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: APPROACH (TƯ DUY THIẾT KẾ) --- */}
      <section className="py-32 px-20 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl font-[1000] uppercase tracking-[-0.02em] mb-8 leading-tight">
            Tư Duy Thiết Kế Của Chúng Tôi
          </h2>
          <p className="text-gray-500 text-[13px] font-medium uppercase tracking-[0.15em] leading-relaxed max-w-2xl mx-auto opacity-70">
            Tại H&Q Store, chúng tôi kết hợp sự sáng tạo với tay nghề thủ công bậc thầy để tạo ra 
            những thiết kế vượt thời gian. Mỗi sản phẩm đều được chăm chút tỉ mỉ, 
            đảm bảo chất lượng cao nhất và độ hoàn thiện tinh xảo.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-8 items-center">
          <div className="col-span-1 mt-20">
            <div className="aspect-3/4 overflow-hidden rounded-sm shadow-sm">
              <img src={approachImages[0]} alt="Design 1" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0" />
            </div>
          </div>
          <div className="col-span-1 mb-20">
            <div className="aspect-3/4 overflow-hidden rounded-sm shadow-sm">
              <img src={approachImages[1]} alt="Design 2" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0" />
            </div>
          </div>
          <div className="col-span-1 mt-10">
            <div className="aspect-3/4 overflow-hidden rounded-sm shadow-sm">
              <img src={approachImages[2]} alt="Design 3" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0" />
            </div>
          </div>
          <div className="col-span-1 -mt-10">
            <div className="aspect-3/4 overflow-hidden rounded-sm shadow-sm">
              <img src={approachImages[3]} alt="Design 4" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: AMENITIES (DỊCH VỤ ĐẶC QUYỀN) --- */}
      <section className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000')" }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-20 relative z-10">
          <div className="text-center mb-20 text-white">
            <h2 className="text-4xl font-[1000] uppercase tracking-tighter mb-4">Dịch vụ đặc quyền</h2>
            <div className="w-12 h-0.5 bg-white mx-auto opacity-50"></div>
            <p className="text-gray-300 text-xs uppercase tracking-[0.3em] mt-6">H&Q Store cam kết mang lại trải nghiệm mua sắm đẳng cấp</p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {services.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-10 text-center shadow-2xl group hover:bg-white transition-all duration-500 rounded-sm">
                <div className="text-white mb-6 flex justify-center group-hover:text-black transition-all">{item.icon}</div>
                <h3 className="text-[13px] font-black uppercase text-white group-hover:text-black mb-3 transition-colors">{item.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-500 text-[10px] uppercase tracking-wider transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: NEWS (TIN TỨC & SỰ KIỆN) --- */}
      <section className="py-32 px-20 bg-white">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">Tạp Chí</p>
            <h2 className="text-5xl font-[1000] uppercase leading-[0.8] tracking-tighter">Tin tức<br />& Sự kiện</h2>
          </div>
          <button className="text-[11px] font-bold uppercase border-b border-black pb-1 hover:text-gray-400">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-3 gap-12">
          {newsData.map((news) => (
            <div key={news.id} className="group cursor-pointer">
              <div className="h-80 overflow-hidden mb-6 relative rounded-sm bg-[#F5F5F5]">
                <img src={news.img} alt={news.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0" />
                <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 text-[10px] font-black uppercase">{news.date}</div>
              </div>
              <div className="text-left">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-3">{news.category}</p>
                <h3 className="text-lg font-black uppercase mb-3 leading-tight group-hover:underline transition-all">{news.title}</h3>
                <p className="text-gray-500 text-[11px] font-medium leading-relaxed line-clamp-2 mb-5 uppercase opacity-80">{news.desc}</p>
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group/btn hover:text-gray-400">
                  Đọc thêm <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;