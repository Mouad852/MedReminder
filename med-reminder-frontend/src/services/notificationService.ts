import axios from "axios";

// Base API URL
const API_URL =
  import.meta.env.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:3000";

// ---------- Axios Instance with Interceptor ----------
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- TypeScript Interfaces ----------
export interface Notification {
  id: string;
  type: "APPOINTMENT" | "MEDICATION" | string;
  message: string;
  isRead: boolean;
  userId: string;
  sendAt?: string;
}

// ---------- Notification API Calls ----------
export const getNotifications = async () => {
  try {
    const res = await axiosInstance.get(`/notifications`); // removed userId
    return res.data as Notification[];
  } catch (error: any) {
    console.error(
      "Failed to fetch notifications:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/notifications/${id}/read`);
    return res.data as Notification;
  } catch (error: any) {
    console.error(
      "Failed to mark notification as read:",
      error.response?.data || error.message
    );
    throw error;
  }
};
