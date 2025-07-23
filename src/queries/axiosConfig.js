import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  retrieveToken,
  storeToken,
  retrieveRefreshToken,
  removeTokens,
  storeRefreshToken,
} from "../utils/storage";

const APIURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  withCredentials: false,
  baseURL: APIURL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = retrieveToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshToken = async () => {
  const refreshToken = retrieveRefreshToken();
  if (refreshToken) {
    try {
      const response = await axios.get(`${APIURL}auth/refresh-token`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (
        response?.status === 403 ||
        response?.data?.status === 403 ||
        response?.data?.data?.status === 403
      ) {
        Swal.fire({
          title: "Session Expired!",
          text: "Your session is expired. Please login again",
          icon: "error",
        });
        window.location.href = "/auth/login";
        return false;
      }
      const { access_token, refresh_token } = response.data.data;
      storeToken(access_token); // Update access token
      storeRefreshToken(refresh_token); // Update refresh token
      // Optionally store new refresh token if needed
      onRefreshed(access_token);
      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      // Logout();
      Swal.fire({
        title: "Session Expired!",
        text: "Your session is expired. Please login again",
        icon: "error",
      });
      window.location.href = "/auth/login";
      return false;
    }
  } else {
    removeTokens();
    window.location.href = "/auth/login";
    throw new Error("No refresh token available");
  }
};

api.interceptors.response.use(
  (response) => {
    if (response?.data?.code == 503) {
      Swal.fire({
        title: "Service down!",
        text: response?.data?.message,
        icon: "error",
      });
      return false;
    }
    // if (response?.data?.code !== 200) {
    //   Swal.fire({
    //     title: "Error!",
    //     text: response?.data?.message,
    //     icon: "error",
    //   });
    //   return false;
    // }
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    // Check if the _retry flag is already set on the request
    if (!originalRequest._retry) {
      originalRequest._retry = false;
    }
    // Handle network error
    if (error.code === "ERR_NETWORK" || !response) {
      Swal.fire({
        title: "Network Error!",
        text: "Not able to reach the server, please try again later.",
        icon: "error",
      });
      return false;
    } else if (response?.status === 503) {
      // If there's no response or it's a network error, return a 503-like error
      Swal.fire({
        title: "Service down!",
        text: "B-Connect Service is down, please try again later.",
        icon: "error",
      });
      return false;
    } else if (response?.status === 403 && !originalRequest._retry) {
      // If the error is due to an expired access token and we haven't already retried
      // Mark the request as retried
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Attempt to refresh the token
          const newToken = await refreshToken();
          isRefreshing = false;

          // Update the Authorization header in the original request
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          // If refreshing the token fails, reject with the original error
          isRefreshing = false;
          refreshSubscribers = []; // Clear subscribers on failure
          return Promise.reject(refreshError);
        }
      }

      // Queue the request to be retried after token refresh
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    } else if (response?.status !== 200 || response?.status !== 201) {
      // If there's no response or it's a network error, return a 503-like error
      Swal.fire({
        title: "Error!",
        text:
          response?.message ||
          response?.data?.message ||
          "Something went wrong, Please try again later",
        icon: "error",
      });
      return false;
    }

    // If the error is not a 403 or we already retried, reject
    return Promise.reject(error);
  }
);

export default api;
