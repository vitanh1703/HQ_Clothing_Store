import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Header'; 
import Login from './components/Login';
import Register from './components/Register'; 
import Logout from './components/Logout';
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <>
      {/* Cấu hình để thông báo Toast hiện lên */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar sẽ luôn hiện ở trên cùng của mọi trang */}
      <Navbar />

      <div className="main-content">
        <Routes>
          {/* Khi vào trang chủ sẽ tự động chuyển đến trang Sản phẩm hoặc Login */}
          <Route path="/" element={<Navigate to="/products" />} />
          
          {/* Định nghĩa các tuyến đường (Routes) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductsPage />} />
          
          {/* Trang 404 nếu gõ sai URL */}
          <Route path="*" element={<div className="p-10 text-center text-2xl font-bold">404 - Không tìm thấy trang</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;