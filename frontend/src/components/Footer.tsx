import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#07080c] text-gray-400 py-12 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Cột 1: Thương hiệu */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold tracking-widest">H&Q STORE</h3>
          <p className="text-sm">Streetwear & Dark Wear Concept. Thiết kế phong cách đường phố đen xám huyền bí.</p>
        </div>

        {/* Cột 2: Mạng xã hội */}
        <div className="space-y-4">
          <h3 className="text-white font-bold uppercase tracking-wider">Kết nối</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaFacebook size={16} /> Facebook</li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaInstagram size={16} /> Instagram</li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaYoutube size={16} /> Youtube</li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer"><FaEnvelope size={16} /> Email</li>
          </ul>
        </div>

        {/* Cột 3: Chính sách */}
        <div className="space-y-4">
          <h3 className="text-white font-bold uppercase tracking-wider">Chính sách</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition-all">
              <Link to="/privacy-policy">Chính sách bảo mật</Link>
            </li>
            <li className="hover:text-white transition-all cursor-pointer">
              <Link to="/refund-policy">Đổi trả & Bảo hành</Link>
            </li>
            <li className="hover:text-white cursor-pointer">Giao hàng tận nơi</li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký nhận tin */}
        <div className="space-y-4">
          <h3 className="text-white font-bold uppercase tracking-wider">Đăng ký</h3>
          <div className="flex border border-gray-700 rounded overflow-hidden">
            <input 
              type="text" 
              placeholder="Email của bạn..." 
              className="bg-transparent px-3 py-2 w-full text-sm outline-none" 
            />
            <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase">Gửi</button>
          </div>
          <p className="text-[10px] text-gray-500 italic">H&Q Store - Fashion for your style.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;