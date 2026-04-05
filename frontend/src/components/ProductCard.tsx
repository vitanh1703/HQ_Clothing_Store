import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import type { Variant, Product } from '../services/api';

interface ProductCardProps {
  product: Product;
  onAddToCart: (variantId: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  const { name, variants, brandText } = product;
  const imageSrc = product.imageUrl || (product as any).imageUrl || product.imageSrc;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const displayPrice = selectedVariant 
    ? selectedVariant.price 
    : (variants.length > 0 ? Math.min(...variants.map(v => v.price)) : 0);

  const handleQuantity = (type: 'plus' | 'minus') => {
    if (type === 'plus') {
      const maxStock = selectedVariant?.stockQuantity || 99;
      if (quantity < maxStock) setQuantity(prev => prev + 1);
    } else {
      if (quantity > 1) setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedVariant) {
      alert("Vui lòng chọn size!");
      return;
    }
    
    const button = buttonRef.current;
    if (!button || button.classList.contains('active')) return;

    // Gửi dữ liệu lên API thông qua callback từ Page
    onAddToCart(selectedVariant.id, quantity);

    // Kích hoạt Animation GSAP
    button.classList.add('active');
    const tl = gsap.timeline();
    
    tl.to(button, {
      keyframes: [
        { '--background-scale': 0.97, duration: 0.15 },
        { '--background-scale': 1, delay: 0.125, duration: 1.2, ease: 'elastic.out(1, .6)' },
      ],
    }).to(button, {
      keyframes: [
        { 
          '--shirt-scale': 1, 
          '--shirt-y': '-42px', 
          '--cart-x': '0px', 
          '--cart-scale': 1, 
          duration: 0.4, 
          ease: 'power1.in' 
        },
        { '--shirt-y': '-40px', duration: 0.3 },
        { '--shirt-y': '16px', '--shirt-scale': 0.9, duration: 0.25 },
        { 
          '--shirt-scale': 0, 
          duration: 0.3, 
          onComplete: () => {
            setTimeout(() => { 
              if (button) {
                button.classList.remove('active');
                // Reset lại các biến CSS về mặc định sau khi xong
                gsap.set(button, { 
                  '--shirt-y': '-42px', 
                  '--shirt-scale': 0, 
                  '--cart-x': '-120px', 
                  '--cart-scale': 0.6,
                  '--text-o': 1 
                });
              }
            }, 2000);
          }
        },
      ],
    }, 0);

    gsap.to(button, { '--text-o': 0, duration: 0.3 });
  };

  return (
    <div className="group cursor-pointer w-full">
      <div className="relative aspect-3/4 bg-[#F5F5F5] rounded-sm overflow-hidden mb-4 shadow-sm border border-gray-100">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
        />
        
        {/* Overlay điều khiển xuất hiện khi Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-4 px-3">
          
          {/* 1. Chọn Size từ danh sách Variants */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={(e) => { e.stopPropagation(); setSelectedVariant(v); }}
                className={`w-9 h-9 flex items-center justify-center text-[10px] font-bold border transition-all duration-300 rounded-sm
                  ${selectedVariant?.id === v.id 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white/90 text-black border-transparent hover:border-black'}`}
              >
                {v.size}
              </button>
            ))}
          </div>

          {/* 2. Chọn Số lượng */}
          <div className="flex items-center bg-white/95 rounded-sm mb-3 w-full justify-between px-3 py-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 shadow-sm">
            <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Số lượng</span>
            <div className="flex items-center gap-4">
              <button onClick={(e) => { e.stopPropagation(); handleQuantity('minus'); }} className="text-sm font-bold hover:text-red-500">-</button>
              <span className="text-xs font-bold w-4 text-center">{quantity}</span>
              <button onClick={(e) => { e.stopPropagation(); handleQuantity('plus'); }} className="text-sm font-bold hover:text-green-500">+</button>
            </div>
          </div>

          {/* 3. Nút Add to Cart với Animation */}
          <button 
            ref={buttonRef}
            onClick={handleAddToCart}
            className="add-to-cart w-full relative h-11.25 rounded-sm bg-black text-white text-[10px] font-bold uppercase overflow-hidden tracking-widest transition-all duration-300 hover:bg-zinc-900"
            style={{
                // Khởi tạo các biến CSS cho GSAP
                '--shirt-y': '-42px',
                '--shirt-scale': 0,
                '--cart-x': '-120px',
                '--cart-scale': 0.6,
                '--text-o': 1,
                '--background-scale': 1
            } as React.CSSProperties}
          >
            <span className="relative z-10 block transition-opacity duration-300" style={{ opacity: 'var(--text-o)' }}>
              {selectedVariant ? `Add - ${(displayPrice * quantity).toLocaleString()}đ` : 'Chọn Size'}
            </span>
            
            {/* Shirt Icon */}
            <div className="shirt pointer-events-none absolute left-1/2 top-0 -ml-3 origin-bottom" 
                 style={{ 
                    transform: 'translateY(var(--shirt-y)) scale(var(--shirt-scale))', 
                    opacity: 'var(--shirt-scale)' 
                 }}>
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z" /></svg>
            </div>

            {/* Cart Icon */}
            <div className="cart pointer-events-none absolute left-1/2 top-1/2 -ml-4.5 -mt-3.25"
                 style={{ 
                    transform: 'translateX(var(--cart-x)) scale(var(--cart-scale))', 
                    opacity: 'var(--cart-scale)' 
                 }}>
                <svg className="w-9 h-6.5 fill-none stroke-white stroke-2" viewBox="0 0 36 26"><path d="M1 2.5H6L10 18.5H25.5L28.5 7.5L7.5 7.5" /><circle cx="11.5" cy="23" r="2" fill="currentColor" stroke="none" /><circle cx="24" cy="23" r="2" fill="currentColor" stroke="none" /></svg>
            </div>
          </button>
        </div>
      </div>

      {/* Thông tin sản phẩm bên dưới ảnh */}
      <div className="flex justify-between items-start px-0.5">
        <div className="flex flex-col gap-1">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.15em] leading-none">
            {brandText || 'H&Q'}
          </p>
          <h3 className="text-black text-[11px] uppercase font-bold tracking-tight leading-tight">
            {name}
          </h3>
        </div>
        <p className="text-[11px] font-bold text-black shrink-0">
          {displayPrice.toLocaleString()}đ
        </p>
      </div>
    </div>
  );
};

export default ProductCard;