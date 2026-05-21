"use client";

import { useEffect, useState } from "react";
import UserForm from "@/components/user/UserForm";
import UserCard from "@/components/user/UserCard";

type User = {
  id: number;
  email: string;
  role: string;
};
export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [editingId, setEditingId] = useState<number | null>(null);
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/user");
    const data = await res.json();
    setUsers(data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    // validasi input
    if (!email || !password || !role) {
      return alert("Semua field wajib diisi");
    }

    // validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return alert("Format email tidak valid");
    }

    // validasi password
    if (password.length < 6) {
      return alert("Password minimal 6 karakter");
    }

    // validasi role
    const allowedRoles = ["ADMIN", "KASIR", "KITCHEN"];

    if (!allowedRoles.includes(role)) {
      return alert("Role tidak valid");
    }

    try {
      const res = await fetch("/api/admin/user", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      // validasi response
      if (!res.ok) {
        return alert(data.error);
      }

      // reset form
      setEmail("");

      setPassword("");

      setRole("ADMIN");

      // refetch users
      fetchUsers();

      alert("User berhasil ditambahkan");
    } catch (error) {
      console.log(error);

      alert("Terjadi kesalahan saat menambahkan user");
    }
  };

  const handleEdit = (user: User) => {
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
    setEditingId(user.id);
  };

  const handleUpdate = async () => {
    // validasi input
    if (!email || !role) {
      return alert("Email dan role wajib diisi");
    }

    // validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return alert("Format email tidak valid");
    }

    // validasi role
    const allowedRoles = ["ADMIN", "KASIR", "KITCHEN"];

    if (!allowedRoles.includes(role)) {
      return alert("Role tidak valid");
    }

    try {
      const res = await fetch(`/api/admin/user/${editingId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      // validasi response
      if (!res.ok) {
        return alert(data.error);
      }

      //reset form
      setEmail("");

      setPassword("");

      setRole("ADMIN");

      setEditingId(null);

      // refetch users
      fetchUsers();

      alert("User berhasil diupdate");
    } catch (error) {
      console.log(error);

      alert("Terjadi kesalahan saat update user");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      return;
    }

    // cek user yang akan dihapus
    const selectedUser = users.find((u) => u.id === id);

    // cek jika user yang akan dihapus adalah admin terakhir
    const adminCount = users.filter((u) => u.role === "ADMIN").length;

    if (selectedUser?.role === "ADMIN" && adminCount === 1) {
      return alert("Tidak boleh menghapus admin terakhir");
    }

    try {
      const res = await fetch(`/api/admin/user/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.error);
      }

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

        <p className="text-gray-500 mt-1">Kelola akun user restaurant</p>
      </div>

      {/* FORM */}
      <UserForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        onSubmit={editingId ? handleUpdate : handleCreate}
        isEdit={!!editingId}
      />

      {/* USER LIST */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
