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
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth") || "null") || "");
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
        // Lưu ý: Đổi URL này thành URL Backend ASP.NET của bạn (ví dụ: https://localhost:7xxx/api/auth/login)
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
      {/* Cánh trái: Hình ảnh (Ẩn trên mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <img src={Image} alt="Login Art" className="max-w-full h-auto object-cover" />
      </div>

      {/* Cánh phải: Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="HQ Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
            <p className="text-gray-500">Please enter your details</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember for 30 days</label>
              </div>
              <a href="#" className="text-sm font-semibold text-black hover:underline">Forgot password?</a>
            </div>

            <div className="space-y-3">
              <button 
                type="submit" 
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Log In
              </button>
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <img src={GoogleSvg} alt="Google" className="w-5 h-5" />
                Log In with Google
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Don't have an account? <Link to="/register" className="font-bold text-black hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;