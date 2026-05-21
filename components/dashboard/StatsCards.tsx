import {
  ShoppingCart,
  UtensilsCrossed,
  Clock3,
  DollarSign,
} from "lucide-react";

interface Props {
  totalOrders: number;
  totalMenus: number;
  pendingOrders: number;
  revenue: number;
}

export default function StatsCards({
  totalOrders,
  totalMenus,
  pendingOrders,
  revenue,
}: Props) {
  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Total Menu",
      value: totalMenus,
      icon: UtensilsCrossed,
      color: "bg-orange-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock3,
      color: "bg-red-500",
    },
    {
      title: "Revenue",
      value: `Rp ${revenue.toLocaleString("id-ID")}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.title} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {stat.value}
                </h2>
              </div>

              <div className={`${stat.color} rounded-xl p-3 text-white`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
