"use client";
import Header from "../../components/header";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Menu = {
  id: number;
  name: string;
  image?: string;
  price: number;
  categoryId: number;
};

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  const table = params.get("table");
  const totalCart = cart.reduce((total, item) => total + item.quantity, 0);
  const filteredMenus =
    category === null
      ? menus
      : menus.filter((menu) => menu.categoryId === category);

  //  Fetch menu dari API Public
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenus(data.data));
  }, []);

  // Load cart dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  //  Sync cart ke localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //  Add to cart
  const addToCart = (menu: Menu) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menuId === menu.id);

      if (existing) {
        return prev.map((item) =>
          item.menuId === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { menuId: menu.id, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <Header
        table={table}
        totalCart={totalCart}
        onCartClick={() => router.push(`/cart?table=${table}`)}
      />

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* TITLE */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu Pilihan</h2>

          <p className="text-gray-500 mt-1">
            Silahkan pilih makanan favorit anda
          </p>
        </div>

        {/*FILTER MENU*/}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {[
            { id: null, name: "All" },
            { id: 1, name: "Makanan" },
            { id: 2, name: "Minuman" },
            { id: 3, name: "Dessert" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setCategory(item.id)}
              className={`
        px-4 py-2 rounded-2xl text-sm font-medium transition
        ${
          category === item.id
            ? "bg-orange-500 text-white shadow"
            : "bg-white text-gray-700 border"
        }
      `}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMenus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* IMAGE */}
              <div className="h-48 bg-gray-200">
                <img
                  src={menu.image || "https://placehold.co/600x400"}
                  alt={menu.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {menu.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      Makanan lezat dengan cita rasa terbaik
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-bold text-green-600">
                    Rp {menu.price.toLocaleString("id-ID")}
                  </p>

                  <button
                    onClick={() => addToCart(menu)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
