import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token] = useState(JSON.parse(localStorage.getItem("auth") || "null") || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    
    let email = target.email.value;
    let password = target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = { email, password };
      try {
        const response = await axios.post("http://localhost:3000/api/v1/login", formData);
        
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        toast.success("Đăng nhập thành công!");
        navigate("/dashboard");
      } catch (err: any) {
        console.log(err);
        toast.error(err.response?.data?.message || "Sai tài khoản hoặc mật khẩu");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.info("Bạn đã đăng nhập rồi");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Cánh trái: Hình ảnh minh họa (Ẩn trên thiết bị di động) */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <img src={Image} alt="Hình ảnh đăng nhập" className="max-w-full h-auto object-cover" />
      </div>

      {/* Cánh phải: Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo Công ty" className="w-32 mb-6" />
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
                  placeholder="Địa chỉ email của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
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
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Ghi nhớ trong 30 ngày</label>
              </div>
              <a href="#" className="text-sm font-semibold text-black hover:underline">Quên mật khẩu?</a>
            </div>

            <div className="space-y-3">
              <button 
                type="submit" 
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Đăng Nhập
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