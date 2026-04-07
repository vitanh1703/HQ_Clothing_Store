import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Header'; 
import AuthForm from './pages/AuthForm';
import Logout from './pages/Logout';
import Footer from './components/Footer'; 
import ProductsPage from './pages/ProductsPage';
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  const location = useLocation();
  const hideLayoutPaths = ["/auth", "/logout"];
  const isHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {!isHideLayout && <Navbar />}

      <div className="main-content flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<div className="p-10 text-center text-2xl font-bold italic">404 - Không tìm thấy trang</div>} />
        </Routes>
      </div>

      {!isHideLayout && <Footer />}
    </div>
  );
}

export default App;