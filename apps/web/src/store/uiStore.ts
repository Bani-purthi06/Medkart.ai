import { create } from "zustand";

export type ToastTone = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  tone: ToastTone;
  message: string;
}

interface UiState {
  theme: "light" | "dark";
  toasts: ToastMessage[];
  toggleTheme: () => void;
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: number) => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: "light",
  toasts: [],
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", theme === "dark");
      return { theme };
    }),
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now() }],
    })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
