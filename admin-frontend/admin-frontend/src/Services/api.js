import axios from "axios";

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend API's base URL
  timeout: 5000, // Timeout for requests (optional)
});

// Example function to get data
export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users"); // Endpoint to fetch users
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Example function to create a user
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/users", userData); // Endpoint to create a user
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Example function to update a user
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData); // Endpoint to update a user
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Example function to delete a user
export const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`/users/${userId}`); // Endpoint to delete a user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
