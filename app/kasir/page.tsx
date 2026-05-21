"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function OrderPage() {
  const [orders, setOrders] = useState<any[]>([]);

  // 🔹 Fetch initial data
  const fetchOrders = async () => {
    const res = await fetch("/api/admin/order");
    const data = await res.json();
    setOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Realtime
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("new-order", (data) => {
      setOrders((prev) => [data, ...prev]);
    });

    socket.on("order-updated", (updated) => {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 🔹 Update payment status
  const updatePaymentStatus = async (id: number, paymentStatus: string) => {
    await fetch(`/api/admin/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ paymentStatus }),
    });
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders Dashboard</h1>

        <p className="text-gray-500 mt-1">Kelola pesanan restaurant</p>
      </div>

      {/* ORDER LIST */}
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5"
          >
            {/* TOP */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order #{order.id}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Meja {order.table?.number}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">Total</p>

                <p className="text-xl font-bold text-orange-500">
                  Rp {order.totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="font-semibold text-gray-700 mb-3">Order Items</p>

              <div className="space-y-2">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.menu?.name}</span>

                    <span className="font-medium text-gray-500">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* STATUS SECTION */}
              <div className="flex flex-wrap gap-3">
                {/* ORDER STATUS */}
                <div
                  className={`
                  px-4 py-2 rounded-2xl text-sm font-semibold
                  ${
                    order.status === "PENDING"
                      ? "bg-gray-100 text-gray-700"
                      : order.status === "COOKING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }
                `}
                >
                  Order: {order.status}
                </div>

                {/* PAYMENT STATUS */}
                <div
                  className={`
                  px-4 py-2 rounded-2xl text-sm font-semibold
                  ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                >
                  Payment: {order.paymentStatus}
                </div>
              </div>

              {/* PAYMENT BUTTON */}
              {order.paymentStatus === "PENDING" && (
                <button
                  onClick={() => updatePaymentStatus(order.id, "PAID")}
                  className="
                    bg-blue-500
                    hover:bg-blue-600
                    active:scale-95
                    text-white
                    px-4
                    py-2
                    rounded-2xl
                    text-sm
                    font-semibold
                    transition-all
                  "
                >
                  Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
