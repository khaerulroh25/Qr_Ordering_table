export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

import StatsCards from "@/components/dashboard/StatsCards";
import RecentOrders from "@/components/dashboard/Recentorders";
import OrderStatus from "@/components/dashboard/OrderStatus";

export default async function AdminDashboardPage() {
  // Total order
  const totalOrders = await prisma.order.count();

  // Total menu
  const totalMenus = await prisma.menu.count();

  // Pending order
  const pendingOrders = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });

  // Recent orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      table: true,
    },
  });

  // revenue
  const revenue = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      paymentStatus: "PAID",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>

        <p className="mt-1 text-gray-500">Welcome back 👋</p>
      </div>

      {/* Stats */}
      <StatsCards
        totalOrders={totalOrders}
        totalMenus={totalMenus}
        pendingOrders={pendingOrders}
        revenue={revenue._sum.totalPrice || 0}
      />

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <RecentOrders orders={recentOrders} />

        <OrderStatus totalOrders={totalOrders} pendingOrders={pendingOrders} />
      </div>
    </div>
  );
}
