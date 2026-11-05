"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  Clock,
} from "lucide-react";

const alerts = [
  {
    id: "ALT-001",
    sensor: "RPI-003",
    location: "Market Area",
    noise: "91 dB",
    severity: "Critical",
    time: "2 min ago",
    status: "Pending",
  },
  {
    id: "ALT-002",
    sensor: "RPI-004",
    location: "Industrial Area",
    noise: "82 dB",
    severity: "Warning",
    time: "10 min ago",
    status: "Pending",
  },
  {
    id: "ALT-003",
    sensor: "RPI-002",
    location: "School Zone",
    noise: "68 dB",
    severity: "Normal",
    time: "35 min ago",
    status: "Resolved",
  },
  {
    id: "ALT-004",
    sensor: "RPI-001",
    location: "Hospital Road",
    noise: "74 dB",
    severity: "Warning",
    time: "1 hour ago",
    status: "Resolved",
  },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState("All");

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((a) => a.severity === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Alerts
          </h1>

          <p className="mt-2 text-slate-600">
            Monitor and manage all noise alerts.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700">
          <CheckCircle size={18} />
          Resolve Selected
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex max-w-md items-center rounded-xl border bg-white px-4 py-3">
          <Search size={18} className="text-slate-400" />

          <input
            placeholder="Search alerts..."
            className="ml-3 w-full outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter size={18} />

          <select
            className="rounded-lg border px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Critical</option>
            <option>Warning</option>
            <option>Normal</option>
          </select>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-md">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4">Alert ID</th>
              <th className="px-6 py-4">Sensor</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Noise</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAlerts.map((alert) => (
              <tr
                key={alert.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-semibold">
                  {alert.id}
                </td>

                <td className="px-6 py-5">
                  {alert.sensor}
                </td>

                <td className="px-6 py-5">
                  {alert.location}
                </td>

                <td className="px-6 py-5">
                  {alert.noise}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      alert.severity === "Critical"
                        ? "bg-red-100 text-red-600"
                        : alert.severity === "Warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} />
                      {alert.severity}
                    </div>
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {alert.time}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      alert.status === "Resolved"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {alert.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}