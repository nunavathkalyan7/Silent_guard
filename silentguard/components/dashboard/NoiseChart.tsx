"use client";

import Card from "@/components/ui/Card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ],

  datasets: [
    {
      label: "Noise Level (dB)",

      data: [52, 61, 74, 69, 81, 76, 88, 72],

      borderColor: "#2563eb",

      backgroundColor: "rgba(37,99,235,0.15)",

      fill: true,

      tension: 0.4,

      pointRadius: 5,

      pointBackgroundColor: "#2563eb",
    },
  ],
};

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      beginAtZero: true,

      title: {
        display: true,
        text: "Noise (dB)",
      },
    },

    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
  },
};

export default function NoiseChart() {
  return (
    <Card title="Noise Level Trend">
      <div className="h-[360px]">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}