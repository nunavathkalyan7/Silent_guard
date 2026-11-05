import {
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const alerts = [
  {
    id: "ALT-001",
    sensor: "RPI-003",
    location: "Market Area",
    noise: "91 dB",
    status: "Critical",
    time: "2 min ago",
  },
  {
    id: "ALT-002",
    sensor: "RPI-004",
    location: "Industrial Area",
    noise: "82 dB",
    status: "Warning",
    time: "15 min ago",
  },
  {
    id: "ALT-003",
    sensor: "RPI-002",
    location: "School Zone",
    noise: "67 dB",
    status: "Normal",
    time: "35 min ago",
  },
];

const badge = (status: string) => {
  switch (status) {
    case "Critical":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
          Critical
        </span>
      );

    case "Warning":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Warning
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
          Normal
        </span>
      );
  }
};

export default function AlertTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Alerts
        </h2>

        <AlertTriangle className="text-red-500" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-sm text-slate-500">
              <th className="pb-3">Sensor</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Noise</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                className="border-b last:border-none hover:bg-slate-50"
              >
                <td className="py-4 font-semibold">
                  {alert.sensor}
                </td>

                <td>{alert.location}</td>

                <td>{alert.noise}</td>

                <td>{badge(alert.status)}</td>

                <td>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={15} />
                    {alert.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center gap-2 text-green-600">
        <CheckCircle2 size={18} />
        <span className="text-sm font-medium">
          Monitoring system is running normally.
        </span>
      </div>
    </div>
  );
}