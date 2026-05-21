import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return Response.json(
        {
          error: "Data tidak lengkap",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
    return Response.json({
      message: "User berhasil dibuat",
      data: user,
    });
  } catch (error) {
    return Response.json({
      error: " Internal server error",
      status: 500,
    });
  }
}

export async function GET() {
  const user = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json({
    data: user,
  });
}
