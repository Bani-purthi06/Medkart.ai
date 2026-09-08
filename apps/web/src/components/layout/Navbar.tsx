import { Bell, Search, ShieldCheck, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

const navLink = ({ isActive }: { isActive: boolean }) =>
  `focus-ring rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-orange-100 text-orange-700" : "text-slate-600 hover:bg-orange-50"
  }`;

export function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="focus-ring flex items-center gap-2 rounded-md font-black text-ink">
          <span className="grid size-9 place-items-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
            <ShieldCheck className="size-5" />
          </span>
          <span>Medkart.ai</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/search" className={navLink}>
            Search
          </NavLink>
          <NavLink to="/prescription/upload" className={navLink}>
            Prescription
          </NavLink>
          <NavLink to="/watchlist" className={navLink}>
            Watchlist
          </NavLink>
          <NavLink to="/alerts" className={navLink}>
            Alerts
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin/dashboard" className={navLink}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/search" className="focus-ring rounded-md p-2 text-slate-600 md:hidden" aria-label="Open search">
            <Search className="size-5" />
          </Link>
          <Link to="/alerts" className="focus-ring rounded-md p-2 text-slate-600" aria-label="Open alerts">
            <Bell className="size-5" />
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="focus-ring rounded-md p-2 text-slate-600" aria-label="Open profile">
              <User className="size-5" />
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
