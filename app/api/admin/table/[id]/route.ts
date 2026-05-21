import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const number = body.number;

    //validasi input
    if (!number) {
      return Response.json(
        {
          error: "Nomor meja wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // cek apakah meja ada
    const existingTable = await prisma.table.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTable) {
      return Response.json(
        {
          error: "Meja tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // cek duplikat nomor meja
    const duplicateTable = await prisma.table.findFirst({
      where: {
        number,

        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicateTable) {
      return Response.json(
        {
          error: "Nomor meja sudah digunakan",
        },
        {
          status: 400,
        },
      );
    }

    const updatedTable = await prisma.table.update({
      where: {
        id: Number(id),
      },
      data: {
        number: Number(number),
      },
    });
    return Response.json({
      message: "Meja berhasil diupdate",

      data: updatedTable,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await context.params;

  try {
    // Ccek table exists
    const existingTable = await prisma.table.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTable) {
      return Response.json(
        {
          error: "Meja tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // cek apakah meja masih memiliki order
    const orderCount = await prisma.order.count({
      where: {
        tableId: Number(id),
      },
    });

    if (orderCount > 0) {
      return Response.json(
        {
          error: "Meja tidak bisa dihapus karena masih memiliki order",
        },
        {
          status: 400,
        },
      );
    }

    // delete table
    await prisma.table.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json({
      message: "Meja berhasil dihapus",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
