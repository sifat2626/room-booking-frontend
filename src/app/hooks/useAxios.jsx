// hooks/useAxios.js

import axios from "axios";

export const axiosCommon = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Enable sending cookies with requests
});

// Optionally, you can add interceptors for logging or handling errors globally
axiosCommon.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);
