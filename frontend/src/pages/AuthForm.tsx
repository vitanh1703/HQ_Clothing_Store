import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../services/hooks';
import { GoogleLogin } from '@react-oauth/google';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, register, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      navigate("/home");
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
      navigate("/home");
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập thất bại");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registerData = {
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    try {
      await register(registerData);
      toast.success("Đăng ký thành công! Hãy đăng nhập nhé.");
      setIsRightPanelActive(false);
    } catch (err: any) {
      toast.error(err.message || "Đăng ký thất bại");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      const data = await loginWithGoogle(idToken);
      toast.success(`Chào mừng ${data.user.full_name} trở lại!`);
      navigate("/home");
    } catch (error: any) {
      toast.error(error.message || "Lỗi xác thực Google");
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden font-sans bg-[#f6f5f7]">
      <div className={`relative overflow-hidden w-212.5 max-w-full min-h-155 bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25)] rounded-[20px] z-10 transition-all duration-600 ease-in-out`}>
        
        {/* --- FORM ĐĂNG KÝ --- */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-1 opacity-0 
          ${isRightPanelActive ? 'translate-x-full opacity-100 z-5 animate-show' : ''}`}>
          <form onSubmit={handleRegisterSubmit} className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
            <h1 className="text-3xl font-bold mb-2">Tạo tài khoản mới</h1>
            <p className="text-gray-500 mb-6 text-sm">Vui lòng điền thông tin bên dưới</p>
            
            <div className="flex gap-3 w-full mb-3">
              <input name="name" type="text" placeholder="Tên" required className="border border-gray-300 p-3 w-1/2 rounded-lg outline-none focus:ring-1 focus:ring-black" />
              <input name="lastname" type="text" placeholder="Họ" required className="border border-gray-300 p-3 w-1/2 rounded-lg outline-none focus:ring-1 focus:ring-black" />
            </div>
            
            <input name="email" type="email" placeholder="Email" required className="border border-gray-300 p-3 mb-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black" />
            
            <div className="relative w-full mb-3">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Mật khẩu" required className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 text-gray-400">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <input name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu" required className="border border-gray-300 p-3 mb-6 w-full rounded-lg outline-none focus:ring-1 focus:ring-black" />
            
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-black text-white font-bold py-3 uppercase active:scale-95 transition-all mb-3 disabled:bg-gray-400 cursor-pointer">
              {loading ? "Đang xử lý..." : "Đăng ký ngay"}
            </button>
            
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google Auth Fail")} theme="outline" width="340px" text="signup_with" />
          </form>
        </div>

        {/* --- FORM ĐĂNG NHẬP --- */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 
          ${isRightPanelActive ? 'translate-x-full' : ''}`}>
          <form onSubmit={handleLoginSubmit} className="bg-white flex items-center justify-center flex-col px-10 h-full">
            <div className="mb-4 text-center w-full">
                <div className="bg-black w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-4 italic">H&Q</div>
                <h1 className="text-3xl font-bold">Chào mừng trở lại!</h1>
                <p className="text-gray-500 text-sm mt-1">Vui lòng nhập thông tin chi tiết của bạn</p>
            </div>

            <div className="w-full mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input name="email" type="email" placeholder="Địa chỉ email của bạn" required className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black" />
            </div>

            <div className="w-full mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                <div className="relative">
                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" required className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-1 focus:ring-black" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 text-gray-400">
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>
            </div>

            {/* Đã xóa Checkbox Ghi nhớ, chỉ giữ lại Quên mật khẩu căn phải */}
            <div className="flex justify-end w-full mb-6 text-sm">
                <a href="#" className="font-bold hover:underline">Quên mật khẩu?</a>
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-lg bg-black text-white font-bold py-3 uppercase active:scale-95 transition-all mb-3 disabled:bg-gray-400 cursor-pointer">
              {loading ? "Đang xác thực..." : "Đăng Nhập"}
            </button>

            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google Auth Fail")} theme="outline" width="340px" text="signin_with" />
          </form>
        </div>

        {/* --- OVERLAY --- */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${isRightPanelActive ? '-translate-x-full' : ''}`}>
          <div className={`bg-linear-to-r from-gray-900 to-black text-white relative -left-full h-full w-[200%] transition-transform duration-600 ${isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'}`}>
            <div className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ${isRightPanelActive ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="text-3xl font-bold">Chào bạn mới!</h1>
              <p className="text-sm font-light my-5">Gia nhập H&Q Store để khám phá phong cách thời trang mới nhất.</p>
              <button onClick={() => setIsRightPanelActive(false)} className="bg-transparent border border-white rounded-full text-white text-xs font-bold py-3 px-11 uppercase cursor-pointer hover:bg-white hover:text-black transition-all">Đăng nhập</button>
            </div>
            <div className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 right-0 h-full w-1/2 transition-transform duration-600 ${isRightPanelActive ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="text-3xl font-bold">Khám phá ngay!</h1>
              <p className="text-sm font-light my-5">Tạo tài khoản và bắt đầu hành trình mua sắm tuyệt vời cùng chúng tôi.</p>
              <button onClick={() => setIsRightPanelActive(true)} className="bg-transparent border border-white rounded-full text-white text-xs font-bold py-3 px-11 uppercase cursor-pointer hover:bg-white hover:text-black transition-all">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;