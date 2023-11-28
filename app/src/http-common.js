// api.js

import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api`; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization token or any other headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if a token exists in localStorage or wherever you store your token
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const token = userData?.token;

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global error handling or data transformation
axiosInstance.interceptors.response.use(
  (response) => {
    // Add your logic for handling successful responses here
    return response;
  },
  (error) => {
    // Add your logic for handling errors here
    return Promise.reject(error);
  }
);

export const api = {
  get: (url, params) => axiosInstance.get(url, { params }),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

// Export axios for custom use if needed
export default axiosInstance;
