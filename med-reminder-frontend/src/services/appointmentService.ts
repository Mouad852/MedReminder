import axios from "axios";

// API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ---------- Axios Instance with Interceptor ----------
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically before each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- TypeScript Interfaces ----------
export interface CreateAppointmentData {
  doctorId?: string;
  doctorName?: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  type?: "CONSULTATION" | "CHECKUP" | "FOLLOW_UP";
  notes?: string;
  status?: "BOOKED" | "COMPLETED" | "CANCELLED";
}

export interface UpdateAppointmentData extends Partial<CreateAppointmentData> {}

export interface GetAppointmentQuery {
  doctorId?: string;
  status?: string;
}

// ---------- Appointment API Calls ----------
export const getAppointments = async (query?: GetAppointmentQuery) => {
  try {
    const res = await axiosInstance.get("/appointments", { params: query });
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch appointments:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createAppointment = async (data: CreateAppointmentData) => {
  try {
    // Optional: convert date/time or validate here if needed

    const res = await axiosInstance.post("/appointments", data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to create appointment:",
      error.response?.data || error.message
    );
    console.log(error.response.data.message);
    throw error;
  }
};

export const updateAppointment = async (
  id: string,
  data: UpdateAppointmentData
) => {
  try {
    const res = await axiosInstance.patch(`/appointments/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to update appointment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/appointments/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to delete appointment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getDoctors = async (specialty) => {
  try {
    const res = await axiosInstance.get("/doctors", {
      params: specialty ? { specialty } : {},
    });
    return res.data; // array of doctors
  } catch (error) {
    console.error(
      "Failed to fetch doctors:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const res = await axiosInstance.get(`/doctors/${id}`);
    return res.data; // single doctor object
  } catch (error) {
    console.error(
      "Failed to fetch doctor:",
      error.response?.data || error.message
    );
    throw error;
  }
};
