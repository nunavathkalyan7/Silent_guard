"use client";

import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "Critical",
    title: "Noise threshold exceeded",
    message: "Market Area sensor reported 95 dB.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "Warning",
    title: "High noise detected",
    message: "Industrial Area reached 82 dB.",
    time: "12 min ago",
    read: false,
  },
  {
    id: 3,
    type: "Info",
    title: "Sensor Connected",
    message: "RPI-002 is back online.",
    time: "1 hour ago",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="mt-2 text-slate-600">
            View all system notifications.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          <CheckCircle2 size={18} />
          Mark All Read
        </button>
      </div>

      <div className="space-y-5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="flex gap-4">
              <div
                className={`rounded-full p-3 ${
                  item.type === "Critical"
                    ? "bg-red-100"
                    : item.type === "Warning"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >
                {item.type === "Critical" ? (
                  <AlertTriangle className="text-red-600" />
                ) : item.type === "Warning" ? (
                  <Bell className="text-yellow-600" />
                ) : (
                  <Info className="text-blue-600" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="mt-1 text-slate-600">
                  {item.message}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {item.time}
                </p>
              </div>
            </div>

            <button className="rounded-lg p-2 text-red-500 hover:bg-red-50">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}