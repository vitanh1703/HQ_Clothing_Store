import { FaSearch, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-[#EBEBEB] min-h-screen font-sans text-black px-6 md:px-12 pb-10">
      <div className="mt-8 grid grid-cols-12 gap-6">
        
        {/* CỘT TRÁI: DANH MỤC & SEARCH */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-start space-y-12">
          <div className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
             <a href="#" className="hover:text-black">Men</a>
             <a href="#" className="hover:text-black">Women</a>
             <a href="#" className="hover:text-black">Kids</a>
          </div>

          <div className="relative group w-full max-w-70">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black" size={14}/>
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#DCDCDC] py-3 pl-12 pr-4 rounded-md outline-none text-sm font-medium placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* CỘT GIỮA: TIÊU ĐỀ & NÚT */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-end pb-4">
          <div className="mb-12">
            <h1 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter mb-4">
              New<br/>Collection
            </h1>
            <p className="text-gray-500 font-bold text-sm tracking-widest">Summer<br/>2024</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex-1 bg-[#D2D2D2] flex justify-between items-center px-6 py-4 rounded-md hover:bg-gray-300 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest">Go To Shop</span>
              <FaArrowRight size={14} className="ml-10"/>
            </button>
            <div className="flex gap-2">
               <button className="p-4 bg-transparent border border-gray-300 rounded-md hover:bg-white"><FaChevronLeft size={10}/></button>
               <button className="p-4 bg-transparent border border-gray-300 rounded-md hover:bg-white"><FaChevronRight size={10}/></button>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: ẢNH SẢN PHẨM */}
        <div className="col-span-12 md:col-span-3 h-112.5 overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000" 
            alt="Product 1" 
            className="w-full h-full object-cover grayscale-[0.2]"
          />
        </div>

        <div className="col-span-12 md:col-span-3 h-112.5 overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000" 
            alt="Product 2" 
            className="w-full h-full object-cover grayscale-[0.2]"
          />
        </div>

      </div>
    </div>
  );
};

export default Home;