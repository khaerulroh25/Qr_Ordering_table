"use client";

import { useEffect, useState } from "react";
import MenuForm from "@/components/menu/MenuForm";
import MenuCard from "@/components/menu/MenuCard";

type Category = {
  id: number;
  name: string;
};

type Menu = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  image?: string;

  category?: {
    name: string;
  };
};

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch data
  const fetchData = async () => {
    const menuRes = await fetch("/api/admin/menu");
    const menuData = await menuRes.json();
    setMenus(menuData.data);

    const catRes = await fetch("/api/admin/category");
    const catData = await catRes.json();
    setCategories(catData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create menu
  const handleCreate = async () => {
    if (!name || !price || !categoryId) {
      return alert("Semua field wajib diisi");
    }

    try {
      const formData = new FormData();

      formData.append("name", name);

      formData.append("price", price);

      formData.append("categoryId", categoryId);

      if (image) {
        const maxSize = 2 * 1024 * 1024;

        if (image.size > maxSize) {
          return alert("Ukuran gambar maksimal 2MB");
        }

        // validasi tipe file
        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(image.type)) {
          return alert("Format gambar harus JPG atau PNG");
        }
        formData.append("image", image);
      }

      const res = await fetch("/api/admin/menu", {
        method: "POST",

        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      // reset form
      setName("");

      setPrice("");

      setCategoryId("");

      setImage(null);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditingId(menu.id);

    setName(menu.name);

    setPrice(String(menu.price));
    setCategoryId(String(menu.categoryId));
    setPreviewImage(menu.image || "");
  };

  // update menu
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);

      formData.append("price", price);

      formData.append("categoryId", categoryId);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`/api/admin/menu/${editingId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setEditingId(null);

      setName("");
      setPrice("");
      setCategoryId("");
      setImage(null);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // delete menu
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus menu?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/menu/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // // 🔹 Delete menu
  // const handleDelete = async (id: number) => {
  //   if (!confirm("Yakin hapus menu?")) return;

  //   await fetch(`/api/admin/menu/${id}`, {
  //     method: "DELETE",
  //   });

  //   fetchData();
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>

        <p className="text-gray-500 mt-1">Kelola menu restaurant</p>
      </div>

      {/* FORM */}
      <MenuForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        image={image}
        setImage={setImage}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        onSubmit={editingId ? handleUpdate : handleCreate}
        isEdit={!!editingId}
      />

      {/* MENU LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
