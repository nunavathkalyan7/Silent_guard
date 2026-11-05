"use client";

import {
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-slate-600">
          View and update your administrator information.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
              <User className="h-16 w-16 text-blue-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Administrator
            </h2>

            <p className="text-slate-500">
              admin@silentguard.com
            </p>

            <span className="mt-4 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
              Active
            </span>
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Personal Information
            </h2>

            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              <Pencil size={18} />
              Edit
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              icon={<User size={18} />}
              title="Full Name"
              value="Administrator"
            />

            <InfoCard
              icon={<Mail size={18} />}
              title="Email"
              value="admin@silentguard.com"
            />

            <InfoCard
              icon={<Phone size={18} />}
              title="Phone"
              value="+91 9876543210"
            />

            <InfoCard
              icon={<Building2 size={18} />}
              title="Organization"
              value="SilentGuard"
            />

            <InfoCard
              icon={<ShieldCheck size={18} />}
              title="Role"
              value="System Administrator"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="mb-3 flex items-center gap-2 text-blue-600">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <p className="text-lg font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}