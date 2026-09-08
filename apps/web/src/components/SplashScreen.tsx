import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pill, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const navigationTimer = setTimeout(() => {
        navigate(isAuthenticated ? "/search" : "/login", { replace: true });
      }, 300);
      return () => clearTimeout(navigationTimer);
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo with pill and location pin accent */}
      <div className="relative flex items-center justify-center">
        <div className="flex items-end justify-center gap-1">
          <Pill className="h-16 w-16 text-white" strokeWidth={1.5} />
          <span className="mb-2 text-5xl font-black tracking-tight text-white">Medkart</span>
          <MapPin className="absolute -right-2 -top-1 h-5 w-5 animate-pulse text-white/90" fill="white" />
        </div>
      </div>

      {/* Tagline */}
      <p className="mt-6 text-center text-lg font-light tracking-wide text-white/90">Compare. Save. Stay Safe.</p>

      {/* Loading indicator - animated progress bar */}
      <div className="mt-12 w-48 space-y-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div className="animate-pulse h-full w-full bg-white/70" />
        </div>
        <p className="text-center text-xs text-white/60">Loading your medicine dashboard...</p>
      </div>
    </div>
  );
}
