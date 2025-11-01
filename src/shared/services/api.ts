import axios from "axios";

import {
  CreateUserRequest,
  User,
} from "../../features/user-management/types/user.types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");
    return data;
  },

  createUser: async (user: CreateUserRequest): Promise<User> => {
    const { data } = await api.post<User>("/users", user);
    return data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },
};

export default api;
