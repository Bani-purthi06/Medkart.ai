import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function AuthGuard({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (adminOnly && !auth.isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
