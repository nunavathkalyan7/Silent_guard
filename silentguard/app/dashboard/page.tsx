import {
  Volume2,
  TriangleAlert,
  RadioTower,
  Activity,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import NoiseChart from "@/components/dashboard/NoiseChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AlertTable from "@/components/dashboard/AlertTable";
import SensorStatus from "@/components/dashboard/SensorStatus";

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          SilentGuard Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Real-time Noise Pollution Monitoring System
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Average Noise"
          value="72 dB"
          icon={<Volume2 size={26} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Maximum Noise"
          value="98 dB"
          icon={<TriangleAlert size={26} />}
          color="bg-red-500"
        />

        <StatCard
          title="Active Raspberry Pis"
          value="4"
          icon={<RadioTower size={26} />}
          color="bg-green-600"
        />

        <StatCard
          title="Alerts Today"
          value="15"
          icon={<Activity size={26} />}
          color="bg-yellow-500"
        />
      </section>

      {/* Chart + Map */}
    <section className="grid gap-6 xl:grid-cols-2">
  <NoiseChart />
  <RecentActivity />
</section>

      {/* Alerts + Status */}
      <section className="grid gap-6 xl:grid-cols-2">
        <AlertTable />
        <SensorStatus />
      </section>
    </main>
  );
}