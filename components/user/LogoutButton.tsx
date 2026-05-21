"use client";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      window.location.href = "/auth/login";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-lg
      bg-orange-500
      px-4
      py-2
      font-medium
      text-white
      transition
      duration-200
      hover:bg-orange-600
      active:scale-[0.98]
    "
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}
