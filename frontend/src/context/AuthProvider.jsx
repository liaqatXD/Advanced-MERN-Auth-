import axios from "axios";
import { useState } from "react";
import { authContext } from "./authContext.js";

const BASE_URL = "http://localhost:8000/api/auth";
// necessary for sending cookies to cross origin request
axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
  const signup = async ({ name, email, password }) => {
    setIsLoading(true);
    setError(null);
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

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response?.data?.message || "error logging in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (verificationCode) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(`${BASE_URL}/verify-email`, {
        verificationCode,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "error verifying email");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    setIsCheckingAuth(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/check-auth`);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      setError(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      setError(error.response?.data?.message || "error logging out");
      throw error;
    }
  };
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        isLoading,
        signup,
        verifyEmail,
        checkAuth,
        login,
        isCheckingAuth,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
