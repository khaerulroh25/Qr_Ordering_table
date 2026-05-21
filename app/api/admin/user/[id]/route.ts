import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";

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
    const body = await req.json();

    const email = body.email?.trim();

    const password = body.password?.trim();

    const role = body.role;

    // validasi input
    if (!email || !role) {
      return Response.json(
        {
          error: "Email dan role wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // validasi role
    const allowedRoles = ["ADMIN", "KASIR", "KITCHEN"];

    if (!allowedRoles.includes(role)) {
      return Response.json(
        {
          error: "Role tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    // cek user exist
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser) {
      return Response.json(
        {
          error: "User tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // cek email duplikat
    const duplicateUser = await prisma.user.findFirst({
      where: {
        email,

        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicateUser) {
      return Response.json(
        {
          error: "Email sudah digunakan",
        },
        {
          status: 400,
        },
      );
    }

    // data update
    let updateData: any = {
      email,
      role,
    };

    // jika password diisi, hash password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      updateData.password = hashedPassword;
    }

    // update user
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },

      data: updateData,
    });

    return Response.json({
      message: "User berhasil diupdate",

      data: user,
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
    // cek user exist
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser) {
      return Response.json(
        {
          error: "User tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    // cek jangan hapus admin terakhir
    if (existingUser.role === "ADMIN") {
      const adminCount = await prisma.user.count({
        where: {
          role: "ADMIN",
        },
      });

      if (adminCount <= 1) {
        return Response.json(
          {
            error: "Minimal harus ada 1 admin",
          },
          {
            status: 400,
          },
        );
      }
    }

    // hapus user
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json({
      message: "User berhasil dihapus",
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
