import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/auth");
      return;
    }

    const userData = JSON.parse(auth);
    setUser(userData.user);

    const fetchOrders = async () => {
      try {
        const userId = userData.user.id || userData.user.Id;
        if (userId) {
          const res = await axios.get(`https://localhost:7137/api/orders/user/${userId}`);
          setOrders(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử mua hàng:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-black uppercase mb-8 text-center">Thông tin cá nhân</h1>

          <div className="mb-10 flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left md:justify-between">
            <div className="flex flex-col items-center gap-4">
              <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 border-4 border-black">
                <img
                  src={
                    user.avatar || user.avatar_url || user.AvatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-2xl font-black uppercase">{user.fullName || user.full_name || 'Khách hàng'}</p>
                <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{user.role || 'Customer'}</span>
              </div>
            </div>

            <div className="w-full max-w-xl rounded-xl bg-gray-50 p-6 border border-gray-200">
              <h2 className="text-xl font-bold uppercase mb-4">Thông tin liên hệ</h2>
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">Địa chỉ</p>
                  <p className="text-base font-medium">{user.address || user.Address || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">Số điện thoại</p>
                  <p className="text-base font-medium">{user.phone || user.Phone || 'Chưa cập nhật'}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase mb-4">Lịch sử mua hàng</h2>
            {loadingOrders ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600">Đang tải lịch sử mua hàng...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">Chưa có đơn hàng nào</p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-black text-white px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-gray-800 transition-colors"
                >
                  Mua sắm ngay
                </button>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg max-h-90 overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="p-4 font-bold">Mã đơn hàng</th>
                      <th className="p-4 font-bold">Ngày đặt</th>
                      <th className="p-4 font-bold">Tổng tiền</th>
                      <th className="p-4 font-bold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-semibold">{order.orderCode}</td>
                        <td className="p-4 text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="p-4 font-bold text-red-600">
                          {order.totalAmount.toLocaleString()}đ
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'Success' ? 'bg-green-100 text-green-700' : order.status === 'Shipping' ? 'bg-blue-100 text-blue-700' : order.status === 'Cancel' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {order.status === 'Pending' ? 'Chờ xử lý' : order.status === 'Success' ? 'Thành công' : order.status === 'Shipping' ? 'Đang giao' : order.status === 'Cancel' ? 'Đã hủy' : order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold uppercase mb-4">Cài đặt tài khoản</h2>
            <div className="flex gap-4">
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-gray-200 transition-colors">
                Đổi mật khẩu
              </button>
              <button className="bg-red-100 text-red-700 px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-red-200 transition-colors">
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;