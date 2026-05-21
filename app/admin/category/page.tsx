"use client";
import CategoryForm from "@/components/category/CategoryForm";
import CategoryCard from "@/components/category/CategoryCard";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};
export default function CategoryPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/category");
    const data = await res.json();
    setCategories(data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name) return alert("Nama wajib diisi");

    await fetch("/api/admin/category", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchCategories();
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/category/${editingId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }
      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus category?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/category/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Category Management
        </h1>

        <p className="text-gray-500 mt-1">Kelola category menu</p>
      </div>
      <CategoryForm
        name={name}
        setName={setName}
        onSubmit={editingId ? handleUpdate : handleCreate}
        isEdit={!!editingId}
      />

      <div className="space-y-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
