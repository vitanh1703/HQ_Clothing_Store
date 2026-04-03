import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../services/hooks";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      navigate("/products");
    }
  }, [navigate]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await login(email, password);
      localStorage.setItem("auth", JSON.stringify(data));
      toast.success("Chào mừng bạn trở lại!");
      
      navigate("/products");
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập thất bại, vui lòng thử lại");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      const decoded: any = jwtDecode(idToken);
      console.log("Thông tin Google User:", decoded);
      toast.success(`Chào ${decoded.name}, đăng nhập Google thành công!`);
      localStorage.setItem("auth", JSON.stringify({ token: idToken, user: decoded }));
      navigate("/products");
    } catch (error) {
      toast.error("Đăng nhập Google thất bại");
    }
  };
  const handleGoogleError = () => {
    toast.error("Đăng nhập Google thất bại!");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Cánh trái: Hình ảnh */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <img src={Image} alt="Login Illustration" className="max-w-full h-auto object-cover" />
      </div>

      {/* Cánh phải: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-100 space-y-8 flex flex-col items-center">
          
          <div className="flex flex-col items-center w-full">
            <img src={Logo} alt="Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 text-center">Chào mừng trở lại!</h2>
            <p className="text-gray-500 text-center">Vui lòng nhập thông tin chi tiết của bạn</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6 w-full">
            <div className="space-y-4 w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Địa chỉ email của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
              
              <div className="relative w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                />
                <div 
                  className="absolute bottom-3 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Ghi nhớ</label>
              </div>
              <a href="#" className="text-sm font-semibold text-black hover:underline">Quên mật khẩu?</a>
            </div>

            <div className="flex flex-col gap-3 w-full items-center">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full font-semibold transition-all shadow-sm rounded-md ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                }`}
                style={{ height: '40px' }} 
              >
                {loading ? "Đang xác thực..." : "Đăng Nhập"}
              </button>
              
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"   
                  text="signin_with"
                  shape="rectangular" 
                  width="400px" 
                />
              </div>
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