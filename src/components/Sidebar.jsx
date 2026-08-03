import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Building2,
  Wallet,
  ShieldAlert,
} from "lucide-react";
import deukwayicon from "../assets/deukway-icon.png";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/utilisateurs", label: "Utilisateurs", icon: Users },
  { to: "/annonces", label: "Annonces", icon: Building2 },
  { to: "/paiements", label: "Paiements", icon: Wallet },
  { to: "/litiges", label: "Litiges", icon: ShieldAlert },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-ink text-sand flex flex-col h-screen sticky top-0">
      <div className="px-6 pt-8 pb-6 flex items-center gap-3">
        <img
          src={deukwayicon}
          alt="Deukway"
          className="h-9 w-9 rounded-xl shrink-0 object-contain"
        />
        <div>
          <p className="font-display text-lg leading-none tracking-tight">Deukway</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-sand/40 mt-1">
            Espace Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#1f7a4d] text-white"
                  : "text-sand/55 hover:text-white hover:bg-[#1f7a4d]/25"
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-#16a34a flex items-center justify-center font-display text-sm text-white">
            SS
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Sadio Sene</p>
            <p className="text-[11px] text-sand/45">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}