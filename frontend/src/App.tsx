import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Header'; 
import AuthForm from './components/AuthForm';
import Logout from './components/Logout';
import ProductsPage from './components/ProductsPage';
import CartPage from "./components/CartPage";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/auth", "/logout"];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<div className="p-10 text-center text-2xl font-bold">404 - Không tìm thấy trang</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;