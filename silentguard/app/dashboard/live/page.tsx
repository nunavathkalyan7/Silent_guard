"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { API_URL, getReadings } from "../../lib/api";


// ==========================================
// TYPES
// ==========================================

type Sensor = {
  id: number;
  name: string;
  location: string;
  status: string;
  current_noise: number;
};

type Reading = {
  id: number;
  sensor_id: number;
  noise_level: number;
  recorded_at: string;
};


// ==========================================
// LIVE PAGE
// ==========================================

export default function LivePage() {

  const [sensors, setSensors] = useState<Sensor[]>([]);

  const [selectedSensor, setSelectedSensor] =
    useState<number | null>(null);

  const [readings, setReadings] =
    useState<Reading[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================
  // GET SENSORS
  // ==========================================

  async function loadSensors() {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/sensors/`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          cache: "no-store",
        }
      );


      if (!response.ok) {

        const errorData =
          await response.text();

        console.error(
          "Sensors API error:",
          response.status,
          errorData
        );

        throw new Error(
          "Failed to load sensors"
        );
      }


      const data: Sensor[] =
        await response.json();


      setSensors(data);


      // Automatically select first sensor

      if (
        data.length > 0 &&
        selectedSensor === null
      ) {
        setSelectedSensor(data[0].id);
      }

    } catch (error) {

      console.error(
        "Failed to load sensors:",
        error
      );

      setError(
        "Failed to load sensors"
      );
    }
  }


  // ==========================================
  // GET READINGS
  // ==========================================

  async function loadReadings(
    sensorId: number
  ) {

    try {

      console.log(
        "Loading readings for sensor:",
        sensorId
      );


      const data: Reading[] =
        await getReadings(sensorId);


      console.log(
        "Readings received:",
        data
      );


      setReadings(data);

      setError("");

    } catch (error) {

      console.error(
        "Failed to load readings:",
        error
      );

      setError(
        "Failed to load readings"
      );

    } finally {

      setLoading(false);
    }
  }


  // ==========================================
  // LOAD SENSORS ON PAGE LOAD
  // ==========================================

  useEffect(() => {

    loadSensors();

  }, []);


  // ==========================================
  // LOAD READINGS
  // AND REFRESH EVERY 5 SECONDS
  // ==========================================

  useEffect(() => {

    if (selectedSensor === null) {
      return;
    }


    // Load immediately

    loadReadings(selectedSensor);


    // Refresh every 5 seconds

    const interval = setInterval(() => {

      console.log(
        "Refreshing readings..."
      );

      loadReadings(selectedSensor);

    }, 5000);


    // Cleanup interval

    return () => {

      clearInterval(interval);

    };

  }, [selectedSensor]);


  // ==========================================
  // PREPARE CHART DATA
  // ==========================================

  const chartData = readings.map(
    (reading) => ({

      time: new Date(
        reading.recorded_at
      ).toLocaleTimeString(),

      noise: reading.noise_level,

    })
  );


  // ==========================================
  // CURRENT NOISE
  // ==========================================

  const currentNoise =
    readings.length > 0
      ? readings[
          readings.length - 1
        ].noise_level
      : 0;


  // ==========================================
  // SELECTED SENSOR
  // ==========================================

  const currentSensor =
    sensors.find(
      (sensor) =>
        sensor.id === selectedSensor
    );


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="space-y-6">


      {/* ======================================
          HEADER
      ====================================== */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Live Monitoring
        </h1>

        <p className="mt-2 text-slate-600">
          Monitor real-time noise levels from
          your sensors.
        </p>

      </div>


      {/* ======================================
          SENSOR SELECTOR
      ====================================== */}

      <div className="rounded-2xl bg-white p-6 shadow-md">

        <label className="mb-2 block font-semibold text-slate-700">

          Select Sensor

        </label>


        <select

          value={
            selectedSensor ?? ""
          }

          onChange={(e) => {

            const value =
              Number(e.target.value);

            setSelectedSensor(value);

            // Reset readings when
            // changing sensor

            setReadings([]);

            setLoading(true);

          }}

          className="w-full max-w-md rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"

        >

          {sensors.length === 0 ? (

            <option value="">

              No sensors available

            </option>

          ) : (

            sensors.map(
              (sensor) => (

                <option
                  key={sensor.id}
                  value={sensor.id}
                >

                  {sensor.name}
                  {" — "}
                  {sensor.location}

                </option>

              )
            )

          )}

        </select>

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="rounded-lg bg-red-50 p-4 text-red-600">

          {error}

        </div>

      )}


      {/* ======================================
          SENSOR CARDS
      ====================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">


        {/* CURRENT NOISE */}

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <p className="text-sm text-slate-500">

            Current Noise

          </p>

          <p className="mt-2 text-4xl font-bold text-blue-600">

            {readings.length > 0
              ? `${currentNoise} dB`
              : "--"}

          </p>

        </div>


        {/* TOTAL READINGS */}

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <p className="text-sm text-slate-500">

            Total Readings

          </p>

          <p className="mt-2 text-4xl font-bold text-slate-900">

            {readings.length}

          </p>

        </div>


        {/* SENSOR */}

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <p className="text-sm text-slate-500">

            Sensor

          </p>


          <p className="mt-2 text-2xl font-bold text-slate-900">

            {currentSensor
              ? currentSensor.name
              : "--"}

          </p>


          {currentSensor && (

            <p className="mt-1 text-sm text-slate-500">

              {currentSensor.location}

            </p>

          )}

        </div>

      </div>


      {/* ======================================
          GRAPH
      ====================================== */}

      <div className="rounded-2xl bg-white p-6 shadow-md">


        <div className="mb-6">

          <h2 className="text-xl font-bold text-slate-900">

            Noise Level

          </h2>

          <p className="text-sm text-slate-500">

            Live noise readings

          </p>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="flex h-80 items-center justify-center text-slate-500">

            Loading readings...

          </div>

        ) : readings.length === 0 ? (

          /* NO READINGS */

          <div className="flex h-80 items-center justify-center text-slate-500">

            No readings available for this sensor.

          </div>

        ) : (

          /* CHART */

          <div className="h-80 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart

                data={chartData}

                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}

              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />


                <XAxis
                  dataKey="time"
                />


                <YAxis

                  domain={[
                    "auto",
                    "auto",
                  ]}

                  label={{
                    value: "dB",
                    angle: -90,
                    position: "insideLeft",
                  }}

                />


                <Tooltip />


                <Line

                  type="monotone"

                  dataKey="noise"

                  strokeWidth={3}

                  dot={false}

                  isAnimationActive={false}

                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </div>

  );
}