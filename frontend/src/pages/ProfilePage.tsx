import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/auth");
      return;
    }

    const userData = JSON.parse(auth);
    setUser(userData.user);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold uppercase mb-4">Thông tin cơ bản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 uppercase mb-1">Họ và tên</label>
                  <p className="text-lg font-medium">{user.fullName || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 uppercase mb-1">Email</label>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 uppercase mb-1">Vai trò</label>
                  <p className="text-lg font-medium">{user.role || 'Customer'}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold uppercase mb-4">Lịch sử mua hàng</h2>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">Chưa có đơn hàng nào</p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-black text-white px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-gray-800 transition-colors"
                >
                  Mua sắm ngay
                </button>
              </div>
            </div>
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