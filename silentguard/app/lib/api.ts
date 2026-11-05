const API_URL = "http://127.0.0.1:8000";

export { API_URL };


// ==========================================
// GET TOKEN
// ==========================================

function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}


// ==========================================
// HANDLE RESPONSE
// ==========================================

async function handleResponse(response: Response) {

  const data = await response.json();

  if (response.ok) {
    return data;
  }


  // FastAPI validation errors

  if (Array.isArray(data.detail)) {

    const message = data.detail
      .map((error: any) => error.msg)
      .join(", ");

    throw new Error(message);
  }


  // Normal FastAPI error

  if (typeof data.detail === "string") {
    throw new Error(data.detail);
  }


  throw new Error("Request failed");
}


// ==========================================
// GET SENSORS
// ==========================================

export async function getSensors() {

  const token = getToken();

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

  return handleResponse(response);
}


// ==========================================
// CREATE SENSOR
// ==========================================

export async function createSensor(
  sensor: {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
  }
) {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/sensors/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(sensor),
    }
  );

  return handleResponse(response);
}


// ==========================================
// UPDATE SENSOR
// ==========================================

export async function updateSensor(
  id: number,
  sensor: {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    status: string;
    current_noise: number;
  }
) {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/sensors/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(sensor),
    }
  );

  return handleResponse(response);
}


// ==========================================
// DELETE SENSOR
// ==========================================

export async function deleteSensor(
  id: number
) {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/sensors/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );

  return handleResponse(response);
}


// ==========================================
// GET READINGS
// ==========================================

export async function getReadings(
  sensorId: number
) {

  const token = getToken();

  const response = await fetch(
    `${API_URL}/readings/${sensorId}?t=${Date.now()}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );


  const data = await response.json();


  if (!response.ok) {

    console.error(
      "Readings API error:",
      response.status,
      data
    );


    if (
      Array.isArray(data.detail)
    ) {

      const message = data.detail
        .map(
          (error: any) =>
            error.msg
        )
        .join(", ");

      throw new Error(message);
    }


    if (
      typeof data.detail === "string"
    ) {

      throw new Error(
        data.detail
      );
    }


    throw new Error(
      "Failed to load readings"
    );
  }


  return data;
}