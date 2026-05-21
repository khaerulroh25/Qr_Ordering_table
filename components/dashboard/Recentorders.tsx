interface Props {
  orders: any[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="pb-3">Invoice</th>
              <th className="pb-3">Table</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Status Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-4">#{order.id}</td>

                <td>{order.table?.number}</td>

                <td>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {order.status}
                  </span>
                </td>

                <td>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
