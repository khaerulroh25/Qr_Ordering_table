interface Props {
  totalOrders: number;
  pendingOrders: number;
}

export default function OrderStatus({ totalOrders, pendingOrders }: Props) {
  const pendingPercentage =
    totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">Order Status</h2>

      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Pending</span>

          <span>{pendingPercentage.toFixed(0)}%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-yellow-500"
            style={{
              width: `${pendingPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
