import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  // BELUM LOGIN
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const user = (await verifyToken(token)) as {
      id: number;
      role: string;
    };

    // ADMIN ONLY
    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // KASIR ONLY
    if (pathname.startsWith("/kasir") && user.role !== "KASIR") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // KITCHEN ONLY
    if (pathname.startsWith("/kitchen") && user.role !== "KITCHEN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/kasir/:path*", "/kitchen/:path*"],
};
