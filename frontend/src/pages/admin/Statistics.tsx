import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign, FiChevronDown, FiCreditCard, FiAward, FiMenu, FiX } from 'react-icons/fi'; 
import AdminSidebar from '../../components/AdminSidebar';
import { statsApi } from '../../services/api';
import axios from 'axios';

// Định nghĩa Interface để xóa sạch các lỗi gạch đỏ TypeScript
interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  revenueTrend: any[];
  categoryDistribution: any[];
  vipCustomers: any[];
  paymentMethods: { label: string; percent: number }[];
}

const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#8B5CF6', '#F59E0B'];

const Statistics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('7 ngày qua');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    avgOrderValue: 0,
    revenueTrend: [],
    categoryDistribution: [],
    vipCustomers: [],
    paymentMethods: []
  });

  const fetchStatistics = async () => {
  try {
    // Gọi đồng thời 4 API thông qua service đã tách
    const [orders, users, products, categories] = await Promise.all([
      statsApi.getOrders(),
      statsApi.getUsers(),
      statsApi.getProducts(),
      statsApi.getCategories()
    ]);

    // --- Logic xử lý dữ liệu (Giữ nguyên như mình đã viết trước đó) ---
    
    // 1. Tính doanh thu (total_amount)
    const totalRev = orders.reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0);
    
    // 2. Lọc khách hàng (role Customer)
    const customers = users.filter((u: any) => u.role === 'Customer');

    // 3. Nhóm doanh thu theo ngày
    const trendMap = orders.reduce((acc: any, o: any) => {
      const date = new Date(o.order_date).toLocaleDateString('vi-VN');
      acc[date] = (acc[date] || 0) + (o.total_amount || 0);
      return acc;
    }, {});

    // Cập nhật State
    setStats({
      totalRevenue: totalRev,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      avgOrderValue: orders.length > 0 ? totalRev / orders.length : 0,
      revenueTrend: Object.keys(trendMap).map(date => ({ day: date, revenue: trendMap[date] })),
      categoryDistribution: categories.map((cat: any) => ({
        name: cat.name,
        value: products.filter((p: any) => p.category_id === cat.id).length
      })),
      vipCustomers: customers.map((c: any) => {
        const userOrders = orders.filter((o: any) => o.user_id === c.id);
        return {
          name: c.full_name,
          orders: userOrders.length,
          total: userOrders.reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0)
        };
      }).sort((a: any, b: any) => b.total - a.total).slice(0, 5),
      paymentMethods: [
        { label: 'Chuyển khoản', percent: 45 },
        { label: 'Momo', percent: 30 },
        { label: 'COD', percent: 25 }
      ]
    });

  } catch (error) {
    console.error("Lỗi khi gọi statsApi:", error);
  }
};

  useEffect(() => { fetchStatistics(); }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Gray-900 đồng nhất */}
        <div className="bg-gray-900 shadow-xl px-8 py-6 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 text-white rounded-lg transition duration-200"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Báo cáo kinh doanh</h1>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Thống kê chi tiết</h2>
                <p className="text-gray-500">Dữ liệu cập nhật dựa trên đơn hàng thực tế</p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-white border-2 border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:border-black transition"
                >
                  {timeRange} <FiChevronDown />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black rounded-lg shadow-xl z-50 overflow-hidden text-sm">
                    {['7 ngày qua', '30 ngày qua', '3 tháng', 'Năm nay'].map(item => (
                      <button 
                        key={item} 
                        onClick={() => { setTimeRange(item); setShowDropdown(false); }} 
                        className="w-full text-left px-4 py-3 hover:bg-black hover:text-white font-bold transition-colors border-b last:border-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thẻ chỉ số - Đã sửa lỗi truyền Icon */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard title="Tổng doanh thu" value={`${stats.totalRevenue.toLocaleString()}đ`} icon={FiDollarSign} color="bg-blue-100 text-blue-600" />
              <StatCard title="Tổng đơn hàng" value={stats.totalOrders} icon={FiShoppingBag} color="bg-green-100 text-green-600" />
              <StatCard title="Khách hàng" value={stats.totalCustomers} icon={FiUsers} color="bg-purple-100 text-purple-600" />
              <StatCard title="Giá trị TB đơn" value={`${Math.round(stats.avgOrderValue).toLocaleString()}đ`} icon={FiTrendingUp} color="bg-orange-100 text-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-lg font-bold mb-6 italic text-gray-600 font-sans tracking-tight">
                    Xu hướng doanh thu
                </h3>
                
                {/* FIX: Thêm class h-80 (chiều cao cố định) và kiểm tra dữ liệu */}
                <div className="h-80 w-full flex items-center justify-center"> 
                    {stats.revenueTrend.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.revenueTrend}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tick={{fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip formatter={(value: any) => `${Number(value).toLocaleString()} đ`} />
                        <Area type="monotone" dataKey="revenue" stroke="#2563EB" fill="#DBEAFE" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                    ) : (
                    <div className="text-gray-400 text-sm italic">
                        {loading ? "Đang tải dữ liệu..." : "Chưa có dữ liệu doanh thu để hiển thị"}
                    </div>
                    )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-center">Phân bố danh mục</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={stats.categoryDistribution} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                        {stats.categoryDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FiAward className="text-yellow-500 text-2xl" />
                  <h3 className="text-lg font-bold uppercase">Khách hàng VIP</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-sm border-b uppercase">
                      <th className="pb-4 text-left">Họ tên</th>
                      <th className="pb-4 text-center">Đơn</th>
                      <th className="pb-4 text-right">Chi tiêu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.vipCustomers.map((c, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="py-4 font-bold text-gray-800">{c.name}</td>
                        <td className="py-4 text-center">{c.orders}</td>
                        <td className="py-4 text-right font-bold text-blue-600">{c.total.toLocaleString()}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FiCreditCard className="text-blue-500 text-2xl" />
                  <h3 className="text-lg font-bold uppercase">Thanh toán</h3>
                </div>
                <div className="space-y-6">
                  {stats.paymentMethods.map((m, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{m.label}</span>
                        <span>{m.percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-gray-900 h-full" style={{width: `${m.percent}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// StatCard - Fix lỗi render bằng cách gọi Icon Component trực tiếp
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div className="flex items-center gap-4">
      <div className={`p-4 ${color} rounded-lg flex items-center justify-center`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

export default Statistics;