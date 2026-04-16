import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMenu, FiX } from 'react-icons/fi';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const user = JSON.parse(auth).user;
      console.log("Admin page - User role:", user?.role);
      if (user?.role?.toLowerCase() !== 'admin') {
        toast.error("Bạn không có quyền truy cập trang này!");
        navigate("/home");
      }
    } else {
      toast.error("Vui lòng đăng nhập trước!");
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Component */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">HQ Clothing Store - Hệ thống Quản lý</h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hệ thống Quản lý</h2>
            <p className="text-gray-600">Quản lý bán hàng doanh nghiệp Việt Nam</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-gray-600">Doanh thu hôm nay</h3>
                <span className="text-3xl">📈</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">25.800.000</p>
              <p className="text-gray-500 text-sm mb-2">VND</p>
              <p className="text-green-600 text-sm font-medium">+4.35% so với hôm qua</p>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-gray-600">Đơn hàng mới</h3>
                <span className="text-3xl">📦</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">47</p>
              <p className="text-gray-500 text-sm mb-2">Đơn hàng</p>
              <p className="text-green-600 text-sm font-medium">+8.2% so với tuần trước</p>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-gray-600">Khách hàng</h3>
                <span className="text-3xl">👥</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">5</p>
              <p className="text-gray-500 text-sm mb-2">Khách hàng</p>
              <p className="text-green-600 text-sm font-medium">+3.5% so với tháng trước</p>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border-l-4 border-orange-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-gray-600">Sản phẩm</h3>
                <span className="text-3xl">📊</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">7</p>
              <p className="text-gray-500 text-sm mb-2">Sản phẩm</p>
              <p className="text-green-600 text-sm font-medium">+2.1% so với tháng trước</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thao tác nhanh</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-center transition shadow hover:shadow-lg">
                <div className="text-3xl mb-2">🛒</div>
                <p className="font-semibold">Tạo đơn hàng</p>
                <p className="text-xs mt-1 opacity-90">Thêm mới đơn hàng từ khách hàng</p>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 text-center transition shadow hover:shadow-lg">
                <div className="text-3xl mb-2">👤</div>
                <p className="font-semibold">Thêm khách hàng</p>
                <p className="text-xs mt-1 opacity-90">Thêm thông tin khách hàng mới</p>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-6 text-center transition shadow hover:shadow-lg">
                <div className="text-3xl mb-2">📦</div>
                <p className="font-semibold">Thêm sản phẩm</p>
                <p className="text-xs mt-1 opacity-90">Nhập sản phẩm mới vào hệ thống</p>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-6 text-center transition shadow hover:shadow-lg">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold">Xem báo cáo</p>
                <p className="text-xs mt-1 opacity-90">Xem báo cáo kinh doanh chi tiết</p>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Hoạt động gần đây</h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">Xem tất cả</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">🛒</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Đơn hàng mới DH007</p>
                    <p className="text-sm text-gray-600 mt-1">Khách hàng Lê Minh C đặt hàng này 3 gọi Netflix Premium trị giá 23.580.000 VND</p>
                    <div className="mt-3">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Đơn mới</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500">10 phút trước</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;