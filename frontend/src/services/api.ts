import axios from "axios";

const API_BASE = "https://localhost:7137/api"; 

export const authApi = {
  login: async (formData: any) => {
    const response = await axios.post(`${API_BASE}/Auth/login`, formData);
    return response.data;
  },

  register: async (formData: any) => {
    const response = await axios.post(`${API_BASE}/Auth/register`, formData);
    return response.data;
  }
};

