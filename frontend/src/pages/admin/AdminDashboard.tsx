import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMenu, FiX, FiUsers, FiBox, FiTag, FiBarChart, FiFileText, FiShoppingCart, FiSearch } from 'react-icons/fi';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  const menuCards = [
    {
      title: 'Khách hàng',
      description: 'Xem và chỉnh sửa thông tin khách hàng, thêm khách hàng mới',
      icon: FiUsers,
      path: '/customers',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBg: 'group-hover:bg-blue-600',
      badge: 12
    },
    {
      title: 'Nhà cung cấp',
      description: 'Quản lý danh sách nhà cung cấp và các chi tiết liên hệ',
      icon: FiBox,
      path: '/suppliers',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverBg: 'group-hover:bg-green-600',
      badge: 5
    },
    {
      title: 'Khuyến mại',
      description: 'Tạo và quản lý các chương trình khuyến mại, mã giảm giá',
      icon: FiTag,
      path: '/promotions',
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      hoverBg: 'group-hover:bg-orange-600',
      badge: 8
    },
    {
      title: 'Kho',
      description: 'Theo dõi số lượng hàng tồn kho, nhập xuất hàng',
      icon: FiBox,
      path: '/warehouse',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverBg: 'group-hover:bg-purple-600',
      badge: 3
    },
    {
      title: 'Sản phẩm',
      description: 'Thêm, chỉnh sửa và quản lý các sản phẩm bán hàng',
      icon: FiBox,
      path: '/products',
      color: 'pink',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      hoverBg: 'group-hover:bg-pink-600',
      badge: 24
    },
    {
      title: 'Báo cáo thống kê',
      description: 'Xem báo cáo doanh thu, thống kê bán hàng chi tiết',
      icon: FiBarChart,
      path: '/reports',
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      hoverBg: 'group-hover:bg-amber-600',
      badge: 0
    },
    {
      title: 'Tin tức',
      description: 'Viết và quản lý các bài tin tức, thông báo khuyến mãi',
      icon: FiFileText,
      path: '/news',
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      hoverBg: 'group-hover:bg-red-600',
      badge: 6
    },
    {
      title: 'Đơn hàng',
      description: 'Xem và xử lý các đơn hàng từ khách hàng',
      icon: FiShoppingCart,
      path: '/orders',
      color: 'teal',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      borderColor: 'border-teal-200',
      hoverBg: 'group-hover:bg-teal-600',
      badge: 15
    }
  ];

  const stats = [
    { label: 'Doanh thu hôm nay', value: '25.8M', unit: 'VND', icon: '📈', color: 'blue' },
    { label: 'Đơn hàng chưa xử lý', value: '15', unit: 'Đơn', icon: '📦', color: 'orange' },
    { label: 'Khách hàng mới', value: '12', unit: 'Người', icon: '👥', color: 'green' },
    { label: 'Sản phẩm tồn kho', value: '1.2K', unit: 'Sản phẩm', icon: '📊', color: 'purple' }
  ];

  const filteredMenuCards = menuCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    const auth = sessionStorage.getItem("auth");
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
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar Component */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 shadow-xl px-8 py-6 flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 text-white rounded-lg transition duration-200"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-3xl font-bold text-white">HQ Clothing Store - Hệ thống Quản lý</h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Title & Search */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Bảng điều khiển</h2>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition duration-200"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 border-l-4 border-gray-300 hover:border-gray-900"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">{stat.label}</h3>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm font-medium">{stat.unit}</p>
              </div>
            ))}
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenuCards.length > 0 ? (
              filteredMenuCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(card.path)}
                    className={`relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 ${card.borderColor} hover:border-gray-900 text-left group transform hover:scale-105 hover:-translate-y-2`}
                  >
                    {/* Badge */}
                    {card.badge > 0 && (
                      <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
                        {card.badge}
                      </div>
                    )}

                    <div className="p-8 flex flex-col items-center text-center h-full">
                      {/* Icon Box */}
                      <div className={`mb-4 p-5 ${card.bgColor} ${card.hoverBg} rounded-xl transition-all duration-300 group-hover:text-white w-full flex justify-center`}>
                        <Icon className="text-4xl text-gray-400 group-hover:text-white transition duration-300" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-black transition duration-300">{card.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition duration-300">
                        {card.description}
                      </p>

                      {/* Accent Line */}
                      <div className={`mt-4 w-12 h-1 ${card.textColor} rounded-full transition duration-300 group-hover:w-16`}></div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy kết quả cho "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;