import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "./auth"; // স্টেপ ২ থেকে লগআউট ফাংশন ইম্পোর্ট

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 1. Request Interceptor: প্রতিটি রিকোয়েস্টে Access Token যুক্ত করা
api.interceptors.request.use((config) => {
    const token = Cookies.get("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Response Interceptor: 401 Error হলে রিফ্রেশ টোকেন দিয়ে নতুন টোকেন জেনারেট করা
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // টোকেন মেয়াদ শেষ? এবং রিফ্রেশ করার চেষ্টা হয়নি?
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Retry ফ্ল্যাগ সেট করা

      try {
        const refreshToken = Cookies.get("refresh");
        
        if (refreshToken) {
            // রিফ্রেশ টোকেন ব্যবহার করে নতুন Access Token এর জন্য রিকোয়েস্ট
            const response = await axios.post(
              `${API_BASE_URL}/token/refresh/`,
              { refresh: refreshToken }
            );

            const newAccessToken = response.data.access;
            
            // নতুন টোকেন সেভ, হেডার আপডেট এবং অরিজিনাল রিকোয়েস্টটি আবার পাঠানো
            Cookies.set("access_token", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        }
      } catch (refreshError) {
        // রিফ্রেশও ফেইল করলে সেশন মেয়াদোত্তীর্ণ, লগআউট করা
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

