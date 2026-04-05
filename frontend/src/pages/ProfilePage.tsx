import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../services/hooks';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { changePassword, loading: isSubmitting } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await changePassword(user.id, oldPassword, newPassword, confirmPassword);
      toast.success(result.message || "Thành công!");
      setIsChangePasswordOpen(false);
      // Reset fields...
    } catch (error: any) {
      toast.error(error.message || "Lỗi!");
    }
  };

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
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-4">Chưa có đơn hàng nào</p>
                <button
                onClick={() => navigate("/products")}
                className="bg-black text-white px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-gray-800 transition-colors"
              >
                Mua sắm ngay
              </button>
            </div>
        </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold uppercase mb-4">Cài đặt tài khoản</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-gray-200 transition-colors"
              >
                Đổi mật khẩu
              </button>
              <button className="bg-red-100 text-red-700 px-6 py-2 rounded-lg font-bold uppercase text-sm hover:bg-red-200 transition-colors">
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Đổi mật khẩu */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold uppercase mb-6 text-center">Đổi mật khẩu</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu cũ</label>
                <input 
                  type="password" 
                  required 
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu mới</label>
                <input 
                  type="password" 
                  required 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                <input 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setIsChangePasswordOpen(false)} className="flex-1 bg-gray-100 text-black py-3 rounded-lg font-bold uppercase hover:bg-gray-200 transition-all">Hủy</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white py-3 rounded-lg font-bold uppercase hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;