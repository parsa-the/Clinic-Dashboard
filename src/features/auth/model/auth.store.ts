import { create } from "zustand";
import type { User } from "@/types";
import { persist } from "zustand/middleware";
type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) =>
        set({
          user,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),
    }),
    { name: "auth" },
  ),
);
