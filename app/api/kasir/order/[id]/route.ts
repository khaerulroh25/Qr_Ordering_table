import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        paymentStatus: "PAID",
      },
    });

    return Response.json({
      message: "Pembayaran berhasil dikonfirmasi 💰",
      data: order,
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
