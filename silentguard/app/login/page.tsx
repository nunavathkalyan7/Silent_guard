"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // FastAPI OAuth2PasswordRequestForm
      // expects form-urlencoded data

      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: formData.toString(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // FastAPI validation errors
        if (Array.isArray(data.detail)) {
          const message = data.detail
            .map(
              (item: any) => item.msg
            )
            .join(", ");

          setError(message);
        }

        // Normal FastAPI error
        else if (
          typeof data.detail === "string"
        ) {
          setError(data.detail);
        }

        else {
          setError("Login failed");
        }

        return;
      }

      // Save JWT
      localStorage.setItem(
        "token",
        data.access_token
      );

      // Go to dashboard
      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      setError("Server error");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >

        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          SilentGuard Login
        </h1>


        {/* EMAIL */}

        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />


        {/* PASSWORD */}

        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />


        {/* ERROR */}

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-500">
            {error}
          </p>
        )}


        {/* LOGIN BUTTON */}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

    </div>
  );
}