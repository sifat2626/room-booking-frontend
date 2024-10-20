// hooks/useAxios.js

import axios from "axios";

export const axiosCommon = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
