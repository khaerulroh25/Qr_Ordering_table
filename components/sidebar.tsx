"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Tags,
  Table,
  Users,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      href: "/admin/order",
      icon: ShoppingCart,
    },
    {
      name: "Menu",
      href: "/admin/menu",
      icon: UtensilsCrossed,
    },
    {
      name: "Category",
      href: "/admin/category",
      icon: Tags,
    },
    {
      name: "Table",
      href: "/admin/table",
      icon: Table,
    },
    {
      name: "User",
      href: "/admin/user",
      icon: Users,
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">QR Order Admin</h2>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                 flex items-center gap-3 rounded-lg px-4 py-3 transition
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <Icon size={20} />

              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
