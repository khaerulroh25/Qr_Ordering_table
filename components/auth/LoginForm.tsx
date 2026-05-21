"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  type UserRole = "ADMIN" | "KITCHEN" | "KASIR";

  const roleRedirect: Record<UserRole, string> = {
    ADMIN: "/admin/dashboard",
    KITCHEN: "/kitchen",
    KASIR: "/kasir/dashboard",
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const role = data.user.role as UserRole;

        const redirectPath = roleRedirect[role];

        if (redirectPath) {
          window.location.href = redirectPath;
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white">
            <LogIn size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">Login</h1>

          <p className="mt-2 text-sm text-gray-500">
            Login ke QR Ordering System
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full rounded-lg border border-gray-300
              p-3 outline-none transition
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-200
            "
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full rounded-lg border border-gray-300
              p-3 outline-none transition
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-200
            "
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="
              w-full rounded-lg bg-blue-500
              py-3 font-medium text-white
              transition hover:bg-blue-600
              active:scale-[0.98]
            "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
