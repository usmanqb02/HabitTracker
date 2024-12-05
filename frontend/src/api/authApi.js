// src/api/authApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api/auth/';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}login/`, { email, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}register/`, { username, email, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}logout/`);
  return response.data;
};
