import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginApi, logout as logoutApi } from "../Services/auth"; // Import your auth service functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await loginApi(credentials);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData; // Return the user data for further use
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw the error for component handling
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error if needed
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
