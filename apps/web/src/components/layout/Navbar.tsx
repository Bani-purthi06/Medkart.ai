import { Bell, Moon, Search, ShieldCheck, Sun, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUiStore } from "@/store/uiStore";
import { Button } from "@/components/ui/Button";

const navLink = ({ isActive }: { isActive: boolean }) =>
  `focus-ring rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-mint/10 text-mint" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;

export function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth();
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="focus-ring flex items-center gap-2 rounded-md font-black text-ink dark:text-white">
          <span className="grid size-9 place-items-center rounded-md bg-mint text-white">
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
          <Link to="/search" className="focus-ring rounded-md p-2 text-slate-600 md:hidden dark:text-slate-300" aria-label="Open search">
            <Search className="size-5" />
          </Link>
          <Link to="/alerts" className="focus-ring rounded-md p-2 text-slate-600 dark:text-slate-300" aria-label="Open alerts">
            <Bell className="size-5" />
          </Link>
          <button className="focus-ring rounded-md p-2 text-slate-600 dark:text-slate-300" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>
          {isAuthenticated ? (
            <Link to="/profile" className="focus-ring rounded-md p-2 text-slate-600 dark:text-slate-300" aria-label="Open profile">
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
