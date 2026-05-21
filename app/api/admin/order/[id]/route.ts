import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const { status, paymentStatus } = await req.json();

    // CEK ORDER
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingOrder) {
      return Response.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // VALIDASI FLOW STATUS
    if (status) {
      const allowedTransitions: Record<string, string[]> = {
        PENDING: ["COOKING"],
        COOKING: ["DONE"],
        DONE: [],
      };

      const isAllowed =
        allowedTransitions[existingOrder.status]?.includes(status);

      if (!isAllowed) {
        return Response.json(
          {
            error: `Status ${existingOrder.status} tidak bisa diubah ke ${status}`,
          },
          { status: 400 },
        );
      }
    }

    // UPDATE STATUS
    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },

      data: {
        status,
        paymentStatus,
      },
    });

    return Response.json({
      message: "Status berhasil diupdate",
      data: order,
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
