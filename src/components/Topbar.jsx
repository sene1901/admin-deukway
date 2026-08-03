import { Search, Bell } from "lucide-react";

export default function Topbar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-parchment">
      <div>
        <h1 className="font-display text-2xl tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="text-sm text-ink/50 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35"
          />
          <input
            type="text"
            placeholder="Rechercher…"
            className="pl-9 pr-3 py-2 w-56 rounded-full bg-sand-dim text-sm placeholder:text-ink/35 border border-transparent focus:border-terracotta/40 focus:outline-none transition-colors"
          />
        </div>
        <button className="relative h-9 w-9 rounded-full bg-sand-dim flex items-center justify-center hover:bg-parchment transition-colors">
          <Bell size={16} className="text-ink/60" />
          <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-terracotta" />
        </button>
      </div>
    </header>
  );
}