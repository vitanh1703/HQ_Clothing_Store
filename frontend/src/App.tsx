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
      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar luôn hiện ở trên cùng */}
      <Navbar />

      <div className="main-content">
        <Routes>
          {/* SỬA TẠI ĐÂY: Chuyển hướng từ trang chủ "/" sang "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Định nghĩa các tuyến đường */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductsPage />} />
          
          {/* Trang 404 */}
          <Route path="*" element={<div className="p-10 text-center text-2xl font-bold">404 - Không tìm thấy trang</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;