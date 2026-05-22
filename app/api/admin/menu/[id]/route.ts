import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await context.params;

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;

    const price = Number(formData.get("price"));

    const categoryId = Number(formData.get("categoryId"));

    const image = formData.get("image");

    // DATA UPDATE
    let updateData: any = {
      name,
      price,
      categoryId,
    };

    // JIKA ADA IMAGE BARU
    if (image && image instanceof File) {
      const ext = image.name.split(".").pop();
      const fileName = `menu/${Date.now()}.${ext}`;

      const blob = await put(fileName, image, {
        access: "public",
        contentType: image.type,
      });

      updateData.image = blob.url;
    }

    // UPDATE MENU
    const menu = await prisma.menu.update({
      where: {
        id: Number(id),
      },

      data: updateData,
    });

    return Response.json({
      message: "Menu berhasil diupdate",

      data: menu,
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
  const { id } = await context.params;

  try {
    await prisma.menu.delete({
      where: { id: Number(id) },
    });

    return Response.json({
      message: "Menu berhasil dihapus",
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
