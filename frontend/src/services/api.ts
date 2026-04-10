import axios from "axios";

const API_BASE = "https://localhost:7137/api";

export interface Variant {
  sku: string;
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
export interface Category {
  id: number;
  name: string;
  description?: string;
}
export interface NewsTitle {
  id: number;
  title: string;
  category: string;
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
  description: string;
  discountValue: number;
  discountType: string;
  discountText: string;
  startDate: string;
  endDate: string;
  title?: string;
  discountPercent?: number;
}

export interface PromotionValidationResult {
  code: string;
  description: string;
  discountValue: number;
  discountType: string;
}

export interface CheckoutCartItem {
  id: number;
  variantId: number;
  productId: number;
  productName: string;
  size: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

export interface CheckoutUser {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CheckoutResponse {
  id: number;
  orderCode: string;
  cartId: number;
  user: CheckoutUser;
  items: CheckoutCartItem[];
}

export interface AddToCartRequest {
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
  discountText: string;
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
  createdAt: string;
  userName?: string;
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
  },
  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE}/Products/category/${categoryId}`);
    return response.data;
  },
  getCategories: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_BASE}/Products/categories`);
    return response.data;
  }
};

export const cartApi = {
  add: async (data: AddToCartRequest) => {
    const response = await axios.post(`${API_BASE}/Cart/add`, data);
    return response.data;
  },

  remove: async (cartItemId: number) => {
    const response = await axios.delete(`${API_BASE}/Cart/remove/${cartItemId}`);
    return response.data;
  },

  getCheckout: async (userId: number): Promise<CheckoutResponse> => {
    const response = await axios.get(`${API_BASE}/Cart/checkout/${userId}`);
    return response.data;
  }
};

export const newsApi = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE}/News`);
    return response.data;
  },
  getTitles: async (): Promise<NewsTitle[]> => {
    const response = await axios.get(`${API_BASE}/News/titles`);
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
  },

  validateCode: async (code: string): Promise<PromotionValidationResult> => {
    const response = await axios.get(`${API_BASE}/Promotions/validate/${encodeURIComponent(code)}`);
    return response.data;
  }
};

export const reviewApi = {
  getAll: async (): Promise<Review[]> => {
    const response = await axios.get(`${API_BASE}/Reviews`);
    return response.data;
  },
  getByProduct: async (productId: number): Promise<Review[]> => {
    const response = await axios.get(`${API_BASE}/Reviews/product/${productId}`);
    return response.data;
  },
  getByRating: async (rating: number): Promise<Review[]> => {
    const response = await axios.get(`${API_BASE}/Reviews/rating/${rating}`);
    return response.data;
  }
};