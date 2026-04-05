import { useEffect, useState } from "react";
import { authApi, productApi, cartApi, type Product } from "./api";
import { authController } from "./controller";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    const validation = authController.validateLogin(email, password);
    if (!validation.success) throw new Error(validation.message);

    try {
      setLoading(true);
      const data = await authApi.login({ email, password }); 
      
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.token) localStorage.setItem("token", data.token);
      
      return data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Đăng nhập thất bại"); 
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData: any) => {
    const validation = authController.validateRegister(registerData);
    if (!validation.success) throw new Error(validation.message);

    try {
      setLoading(true);
      const formattedData = {
        Email: registerData.email,
        Password: registerData.password,
        FullName: `${registerData.name} ${registerData.lastname}`,
        Role: "Customer",
        Status: true
      };
      return await authApi.register(formattedData);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (idToken: string) => {
    try {
      setLoading(true);
      const data = await authApi.googleLogin(idToken);
      
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("auth", JSON.stringify(data));
      
      return data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Xác thực Google thất bại");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return { login, register, loginWithGoogle, logout, loading };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export const useCart = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async (variantId: number, quantity: number) => {
    const userId = Number(localStorage.getItem("userId")) || 1;
    
    if (!userId) {
       alert("Vui lòng đăng nhập để thực hiện chức năng này");
       return;
    }

    setIsAdding(true);
    try {
      const result = await cartApi.add({
        userId,
        variantId,
        quantity
      });
      return result;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi khi thêm vào giỏ hàng";
      alert(msg);
      throw new Error(msg);
    } finally {
      setIsAdding(false);
    }
  };

  return { addToCart, isAdding };
};