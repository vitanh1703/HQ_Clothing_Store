import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000",
    "https://images.unsplash.com/photo-1550246140-29f40b909e5a?q=80&w=1000",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000",
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
      <main className="grid grid-cols-10 gap-0 px-20 pt-24 items-start">
        <div className="col-span-4 flex flex-col pt-4">
          
          <div className="mb-24"> 
            <h1 className="text-[95px] font-[1000] uppercase leading-[0.78] tracking-[-0.05em] mb-8">
              New<br/>Collection
            </h1>
            <p className="text-gray-400 font-bold text-[12px] tracking-[0.3em] uppercase opacity-80">
              Summer 2024
            </p>
          </div>
          <div className="flex items-center gap-4 w-full max-w-105">
            <button 
              onClick={() => navigate("/products")}
              className="flex-1 bg-[#D9D9D9] flex justify-between items-center px-8 py-4 rounded-sm hover:bg-black hover:text-white transition-all group cursor-pointer border-none"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Go To Shop</span>
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
                <img 
                  src={imgUrl} 
                  alt={`Model ${index}`} 
                  className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;