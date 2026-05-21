import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

import * as path from "path";

import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;

    const price = Number(formData.get("price"));

    const categoryId = Number(formData.get("categoryId"));

    const image = formData.get("image");

    // VALIDASI
    if (!name || !price || !categoryId) {
      return Response.json(
        {
          error: "Data wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    let imagePath = "";

    // UPLOAD IMAGE
    if (image && image instanceof File) {
      // VALIDASI SIZE
      const maxSize = 2 * 1024 * 1024;

      if (image.size > maxSize) {
        return Response.json(
          {
            error: "Ukuran gambar maksimal 2MB",
          },
          {
            status: 400,
          },
        );
      }

      // VALIDASI TYPE
      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(image.type)) {
        return Response.json(
          {
            error: "Format gambar harus JPG atau PNG",
          },
          {
            status: 400,
          },
        );
      }

      // BUFFER
      const bytes = await image.arrayBuffer();

      const buffer = Buffer.from(bytes);

      // EXTENSION
      const ext = image.name.split(".").pop();

      // FILE NAME
      const fileName = `${Date.now()}.${ext}`;

      // PATH
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

      // SAVE FILE
      await writeFile(uploadPath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    // CREATE MENU
    const menu = await prisma.menu.create({
      data: {
        name,
        price,
        categoryId,
        image: imagePath,
      },
    });

    return Response.json({
      message: "Menu berhasil dibuat",

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

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        category: true,
      },
    });

    return Response.json({
      data: menus,
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
