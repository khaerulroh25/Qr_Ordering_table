"use client";
import Header from "../../components/header";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CartItem = {
  menuId: number;
  quantity: number;
};

type Menu = {
  id: number;
  name: string;
  image?: string;
  price: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const params = useSearchParams();

  const table = params.get("table");
  const totalCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Load cart dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // ambil data menu dari API Public
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("/api/menu");

        const data = await res.json();

        setMenus(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenus();
  }, []);

  // gabungkan data cart dengan menu untuk ditampilkan
  const cartWithDetail = cart.map((item) => {
    const menu = menus.find((m) => m.id === item.menuId);

    return {
      ...item,
      name: menu?.name || "Unknown",
      image: menu?.image,
      price: menu?.price || 0,
      subtotal: (menu?.price || 0) * item.quantity,
    };
  });

  // hitung total pembayaran
  const total = cartWithDetail.reduce((acc, item) => acc + item.subtotal, 0);

  // checkout
  const checkout = async () => {
    if (!table) {
      alert("Table tidak ditemukan");
      return;
    }

    if (cart.length === 0) {
      alert("Cart kosong");
      return;
    }

    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableNumber: table,
        items: cart,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // midtrans popup
      window.snap.pay(data.token, {
        onSuccess: function () {
          alert("Pembayaran berhasil");
        },

        onPending: function () {
          alert("Menunggu pembayaran");
        },

        onError: function () {
          alert("Pembayaran gagal");
        },
      });

      alert("Order berhasil dibuat");

      // clear cart
      localStorage.removeItem("cart");
      setCart([]);
    } else {
      alert(data.error || "Gagal membuat order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <Header table={table} totalCart={totalCart} />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* CART LIST */}
        <div className="space-y-4">
          {cartWithDetail.map((item) => (
            <div
              key={item.menuId}
              className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition"
            >
              {/* LEFT */}
              <div className="flex gap-4 items-center">
                {/* IMAGE */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200">
                  <img
                    src={item.image || "https://placehold.co/200x200"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* INFO */}
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  {/* QUANTITY */}
                  <div className="mt-2 inline-flex items-center bg-gray-100 rounded-xl px-3 py-1">
                    <span className="text-sm font-medium text-gray-700">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-lg font-bold text-orange-500">
                  Rp {item.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL SECTION */}
        <div className="mt-8 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500">Total Pembayaran</p>

            <p className="text-2xl font-bold text-gray-800">
              Rp {total.toLocaleString("id-ID")}
            </p>
          </div>

          <p className="text-sm text-gray-400">
            Pastikan pesanan anda sudah benar
          </p>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={checkout}
            className="
            mt-5
            w-full
            bg-orange-500
            hover:bg-orange-600
            active:scale-[0.98]
            text-white
            py-3
            rounded-2xl
            text-lg
            font-semibold
            shadow-md
            transition-all
          "
          >
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
