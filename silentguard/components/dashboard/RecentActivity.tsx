import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  RadioTower,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <AlertTriangle size={18} className="text-red-500" />,
    title: "High noise detected",
    description: "RPI-003 recorded 91 dB at Market Area.",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: <Bell size={18} className="text-yellow-500" />,
    title: "Warning alert",
    description: "Industrial Area exceeded safe noise level.",
    time: "10 min ago",
  },
  {
    id: 3,
    icon: <RadioTower size={18} className="text-blue-500" />,
    title: "Sensor connected",
    description: "RPI-005 came online successfully.",
    time: "30 min ago",
  },
  {
    id: 4,
    icon: <CheckCircle2 size={18} className="text-green-500" />,
    title: "System healthy",
    description: "All monitoring services are operational.",
    time: "1 hour ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
          Live
        </span>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >
            <div className="mt-1">{activity.icon}</div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {activity.description}
              </p>
            </div>

            <span className="text-xs text-slate-400 whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}