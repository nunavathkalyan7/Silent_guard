"use client";

import {
  Cpu,
  Plus,
  Search,
  Wifi,
  BatteryCharging,
  MapPin,
  SquarePen,
  Trash2,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getSensors,
  createSensor,
  updateSensor,
  deleteSensor,
} from "../../lib/api";


// ==========================================
// SENSOR TYPE
// ==========================================

type Sensor = {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  current_noise: number;
  created_at: string;
};


// ==========================================
// PAGE
// ==========================================

export default function SensorsPage() {

  const [sensors, setSensors] = useState<Sensor[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // MODAL
  // ==========================================

  const [showModal, setShowModal] = useState(false);

  const [editingSensor, setEditingSensor] =
    useState<Sensor | null>(null);


  // ==========================================
  // FORM
  // ==========================================

  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [status, setStatus] = useState("Offline");

  const [currentNoise, setCurrentNoise] = useState("0");

  const [saving, setSaving] = useState(false);


  // ==========================================
  // GET SENSORS
  // ==========================================

  async function loadSensors() {

    try {

      setLoading(true);

      setError("");

      const data = await getSensors();

      setSensors(data);

    } catch (err) {

      console.error(err);

      setError("Failed to load sensors");

    } finally {

      setLoading(false);

    }
  }


  // Load sensors when page opens

  useEffect(() => {

    loadSensors();

  }, []);


  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  function openAddModal() {

    setEditingSensor(null);

    setName("");

    setLocation("");

    setLatitude("");

    setLongitude("");

    setStatus("Offline");

    setCurrentNoise("0");

    setShowModal(true);

  }


  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  function openEditModal(sensor: Sensor) {

    setEditingSensor(sensor);

    setName(sensor.name);

    setLocation(sensor.location);

    setLatitude(String(sensor.latitude));

    setLongitude(String(sensor.longitude));

    setStatus(sensor.status);

    setCurrentNoise(String(sensor.current_noise));

    setShowModal(true);

  }


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  function closeModal() {

    if (saving) return;

    setShowModal(false);

  }


  // ==========================================
  // SAVE SENSOR
  // ==========================================

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setSaving(true);

      setError("");


      // ==============================
      // EDIT
      // ==============================

      if (editingSensor) {

        await updateSensor(
          editingSensor.id,
          {
            name: name,
            location: location,
            latitude: Number(latitude),
            longitude: Number(longitude),
            status: status,
            current_noise: Number(currentNoise),
          }
        );

      }

      // ==============================
      // CREATE
      // ==============================

      else {

        await createSensor({
          name: name,
          location: location,
          latitude: Number(latitude),
          longitude: Number(longitude),
        });

      }


      // Refresh data from database

      await loadSensors();

      setShowModal(false);

    } catch (err) {

      console.error(err);

      setError(
        editingSensor
          ? "Failed to update sensor"
          : "Failed to create sensor"
      );

    } finally {

      setSaving(false);

    }

  }


  // ==========================================
  // DELETE SENSOR
  // ==========================================

  async function handleDelete(
    sensor: Sensor
  ) {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${sensor.name}?`
    );

    if (!confirmed) return;


    try {

      setError("");

      await deleteSensor(sensor.id);

      // Remove immediately from UI

      setSensors((current) =>
        current.filter(
          (item) => item.id !== sensor.id
        )
      );

    } catch (err) {

      console.error(err);

      setError("Failed to delete sensor");

    }

  }


  // ==========================================
  // SEARCH
  // ==========================================

  const filteredSensors = sensors.filter(
    (sensor) => {

      const value =
        search.toLowerCase();

      return (
        sensor.name
          .toLowerCase()
          .includes(value) ||

        sensor.location
          .toLowerCase()
          .includes(value) ||

        sensor.status
          .toLowerCase()
          .includes(value)
      );

    }
  );


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="space-y-6">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Sensors
          </h1>

          <p className="mt-2 text-slate-600">
            Manage all Raspberry Pi monitoring devices.
          </p>

        </div>


        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >

          <Plus size={18} />

          Add Sensor

        </button>

      </div>


      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (

  <div className="rounded-xl bg-red-50 px-4 py-3 text-red-600">

    {String(error)}

  </div>

)}


      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <div className="flex max-w-md items-center rounded-xl border border-slate-300 bg-white px-4 py-3">

        <Search
          className="text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search sensor..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="ml-3 w-full bg-transparent outline-none"
        />

      </div>


      {/* ================================= */}
      {/* TABLE */}
      {/* ================================= */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-md">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left text-sm text-slate-600">

              <th className="px-6 py-4">
                Sensor
              </th>

              <th className="px-6 py-4">
                Location
              </th>

              <th className="px-6 py-4">
                IP Address
              </th>

              <th className="px-6 py-4">
                Battery
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {/* LOADING */}

            {loading && (

              <tr>

                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-500"
                >

                  Loading sensors...

                </td>

              </tr>

            )}


            {/* NO SENSORS */}

            {!loading &&
              filteredSensors.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-slate-500"
                  >

                    No sensors found.

                  </td>

                </tr>

              )}


            {/* SENSOR ROWS */}

            {!loading &&
              filteredSensors.map((sensor) => (

                <tr
                  key={sensor.id}
                  className="border-t hover:bg-slate-50"
                >

                  {/* SENSOR */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <Cpu className="text-blue-600" />

                      <div>

                        <span className="font-semibold">

                          {sensor.name}

                        </span>

                        <p className="text-xs text-slate-400">

                          RPI-
                          {String(sensor.id).padStart(
                            3,
                            "0"
                          )}

                        </p>

                      </div>

                    </div>

                  </td>


                  {/* LOCATION */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <MapPin size={16} />

                      {sensor.location}

                    </div>

                  </td>


                  {/* IP */}

                  <td className="px-6 py-5 text-slate-400">

                    —

                  </td>


                  {/* BATTERY */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-slate-400">

                      <BatteryCharging
                        size={18}
                      />

                      —

                    </div>

                  </td>


                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                        sensor.status === "Online"
                          ? "bg-green-100 text-green-600"
                          : sensor.status === "Warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >

                      <Wifi size={14} />

                      {sensor.status}

                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div className="flex gap-3">

                      {/* EDIT */}

                      <button
                        onClick={() =>
                          openEditModal(sensor)
                        }
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                      >

                        <SquarePen size={18} />

                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDelete(sensor)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>


      {/* ================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            {/* MODAL HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  {editingSensor
                    ? "Edit Sensor"
                    : "Add Sensor"}

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  {editingSensor
                    ? "Update sensor information."
                    : "Add a new Raspberry Pi sensor."}

                </p>

              </div>


              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">

                  Sensor Name

                </label>

                <input
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Main Gate Sensor"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>


              {/* LOCATION */}

              <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">

                  Location

                </label>

                <input
                  required
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="IIT BHU Main Gate"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>


              {/* LATITUDE / LONGITUDE */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-1 block text-sm font-medium text-slate-700">

                    Latitude

                  </label>

                  <input
                    required
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) =>
                      setLatitude(e.target.value)
                    }
                    placeholder="25.267"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-1 block text-sm font-medium text-slate-700">

                    Longitude

                  </label>

                  <input
                    required
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) =>
                      setLongitude(e.target.value)
                    }
                    placeholder="82.991"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

              </div>


              {/* EDIT-ONLY FIELDS */}

              {editingSensor && (

                <>

                  <div>

                    <label className="mb-1 block text-sm font-medium text-slate-700">

                      Status

                    </label>

                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    >

                      <option value="Online">
                        Online
                      </option>

                      <option value="Offline">
                        Offline
                      </option>

                      <option value="Warning">
                        Warning
                      </option>

                    </select>

                  </div>


                  <div>

                    <label className="mb-1 block text-sm font-medium text-slate-700">

                      Current Noise (dB)

                    </label>

                    <input
                      type="number"
                      step="0.1"
                      value={currentNoise}
                      onChange={(e) =>
                        setCurrentNoise(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>

                </>

              )}


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >

                  {saving
                    ? "Saving..."
                    : editingSensor
                    ? "Update Sensor"
                    : "Add Sensor"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}