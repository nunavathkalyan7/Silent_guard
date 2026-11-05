"use client";

import { Bell, Search, UserCircle2, CalendarDays } from "lucide-react";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden items-center rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 md:flex">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search sensors..."
            className="ml-2 w-64 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Live Status */}
        <div className="hidden items-center gap-2 rounded-full bg-green-100 px-4 py-2 md:flex">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-600" />

          <span className="text-sm font-medium text-green-700">
            Live
          </span>
        </div>

        {/* Notifications */}
        <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">
          <Bell size={22} className="text-slate-700" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2">
          <UserCircle2 size={42} className="text-blue-600" />

          <div className="hidden lg:block">
            <p className="font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-sm text-slate-500">
              admin@silentguard.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}