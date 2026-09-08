import { BarChart3, Bot, Database, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/admin/catalog", label: "Catalog", icon: Database },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/scrapers", label: "Scrapers", icon: Bot },
];

export function AdminSidebar() {
  return (
    <aside className="mb-5 flex gap-2 overflow-x-auto md:mb-0 md:w-56 md:flex-col">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `focus-ring flex min-w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                isActive ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-white text-slate-600 hover:bg-orange-50"
              }`
            }
          >
            <Icon className="size-4" />
            {item.label}
          </NavLink>
        );
      })}
    </aside>
  );
}
