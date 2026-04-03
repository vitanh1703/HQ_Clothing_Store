import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Logout from './components/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* Để thông báo Toast hiện lên trên cùng */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Khi vào trang chủ sẽ tự động chuyển đến Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Định nghĩa các trang chính */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Trang 404 nếu gõ sai URL */}
        <Route path="*" element={<div className="p-10 text-center">404 - Không tìm thấy trang</div>} />
      </Routes>
    </>
  );
}

export default App;