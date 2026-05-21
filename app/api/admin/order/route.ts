import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tableNumber, items } = body;

    //Validasi
    if (!tableNumber || !items || items.length === 0) {
      return Response.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    //Cari meja
    const table = await prisma.table.findUnique({
      where: { number: Number(tableNumber) },
    });

    if (!table) {
      return Response.json({ error: "Meja tidak ditemukan" }, { status: 404 });
    }

    //Ambil menu dari DB
    const menuIds = items.map((item: any) => item.menuId);

    const menus = await prisma.menu.findMany({
      where: {
        id: { in: menuIds },
      },
    });

    //Hitung total + mapping order items
    let totalPrice = 0;

    const orderItemsData = items.map((item: any) => {
      const menu = menus.find((m) => m.id === item.menuId);

      if (!menu) throw new Error("Menu tidak ditemukan");

      const subtotal = menu.price * item.quantity;
      totalPrice += subtotal;

      return {
        menuId: menu.id,
        quantity: item.quantity,
      };
    });

    //Create order
    const created = await prisma.order.create({
      data: {
        tableId: table.id,
        totalPrice,
        items: {
          create: orderItemsData,
        },
      },
    });

    //Ambil ulang data lengkap
    const fullOrder = await prisma.order.findUnique({
      where: { id: created.id },
      include: {
        table: true,
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    console.log("FULL ORDER:", JSON.stringify(fullOrder, null, 2));

    //Emit realtime
    if ((global as any).io && fullOrder) {
      console.log("EMIT DATA:", JSON.stringify(fullOrder, null, 2));
      (global as any).io.emit("new-order", fullOrder);
    }

    //Response
    return Response.json({
      message: "Order berhasil dibuat 🔥",
      data: fullOrder,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  // start today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // end today
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      table: true,

      items: {
        include: {
          menu: true,
        },
      },
    },
  });

  return Response.json({ data: orders });
}
