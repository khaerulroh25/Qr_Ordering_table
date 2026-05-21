"use client";

import { useEffect, useState } from "react";
import TableForm from "@/components/table/TableForm";
import TableCard from "@/components/table/TableCard";

type Table = {
  id: number;
  number: number;
  qrUrl: string;
};

export default function TablePage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [number, setNumber] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTables = async () => {
    const res = await fetch("/api/admin/table");
    const data = await res.json();
    setTables(data.data);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleCreate = async () => {
    if (!number) return alert("Nomor meja wajib diisi");

    await fetch("/api/admin/table", {
      method: "POST",
      body: JSON.stringify({
        number: Number(number),
      }),
    });

    setNumber("");
    fetchTables();
  };

  // EDIT TABLE
  const handleEdit = (table: Table) => {
    setEditingId(table.id);

    setNumber(String(table.number));
  };

  // UPDATE TABLE
  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/table/${editingId}`, {
        method: "PUT",

        body: JSON.stringify({
          number: Number(number),
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      // RESET
      setEditingId(null);

      setNumber("");

      fetchTables();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TABLE
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus meja?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/table/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      fetchTables();
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Table Management</h1>

        <p className="text-gray-500 mt-1">Kelola meja restaurant</p>
      </div>

      {/* FORM */}
      <TableForm
        number={number}
        setNumber={setNumber}
        onSubmit={editingId ? handleUpdate : handleCreate}
        isEdit={!!editingId}
      />

      {/* TABLE LIST */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onCopy={copyLink}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
