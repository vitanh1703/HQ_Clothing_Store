import axios from "axios";

const API_BASE = "https://localhost:7137/api"; 

export interface Variant {
  id: number;
  productId: number;   
  size: string;
  color: string;
  price: number;
  stockQuantity: number; 
}

export interface Product {
  imageSrc: any;
  id: number;
  name: string;
  brandText?: string;    
  accentColor?: string;
  hoverAccent?: string;
  imageUrl: string;    
  description?: string;
  categoryId?: number;
  supplierId?: number;
  variants: Variant[]; 
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface NewsCardProps {
  id: number;
  category: string;
  title: string;
  date: string;
  img: string;
  desc: string;
}
export interface ServiceItem {
  id: number;
  iconName: string;
  title: string;
  description: string;
}

export interface PromotionItem {
  id: number;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
}export interface AddToCartRequest {
  userId: number;
  variantId: number;
  quantity: number;
}

export interface ServicesCardProps {
  iconName: string;
  title: string;
  description: string;
}

export interface PromotionCardProps {
  code: string;
  title: string;
  description: string;
  discountPercent: number;
}

export const authApi = {
  login: async (loginData: any) => {
    const response = await axios.post(`${API_BASE}/Auth/login`, {
      Email: loginData.email,    
      Password: loginData.password
    });
    return response.data;
  },

  register: async (formData: any) => {
    const response = await axios.post(`${API_BASE}/Auth/register`, formData);
    return response.data;
  },

  googleLogin: async (idToken: string) => {
    const response = await axios.post(`${API_BASE}/Auth/google-login`, { 
      token: idToken 
    });
    return response.data;
  }
};

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE}/Products`);
    return response.data;
  }
};

export const cartApi = {
  add: async (data: AddToCartRequest) => {
    const response = await axios.post(`${API_BASE}/Cart/add`, data);
    return response.data;
  }
};

export const newsApi = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE}/News`);
    return response.data;
  }
};

export const servicesApi = {
  getAll: async (): Promise<ServiceItem[]> => {
    const response = await axios.get(`${API_BASE}/Services`);
    return response.data;
  }
};

export const promotionsApi = {
  getAll: async (): Promise<PromotionItem[]> => {
    const response = await axios.get(`${API_BASE}/Promotions`);
    return response.data;
  }
};