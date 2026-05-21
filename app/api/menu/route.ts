import { prisma } from "@/lib/prisma";

export async function GET() {
  const menus = await prisma.menu.findMany({
    include: {
      category: true,
    },
  });

  return Response.json({
    data: menus,
  });
}
