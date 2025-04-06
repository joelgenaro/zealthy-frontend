import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const get = (endpoint, config = {}) => {
  return apiClient.get(endpoint, config);
};

export const post = (endpoint, data, config = {}) => {
  return apiClient.post(endpoint, data, config);
};
