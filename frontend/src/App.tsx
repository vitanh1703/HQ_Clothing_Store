<<<<<<< HEAD
// import Login from './components/Login'; 
// import './App.css'

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App

import Navbar from './components/Header';
import ProductsPage from './components/ProductsPage';
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Logout from './components/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> ac86f7de0ead935723a310b66c28c1c01a96fb6a

function App() {
  return (
    <>
<<<<<<< HEAD
      <Navbar />
      <ProductsPage />
    </>
  );
}
export default App
=======
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
>>>>>>> ac86f7de0ead935723a310b66c28c1c01a96fb6a
