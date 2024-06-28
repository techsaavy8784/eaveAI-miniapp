// src/lib/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api-eave.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const username = "admin";
    const password = "re4OBH3odoq";

    config.auth = {
      username: username,
      password: password,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
