"use client";
// context/AuthContext.js
import React, { createContext, useState, useContext } from "react";
import { axiosCommon } from "../hooks/useAxios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axiosCommon.post("/users/login", {
        email,
        password,
      });

      console.log("Login response:", response.data); // Log full response

      if (response.status === 200) {
        const { user, accessToken } = response.data; // Adjust based on your backend response structure
        console.log("User data received:", user); // Log user data

        setUser(user); // Set user state

        // Set the access token in a cookie
        Cookies.set("access_token", accessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Network error");
    }
  };

  const logout = async () => {
    try {
      await axiosCommon.post("/users/logout"); // Assuming your backend has a logout endpoint
      setUser(null);

      // Remove the access token cookie on logout
      Cookies.remove("access_token"); // Expire the cookie
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axiosCommon.get("/users/me"); // Fetch user details from /me endpoint
      setUser(response.data); // Update user state with fetched details
    } catch (error) {
      console.error("Fetch user details error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
