import { useState } from "react";
import { authApi } from "./api";
import { authController } from "./controller";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    const validation = authController.validateLogin(email, password);
    if (!validation.success) {
      throw new Error(validation.message);
    }

    try {
      setLoading(true);
      const data = await authApi.login({ email, password });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData: any) => {
    const validation = authController.validateRegister(registerData);
    if (!validation.success) {
      throw new Error(validation.message);
    }

    try {
      setLoading(true);
      const formattedData = {
        username: registerData.email.split('@')[0], 
        password: registerData.password,             
        email: registerData.email,               
        role: "Customer",                         
        full_name: `${registerData.name} ${registerData.lastname}`
      };
      
      const data = await authApi.register(formattedData);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (idToken: string) => {
    try {
      setLoading(true);
      const data = await authApi.googleLogin(idToken);
      localStorage.setItem("auth", JSON.stringify(data));
      return data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Xác thực Google thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loginWithGoogle, loading };
};