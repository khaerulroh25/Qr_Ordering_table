import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { number } = await req.json();

    if (!number) {
      return Response.json(
        { error: "Nomor meja wajib diisi" },
        { status: 400 },
      );
    }

    const table = await prisma.table.create({
      data: {
        number: Number(number),
      },
    });

    return Response.json({
      message: "Meja berhasil dibuat",
      data: table,
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const tables = await prisma.table.findMany();

  const data = tables.map((table) => ({
    ...table,
    qrUrl: `http://localhost:3000/menu?table=${table.number}`,
  }));

  return Response.json({ data });
}
