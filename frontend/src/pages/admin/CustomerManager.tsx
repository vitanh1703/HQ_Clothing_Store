import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, User, Edit2, Trash2, Phone } from 'lucide-react';
import CustomerModal from '../../components/CustomerModal.tsx';


interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  status: boolean;
  createdAt: string;
  latestOrderStatus?: string | null;
}

interface CustomerSaveData {
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

const CustomerManager = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<OrderSummary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const apiBase = 'https://localhost:7137/api';

  const getPaymentLabel = (status?: string | null) => {
    if (!status) return 'Chưa có đơn';
    const normalized = status.toLowerCase();
    if (normalized === 'success') return 'Đã thanh toán';
    if (normalized === 'pending') return 'Chưa thanh toán';
    if (normalized === 'cancel') return 'Đã hủy';
    return status;
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Customer[]>(`${apiBase}/users`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Lỗi khi tải khách hàng', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerOrders = async (customerId: number) => {
    try {
      const response = await axios.get<OrderSummary[]>(`${apiBase}/orders/user/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng khách hàng', error);
      return [];
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenDetails = async (customer: Customer) => {
    const orders = await fetchCustomerOrders(customer.id);
    setSelectedOrders(orders);
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async (updatedCustomer: CustomerSaveData) => {
    try {
      await axios.put(`${apiBase}/users/${updatedCustomer.id}/info`, {
        fullName: updatedCustomer.fullName,
        phone: updatedCustomer.phone ?? '',
        address: updatedCustomer.address ?? ''
      });
      setCustomers(prev => prev.map(item => item.id === updatedCustomer.id ? { ...item, ...updatedCustomer } : item));
      setSelectedCustomer(prev => prev ? { ...prev, ...updatedCustomer } : prev);
    } catch (error) {
      console.error('Lỗi khi cập nhật khách hàng', error);
    }
  };

  const handleDeleteCustomer = async (customerId: number) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa khách hàng này và dữ liệu liên quan không?');
    if (!confirmed) return;

    try {
      await axios.delete(`${apiBase}/users/${customerId}`);
      setCustomers(prev => prev.filter(customer => customer.id !== customerId));
      if (selectedCustomer?.id === customerId) {
        setIsModalOpen(false);
        setSelectedCustomer(null);
        setSelectedOrders([]);
      }
    } catch (error) {
      console.error('Lỗi khi xóa khách hàng', error);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const search = searchTerm.toLowerCase();
    return (
      customer.fullName.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone?.toLowerCase().includes(search) ||
      customer.address?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
        <p className="text-gray-500 text-sm">Danh sách và thông tin khách hàng</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên, email, số điện thoại..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Danh sách Khách hàng ({filteredCustomers.length})</h3>
          {loading && <span className="text-sm text-gray-500">Đang tải...</span>}
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-gray-500">
            Không tìm thấy khách hàng phù hợp.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCustomers.map(customer => (
              <div key={customer.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{customer.fullName}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        <span>{customer.phone || 'Chưa có số điện thoại'}</span>
                      </div>
                      <span>{customer.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-sm text-gray-600">{getPaymentLabel(customer.latestOrderStatus)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenDetails(customer)}
                      className="px-4 py-1.5 bg-[#00c853] text-white rounded-md text-sm font-medium hover:bg-green-600"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleOpenDetails(customer)}
                      className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      aria-label="Sửa khách hàng"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="p-2 bg-[#ff3d00] text-white rounded-md hover:bg-red-600"
                      aria-label="Xóa khách hàng"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        orders={selectedOrders}
        onSave={handleSaveCustomer}
      />
    </div>
  );
};

export default CustomerManager;