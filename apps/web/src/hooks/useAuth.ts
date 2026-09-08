import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  return {
    token,
    user,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === "admin",
  };
}
