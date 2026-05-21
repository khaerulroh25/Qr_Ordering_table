import { prisma } from "@/lib/prisma";
import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,

  serverKey: process.env.MIDTRANS_SERVER_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tableNumber, items } = body;

    // 1. Validasi
    if (!tableNumber || !items || items.length === 0) {
      return Response.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // 2. Cari meja
    const table = await prisma.table.findUnique({
      where: { number: Number(tableNumber) },
    });

    if (!table) {
      return Response.json({ error: "Meja tidak ditemukan" }, { status: 404 });
    }

    // 3. Ambil semua menu dari DB
    const menuIds = items.map((item: any) => item.menuId);

    const menus = await prisma.menu.findMany({
      where: {
        id: { in: menuIds },
      },
    });

    // 4. Hitung total harga
    let totalPrice = 0;

    const orderItemsData = items.map((item: any) => {
      const menu = menus.find((m) => m.id === item.menuId);

      if (!menu) throw new Error("Menu tidak ditemukan");

      const subtotal = parseInt(menu.price.toString()) * Number(item.quantity);
      totalPrice += subtotal;

      return {
        menuId: menu.id,
        quantity: item.quantity,
      };
    });

    // 5. Create order + items
    const order = await prisma.order.create({
      data: {
        tableId: table.id,
        totalPrice,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    if ((global as any).io) {
      (global as any).io.emit("new-order", order);
    }

    const token = await snap.createTransaction({
      transaction_details: {
        order_id: `ORDER-${order.id}-${Date.now()}`,

        gross_amount: parseInt(order.totalPrice.toString()),
      },

      customer_details: {
        first_name: "Customer",
      },
    });

    return Response.json({
      message: "Order berhasil dibuat",
      token: token.token,
      data: order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
