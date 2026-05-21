import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { name } = await req.json();

    // VALIDASI INPUT
    if (!name?.trim()) {
      return Response.json(
        {
          error: "Nama category wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // CEK CATEGORY
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCategory) {
      return Response.json(
        {
          error: "Category tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // UPDATE CATEGORY
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },

      data: {
        name: name.trim(),
      },
    });

    return Response.json({
      message: "Category berhasil diupdate",
      data: category,
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
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    // cek category exist
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCategory) {
      return Response.json(
        {
          error: "Category tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // cek apakah category masih digunakan menu
    const menuCount = await prisma.menu.count({
      where: {
        categoryId: Number(id),
      },
    });

    if (menuCount > 0) {
      return Response.json(
        {
          error: "Category tidak bisa dihapus karena masih digunakan menu",
        },
        {
          status: 400,
        },
      );
    }

    // delete category
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json({
      message: "Category berhasil dihapus",
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
