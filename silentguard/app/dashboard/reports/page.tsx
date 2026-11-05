"use client";

import {
  Download,
  Calendar,
  TrendingUp,
  Volume2,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-slate-600">
            Analyze historical noise pollution data and export reports.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="text-blue-600" />

          <input
            type="date"
            className="rounded-lg border px-4 py-2"
          />

          <span className="font-medium">to</span>

          <input
            type="date"
            className="rounded-lg border px-4 py-2"
          />
        </div>

        <select className="rounded-lg border px-4 py-2">
          <option>Daily Report</option>
          <option>Weekly Report</option>
          <option>Monthly Report</option>
          <option>Yearly Report</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <Volume2 className="text-blue-600" size={28} />

          <p className="mt-4 text-sm text-slate-500">
            Average Noise
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            71 dB
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <TrendingUp className="text-green-600" size={28} />

          <p className="mt-4 text-sm text-slate-500">
            Maximum Noise
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            98 dB
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <AlertTriangle className="text-red-600" size={28} />

          <p className="mt-4 text-sm text-slate-500">
            Critical Alerts
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            42
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <BarChart3 className="text-yellow-600" size={28} />

          <p className="mt-4 text-sm text-slate-500">
            Total Readings
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            18,524
          </h2>
        </div>
      </div>

      {/* Report Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-md">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            Generated Reports
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4">Report</th>
              <th className="px-6 py-4">Generated On</th>
              <th className="px-6 py-4">Period</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {[
              {
                name: "Daily Report",
                date: "24 Jul 2026",
                period: "1 Day",
                status: "Ready",
              },
              {
                name: "Weekly Report",
                date: "20 Jul 2026",
                period: "7 Days",
                status: "Ready",
              },
              {
                name: "Monthly Report",
                date: "01 Jul 2026",
                period: "30 Days",
                status: "Ready",
              },
            ].map((report) => (
              <tr
                key={report.name}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-semibold">
                  {report.name}
                </td>

                <td className="px-6 py-5">
                  {report.date}
                </td>

                <td className="px-6 py-5">
                  {report.period}
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                    {report.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <button className="rounded-lg bg-blue-100 px-4 py-2 text-blue-600 transition hover:bg-blue-200">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}