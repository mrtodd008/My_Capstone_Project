import axios from "axios"; // Or your preferred HTTP client

const API_URL = import.meta.env.VITE_API_URL;
// Get API URL from environment variables

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw API error
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    throw error.response.data;
  }
};

// Add other authentication-related functions as needed
