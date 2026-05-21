import Link from "next/link";
import LogoutButton from "@/components/user/LogoutButton";
import { Receipt, ShoppingCart } from "lucide-react";

export default function KasirLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-gray-900 p-5 text-white">
        {/* Header */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500 p-2">
              <ShoppingCart size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Kasir Panel</h2>
              <p className="text-sm text-gray-400">QR Ordering System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              href="/kasir"
              className="
              flex items-center gap-3 rounded-lg
              bg-blue-500 px-4 py-3
              font-medium text-white
              transition hover:bg-blue-600
            "
            >
              <Receipt size={20} />

              <span>Orders</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-50 pt-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
