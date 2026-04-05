import axios from "axios";

const API_BASE = "https://localhost:7137/api"; 

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
    const response = await axios.post(`${API_BASE}/Auth/google-login`, { token: idToken });
    return response.data;
  }
};