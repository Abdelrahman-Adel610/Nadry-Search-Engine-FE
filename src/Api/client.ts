import axios from "axios";

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 100000000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
