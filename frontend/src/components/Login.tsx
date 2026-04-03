import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../services/hooks";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Kiểm tra đăng nhập ngay khi vào trang
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Lấy dữ liệu từ form
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await login(email, password);
      
      // 'data' ở đây là kết quả trả về từ api.ts (bao gồm token, user info...)
      localStorage.setItem("auth", JSON.stringify(data));
      
      toast.success("Chào mừng bạn trở lại!");
      
      // Chuyển hướng ngay sang dashboard
      navigate("/dashboard");
    } catch (err: any) {
      // Hiển thị lỗi từ Controller hoặc Server trả về
      toast.error(err.message || "Đăng nhập thất bại, vui lòng thử lại");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Cánh trái: Hình ảnh */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <img src={Image} alt="Login Illustration" className="max-w-full h-auto object-cover" />
      </div>

      {/* Cánh phải: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900">Chào mừng trở lại!</h2>
            <p className="text-gray-500">Vui lòng nhập thông tin chi tiết của bạn</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Địa chỉ email của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
                <div 
                  className="absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Ghi nhớ</label>
              </div>
              <a href="#" className="text-sm font-semibold text-black hover:underline">Quên mật khẩu?</a>
            </div>

            <div className="space-y-3">
              <button 
                type="submit" 
                disabled={loading} // Ngăn nhấn nhiều lần khi đang load
                className={`w-full bg-black text-white py-3 rounded-lg font-semibold transition-all ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                {loading ? "Đang xác thực..." : "Đăng Nhập"}
              </button>
              
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <img src={GoogleSvg} alt="Google" className="w-5 h-5" />
                Đăng nhập bằng Google
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Chưa có tài khoản? <Link to="/register" className="font-bold text-black hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;