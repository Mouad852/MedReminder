import axios from "axios";

const API_URL = "http://localhost:3000/users"; // change if your backend runs elsewhere

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updateUser = async (id, userData) => {
  const token = localStorage.getItem("token");

  // Pick only editable fields
  const payload = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    gender: userData.gender,
    birthDate: userData.birthDate ? new Date(userData.birthDate) : null,
    address: userData.address,
    city: userData.city,
    country: userData.country,
    notifications: userData.notifications,
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.patch(`${API_URL}/${id}`, payload, config);
  return res.data;
};
