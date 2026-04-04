import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../services/hooks";
import { GoogleLogin } from '@react-oauth/google'; 

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, loginWithGoogle, loading } = useAuth();

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    
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
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Đăng ký thất bại");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      await loginWithGoogle(idToken);
      toast.success("Đăng nhập bằng Google thành công!");
      navigate("/products");
    } catch (error: any) {
      toast.error(error.message || "Lỗi xác thực Google");
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      navigate("/products"); 
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Bên trái: Hình ảnh */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="bg-black w-full aspect-square rounded-2xl flex items-center justify-center text-white text-6xl font-bold mb-8 shadow-2xl">
            H&Q
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gia nhập H&Q Store</h2>
          <p className="text-gray-600 text-lg">Khám phá phong cách thời trang mới nhất cùng chúng tôi.</p>
        </div>
      </div>

      {/* Bên phải: Form đăng ký */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-100 space-y-8 flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Tạo tài khoản mới</h2>
            <p className="text-gray-500 mt-2">Vui lòng điền thông tin bên dưới</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-2 gap-4">
              <input name="name" type="text" placeholder="Tên" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
              <input name="lastname" type="text" placeholder="Họ" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
            </div>

            <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-black">
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3 items-center">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-2.5 rounded-md font-bold shadow-lg transition-all active:scale-95 ${loading ? "opacity-50 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                style={{ height: '40px' }}
              >
                {loading ? "Đang xử lý..." : "Đăng ký ngay"}
              </button>
              
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Đăng ký Google thất bại")}
                  theme="outline"
                  size="large"
                  text="signup_with" 
                  shape="rectangular"
                  width="400px"
                />
              </div>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Bạn đã có tài khoản? <Link to="/login" className="font-bold text-black hover:underline">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;