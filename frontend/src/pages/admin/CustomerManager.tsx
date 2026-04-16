import React, { useState } from 'react';
import { Plus, Search, FileBarChart, User, Edit2, Trash2, Phone } from 'lucide-react';
import CustomerModal from '../../components/CustomerModal';


const CustomerManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
        <p className="text-gray-500 text-sm">Danh sách và thông tin khách hàng</p>
      </div>

      {/* Main Action Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex flex-wrap justify-center gap-12">
          <button onClick={() => setIsModalOpen(true)} className="group flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-all">
              <Plus size={28} />
            </div>
            <span className="text-sm font-medium">Thêm khách hàng</span>
          </button>
          
          <button className="group flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-all">
              <Search size={28} />
            </div>
            <span className="text-sm font-medium">Tìm kiếm</span>
          </button>

          <button className="group flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-all">
              <FileBarChart size={28} />
            </div>
            <span className="text-sm font-medium">Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Tìm kiếm theo tên, mã khách hàng, số điện thoại..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Danh sách Khách hàng (3)</h3>
        
        {/* Customer Item Sample */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Hoàng con (code KH001)</h4>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Phone size={14} /> <span>12</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Không nợ</span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-[#00c853] text-white rounded-md text-sm font-medium hover:bg-green-600">Chi tiết</button>
              <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"><Edit2 size={16}/></button>
              <button className="p-2 bg-[#ff3d00] text-white rounded-md hover:bg-red-600"><Trash2 size={16}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cửa sổ con */}
      <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CustomerManager;