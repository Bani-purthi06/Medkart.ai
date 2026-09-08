import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
import { SplashScreen } from "@/components/SplashScreen";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ToastHost } from "@/components/ui/Toast";
import { LoginPage as NewLoginPage } from "@/features/auth/LoginPage";
import { RegisterPage } from "@/features/auth/RegisterPage";
import { LandingPage } from "@/pages/LandingPage";
import { SearchPage } from "@/pages/SearchPage";
import { MedicineDetailPage } from "@/pages/MedicineDetailPage";
import { PrescriptionUploadPage } from "@/pages/PrescriptionUploadPage";
import { PrescriptionReviewPage } from "@/pages/PrescriptionReviewPage";
import { WatchlistPage } from "@/pages/WatchlistPage";
import { AlertsPage } from "@/pages/AlertsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AdminCatalogPage, AdminDashboardPage, AdminScrapersPage, AdminUsersPage } from "@/pages/AdminPages";

export default function App() {
  const location = useLocation();
  const isPublicLanding = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="min-h-screen bg-slate-50 text-ink dark:bg-slate-950 dark:text-slate-100">
      {!isAuthPage && !isPublicLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/medicine/:id" element={<MedicineDetailPage />} />
        <Route path="/prescription/upload" element={<AuthGuard><PrescriptionUploadPage /></AuthGuard>} />
        <Route path="/prescription/:id" element={<AuthGuard><PrescriptionReviewPage /></AuthGuard>} />
        <Route path="/watchlist" element={<AuthGuard><WatchlistPage /></AuthGuard>} />
        <Route path="/alerts" element={<AuthGuard><AlertsPage /></AuthGuard>} />
        <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
        <Route path="/admin/dashboard" element={<AuthGuard adminOnly><AdminDashboardPage /></AuthGuard>} />
        <Route path="/admin/catalog" element={<AuthGuard adminOnly><AdminCatalogPage /></AuthGuard>} />
        <Route path="/admin/users" element={<AuthGuard adminOnly><AdminUsersPage /></AuthGuard>} />
        <Route path="/admin/scrapers" element={<AuthGuard adminOnly><AdminScrapersPage /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAuthPage && !isPublicLanding && <Footer />}
      <ToastHost />
    </div>
  );
}
