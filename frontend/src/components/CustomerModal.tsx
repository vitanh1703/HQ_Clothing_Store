import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Thêm Khách hàng Mới</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>

        {/* Form Body */}
        <form className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột trái: Ảnh đại diện */}
            <div className="flex flex-col items-center space-y-3">
              <label className="text-sm font-medium self-start">Ảnh đại diện</label>
              <div className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center text-gray-400 text-sm text-center p-4">
                Chưa có ảnh
              </div>
              <input type="text" placeholder="Nhập URL ảnh..." className="w-full p-2 border rounded-lg text-sm" />
            </div>

            {/* Cột phải: Thông tin cơ bản */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên khách hàng*</label>
                <input type="text" placeholder="Nhập tên khách hàng" className="w-full p-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">Loại khách hàng*</label>
                <select className="w-full p-2 bg-gray-100 border rounded-lg text-sm">
                  <option>Cá nhân</option>
                  <option>Doanh nghiệp</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Số điện thoại*</label>
              <input type="text" placeholder="Nhập số điện thoại" className="w-full p-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium">Số Zalo</label>
              <input type="text" placeholder="Nhập số Zalo" className="w-full p-2 bg-gray-50 border rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" placeholder="Nhập email" className="w-full p-2 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium">Facebook</label>
              <input type="text" placeholder="https://fb.com/..." className="w-full p-2 bg-gray-50 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Địa chỉ</label>
            <input type="text" placeholder="Nhập địa chỉ" className="w-full p-2 bg-gray-50 border rounded-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">Ghi chú</label>
            <textarea rows={3} placeholder="Ghi chú về khách hàng" className="w-full p-2 bg-gray-50 border rounded-lg" />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50 font-medium">Hủy</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Thêm khách hàng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;