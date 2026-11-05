"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";
import { BellRing } from "lucide-react";
import {
  LayoutDashboard,
  Map,
  Cpu,
  Bell,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
  title: "Notifications",
  href: "/dashboard/notifications",
  icon: BellRing,
},
  {
  title: "Profile",
  href: "/dashboard/profile",
  icon: UserCircle,
},
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Live Monitoring",
    href: "/dashboard/live",
    icon: Map,
  },
  {
    title: "Sensors",
    href: "/dashboard/sensors",
    icon: Cpu,
  },
  {
    title: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
        <div className="rounded-xl bg-blue-600 p-3">
          <ShieldCheck size={28} />
        </div>

        <div>
          <h1 className="text-xl font-bold">SilentGuard</h1>
          <p className="text-xs text-slate-400">
            Noise Monitoring System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}