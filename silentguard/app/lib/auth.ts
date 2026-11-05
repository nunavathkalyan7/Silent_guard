const API_URL = "http://127.0.0.1:8000";

export function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export async function getProfile() {
  const token = getToken();

  if (!token) return null;

  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}