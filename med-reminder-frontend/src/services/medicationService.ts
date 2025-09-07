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
export interface CreateMedicationDto {
  name: string;
  dosage: string | number;
  dosageUnit?: string;
  form?: string;
  timesPerDay: number;
  times?: string[];
  frequency?: string;
  startDate: string;
  endDate?: string;
  reminderMethod?: string;
  enableReminders?: boolean;
  notes?: string;
  status?: string;
  instruction?: string;
}

export interface UpdateMedicationDto extends Partial<CreateMedicationDto> {}

export interface GetMedicationQuery {
  name?: string;
  status?: string;
  frequency?: string;
  reminderMethod?: string;
}

// ---------- Medication API Calls ----------
export const getMedications = async (query?: GetMedicationQuery) => {
  try {
    const res = await axiosInstance.get("/medications", { params: query });
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch medications:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createMedication = async (data: CreateMedicationDto) => {
  try {
    // Convert dosage to number if needed
    if (typeof data.dosage === "string") {
      const dosageNumber = parseInt(data.dosage, 10);
      if (isNaN(dosageNumber)) throw new Error("Dosage must be a number");
      data.dosage = dosageNumber;
    }

    const res = await axiosInstance.post("/medications", data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to create medication:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateMedication = async (
  id: string,
  data: UpdateMedicationDto
) => {
  try {
    if (data.dosage && typeof data.dosage === "string") {
      const dosageNumber = parseInt(data.dosage, 10);
      if (isNaN(dosageNumber)) throw new Error("Dosage must be a number");
      data.dosage = dosageNumber;
    }

    const res = await axiosInstance.patch(`/medications/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to update medication:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteMedication = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/medications/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to delete medication:",
      error.response?.data || error.message
    );
    throw error;
  }
};
