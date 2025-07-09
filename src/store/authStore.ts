import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  fetchUserInfo: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// ✅ Safe browser check
const isClient = typeof window !== "undefined";

export const useAuthStore = create<AuthState>((set, get) => {
  const savedToken = isClient ? localStorage.getItem("token") : null;
  const savedUser = isClient ? localStorage.getItem("user") : null;

  return {
    token: savedToken,
    user: savedUser ? JSON.parse(savedUser) : null,
    isLoading: false,
    error: null,
    isCheckingAuth: false,

    login: async (email, password) => {
      set({ isLoading: true, error: null });

      try {
        const response = await axios.post(
          "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
          {
            email,
            password,
            isEmployee: true,
          }
        );

        const { token } = response.data;
        if (isClient) localStorage.setItem("token", token);
        set({ token, isLoading: false });

        await get().fetchUserInfo();
        return true;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || "Login failed",
          isLoading: false,
        });
        return false;
      }
    },

    fetchUserInfo: async () => {
      const { token } = get();
      if (!token) return;

      try {
        const response = await axios.get(
          "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        if (isClient) localStorage.setItem("user", JSON.stringify(user));
        set({ user });
      } catch (error: any) {
        set({ error: "Failed to fetch user info" });
      }
    },

    checkAuthStatus: async () => {
      const { token } = get();
      if (!token) return false;

      set({ isCheckingAuth: true });

      try {
        const response = await axios.get(
          "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        if (isClient) localStorage.setItem("user", JSON.stringify(user));
        set({ user, isCheckingAuth: false });
        return true;
      } catch (error) {
        if (isClient) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        set({ token: null, user: null, isCheckingAuth: false, error: null });
        return false;
      }
    },

    logout: () => {
      if (isClient) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      set({ token: null, user: null, error: null });
    },

    clearError: () => {
      set({ error: null });
    },
  };
});
