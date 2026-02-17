import axios, { AxiosInstance } from "axios";
import { AuthResponse } from "../types/auth";


export async function refreshToken(): Promise<string> {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axios.post<AuthResponse>(
      "/api/auth/refresh",
      { refresh_token: refreshToken },
      { headers: { "Content-Type": "application/json", Accept: "application/json" } }
    );

    if (response.status === 200) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      return response.data.access_token;
    }
  } catch (error) {
    console.error("Token update error", error);
  }
}

export const getAxiosInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshToken();
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);
          window.location.href = "/login";

          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};
