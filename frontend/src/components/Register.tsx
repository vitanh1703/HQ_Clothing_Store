import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import GoogleSvg from "../assets/icons8-google.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token] = useState(JSON.parse(localStorage.getItem("auth") || "null") || "");

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as any;
    
    let name = target.name.value;
    let lastname = target.lastname.value;
    let email = target.email.value;
    let password = target.password.value;
    let confirmPassword = target.confirmPassword.value;

    if (name && lastname && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const formData = {
          username: `${name} ${lastname}`,
          email,
          password
        };
        try {
          // Lưu ý: Đổi URL này cho khớp với Backend của bạn
          await axios.post("http://localhost:3000/api/v1/register", formData);
          toast.success("Đăng ký thành công!");
          navigate("/login");
        } catch (err: any) {
          toast.error(err.response?.data?.message || err.message);
        }
      } else {
        toast.error("Mật khẩu xác nhận không khớp");
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };

  useEffect(() => {
    if (token !== "") {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Bên trái: Hình ảnh minh họa (Ẩn trên mobile) */}
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
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Tạo tài khoản mới</h2>
            <p className="text-gray-500 mt-2">Vui lòng điền thông tin bên dưới</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
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

            <div className="pt-2 space-y-3">
              <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                Đăng ký ngay
              </button>
              
              <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                <img src={GoogleSvg} alt="Google" className="w-5 h-5" />
                Đăng ký với Google
              </button>
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