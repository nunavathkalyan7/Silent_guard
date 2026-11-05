"use client";

import {
  Bell,
  Lock,
  Save,
  User,
  Volume2,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your account, notifications and system configuration.
        </p>
      </section>

      {/* Profile */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <User className="text-blue-600" />
          <h2 className="text-xl font-semibold">
            Administrator Profile
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Administrator"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              defaultValue="admin@silentguard.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Noise Threshold */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Volume2 className="text-red-500" />
          <h2 className="text-xl font-semibold">
            Noise Threshold
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Normal (dB)
            </label>

            <input
              type="number"
              defaultValue={70}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Warning (dB)
            </label>

            <input
              type="number"
              defaultValue={85}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Critical (dB)
            </label>

            <input
              type="number"
              defaultValue={95}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="text-yellow-500" />
          <h2 className="text-xl font-semibold">
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <span>Email Notifications</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <span>SMS Notifications</span>

            <input
              type="checkbox"
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <span>Critical Alerts Only</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>
        </div>
      </section>

      {/* Change Password */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="text-green-600" />
          <h2 className="text-xl font-semibold">
            Change Password
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <input
            type="password"
            placeholder="Current Password"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="New Password"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}