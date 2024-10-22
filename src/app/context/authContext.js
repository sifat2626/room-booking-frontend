"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosCommon } from "../hooks/useAxios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get("access_token");
    return token ? jwtDecode(token) : null;
  });

  const [error, setError] = useState(null);

  // Function to decode token and set user
  const decodeTokenAndSetUser = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (err) {
      console.error("Token decoding error:", err);
      setUser(null); // Reset user if decoding fails
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosCommon.post(
        "/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { user, accessToken } = response.data;
        setUser(user); // Set user directly
        Cookies.set("access_token", accessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response ? error.response.data.message : "Login failed");
    }
  };

  const logout = async () => {
    try {
      // await axiosCommon.post("/users/logout");
      setUser(null);
      Cookies.remove("access_token");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axiosCommon.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Fetch user details error:", error);
    }
  };

  // Effect to decode token and update user state if token exists
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      decodeTokenAndSetUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, getUserDetails, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
