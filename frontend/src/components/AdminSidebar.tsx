import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUsers, FiBox, FiBarChart, FiSettings, FiLogOut } from 'react-icons/fi';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-600 text-white transition-all duration-300 flex flex-col shadow-xl`}>
      <div className="p-4 border-b border-blue-700 flex items-center gap-3 hover:bg-blue-700 transition cursor-pointer">
        <div className="bg-white text-blue-600 p-2 rounded font-bold text-lg">🛒</div>
        {sidebarOpen && <span className="text-sm font-bold">SHOP BẢN HÀNG</span>}
      </div>
      
      {sidebarOpen && (
        <p className="px-4 py-2 text-xs text-blue-200">Quản lý bán hàng doanh nghiệp Việt Nam</p>
      )}

      <div className="flex-1 py-6 overflow-y-auto">
        {/* Tổng quan */}
        <div className="px-2 mb-6">
          <p className="text-xs font-semibold text-blue-200 px-4 mb-3 uppercase tracking-wider">Tổng quan</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm font-medium transition">
            <FiBarChart className="shrink-0" /> {sidebarOpen && 'Dashboard'}
          </button>
        </div>

        {/* Quản lý cơ bản */}
        <div className="px-2 mb-6">
          <p className="text-xs font-semibold text-blue-200 px-4 mb-3 uppercase tracking-wider">Quản lý cơ bản</p>
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/customers')}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition"
            >
              <FiUsers className="shrink-0" /> {sidebarOpen && 'Khách hàng'}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition relative">
              <FiUsers className="shrink-0" /> {sidebarOpen && 'Khách hàng hết hạn'}
              {sidebarOpen && <span className="ml-auto bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiBox className="shrink-0" /> {sidebarOpen && 'Nhà cung cấp'}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiBox className="shrink-0" /> {sidebarOpen && 'Sản phẩm'}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiBox className="shrink-0" /> {sidebarOpen && 'Danh mục'}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiBox className="shrink-0" /> {sidebarOpen && 'Kho hàng'}
            </button>
          </div>
        </div>

        {/* Ngành vụ */}
        <div className="px-2 mb-6">
          <p className="text-xs font-semibold text-blue-200 px-4 mb-3 uppercase tracking-wider">Ngành vụ</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiBarChart className="shrink-0" /> {sidebarOpen && 'Công nợ'}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiShoppingCart className="shrink-0" /> {sidebarOpen && 'Quản lý đơn hàng'}
            </button>
          </div>
        </div>

        {/* Báo cáo */}
        <div className="px-2 mb-6">
          <p className="text-xs font-semibold text-blue-200 px-4 mb-3 uppercase tracking-wider">Báo cáo</p>
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
            <FiBarChart className="shrink-0" /> {sidebarOpen && 'Báo cáo'}
          </button>
        </div>

        {/* Hệ thống */}
        <div className="px-2">
          <p className="text-xs font-semibold text-blue-200 px-4 mb-3 uppercase tracking-wider">Hệ thống</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiSettings className="shrink-0" /> {sidebarOpen && 'Cài đặt'}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition">
              <FiBarChart className="shrink-0" /> {sidebarOpen && 'Thông Tin Shop'}
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-blue-700 p-4">
        <button 
          onClick={() => {
            sessionStorage.clear();
            window.location.href = "/auth";
          }}
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg text-sm transition text-red-300 hover:text-red-200"
        >
          <FiLogOut className="shrink-0" /> {sidebarOpen && 'Đăng xuất'}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;