import {
  Cpu,
  Activity,
  Wifi,
  BatteryCharging,
} from "lucide-react";

const sensors = [
  {
    id: "RPI-001",
    location: "Hospital Road",
    status: "Online",
    battery: "96%",
    signal: "Strong",
    color: "bg-green-500",
  },
  {
    id: "RPI-002",
    location: "School Zone",
    status: "Online",
    battery: "90%",
    signal: "Strong",
    color: "bg-green-500",
  },
  {
    id: "RPI-003",
    location: "Market Area",
    status: "Busy",
    battery: "73%",
    signal: "Medium",
    color: "bg-yellow-500",
  },
  {
    id: "RPI-004",
    location: "Industrial Area",
    status: "Offline",
    battery: "18%",
    signal: "Weak",
    color: "bg-red-500",
  },
];

export default function SensorStatus() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Sensor Status
        </h2>

        <Cpu className="text-blue-600" />
      </div>

      <div className="space-y-4">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="rounded-xl border border-slate-200 p-4 transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">
                  {sensor.id}
                </h3>

                <p className="text-sm text-slate-500">
                  {sensor.location}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${sensor.color}`}
                />

                <span className="text-sm font-medium">
                  {sensor.status}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BatteryCharging
                  size={16}
                  className="text-green-600"
                />

                <span>{sensor.battery}</span>
              </div>

              <div className="flex items-center gap-2">
                <Wifi
                  size={16}
                  className="text-blue-600"
                />

                <span>{sensor.signal}</span>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Activity
                  size={16}
                  className="text-orange-500"
                />

                <span>
                  Last update:{" "}
                  <strong>10 seconds ago</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}