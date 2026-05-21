import Link from "next/link";
import LogoutButton from "@/components/user/LogoutButton";
import AdminSidebar from "@/components/sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <AdminSidebar />

        {/* Logout */}
        <div className="mt-auto pt-10 ">
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
