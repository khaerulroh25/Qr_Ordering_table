import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return Response.json({ error: "Nama category wajib" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return Response.json({
      message: "Category berhasil dibuat",
      data: category,
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return Response.json({
      data: categories,
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
