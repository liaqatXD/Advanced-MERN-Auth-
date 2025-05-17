import axios from "axios";
import { useState } from "react";
import { authContext } from "./authContext.js";

const BASE_URL = "http://localhost:8000/api/auth";
const AuthProvider = ({ children }) => {
  const signup = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response?.data?.message || "error sigining up");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        isLoading,
        signup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
