import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface OrderSummary {
  id: number;
  orderCode: string;
  totalAmount: number;
  status: string;
  orderDate: string;
}

interface CustomerSaveData {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  orders: OrderSummary[];
  onSave: (customer: CustomerSaveData) => void;
}

const CustomerModal = ({ isOpen, onClose, customer, orders, onSave }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setFullName(customer?.fullName ?? '');
    setEmail(customer?.email ?? '');
    setPhone(customer?.phone ?? '');
    setAddress(customer?.address ?? '');
  }, [customer]);

  if (!isOpen || !customer) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      id: customer.id,
      fullName,
      email,
      phone,
      address
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Chi tiết khách hàng</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>

        <form className="p-6 space-y-4 overflow-y-auto max-h-[80vh]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center space-y-3">
              <label className="text-sm font-medium self-start">Ảnh đại diện</label>
              <div className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center text-gray-400 text-xl font-bold uppercase">
                {customer.fullName?.[0] ?? 'K'}
              </div>
              <input
                type="text"
                placeholder="URL ảnh (chưa hỗ trợ)"
                className="w-full p-2 border rounded-lg text-sm"
                disabled
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên khách hàng*</label>
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  type="text"
                  placeholder="Nhập tên khách hàng"
                  className="w-full p-2 bg-gray-50 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="Nhập email"
                  className="w-full p-2 bg-gray-50 border rounded-lg"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Số điện thoại</label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full p-2 bg-gray-50 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Địa chỉ</label>
              <input
                value={address}
                onChange={e => setAddress(e.target.value)}
                type="text"
                placeholder="Nhập địa chỉ"
                className="w-full p-2 bg-gray-50 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium">Trạng thái đơn gần nhất</label>
              <div className="w-full p-3 bg-gray-50 border rounded-lg text-sm text-gray-700">
                {orders.length > 0 ? orders[0].status : 'Chưa có đơn hàng'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label className="text-sm font-medium">Danh sách đơn hàng</label>
            <div className="space-y-2 max-h-56 overflow-y-auto rounded-lg border bg-gray-50 p-3">
              {orders.length === 0 ? (
                <div className="text-sm text-gray-500">Không có đơn hàng nào.</div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                    <div className="flex justify-between text-sm text-gray-700 font-medium">
                      <span>{order.orderCode}</span>
                      <span className="capitalize">{order.status}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')} - {order.totalAmount.toLocaleString('vi-VN')} đ
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50 font-medium">Hủy</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
