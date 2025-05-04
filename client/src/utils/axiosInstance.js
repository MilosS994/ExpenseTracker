import axios from "axios";
const apiURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/signin";
      } else if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again.");
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
