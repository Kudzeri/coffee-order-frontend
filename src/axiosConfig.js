import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444",
  "Content-Type": "application/json",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error in response:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
