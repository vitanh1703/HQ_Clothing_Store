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
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import PaymentPage from './pages/PaymentPage';
import FAQPage from './pages/FAQPage';
import AboutUsPage from './pages/Aboutus';
import PaymentCallback from './pages/PaymentCallback';
import AdminDashboard from './pages/admin/AdminDashboard';
// Main App component với cấu trúc điều hướng và layout

function App() {
  const location = useLocation();
  
  const hideLayoutPaths = ["/auth", "/logout", "/admin"];
  const isHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {!isHideLayout && <Navbar />}

      <div className="main-content grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div className="p-10 text-center text-2xl font-bold italic">404 - Không tìm thấy trang</div>} />
        </Routes>
      </div>

      {!isHideLayout && <Footer />}
    </div>
  );
}

export default App;