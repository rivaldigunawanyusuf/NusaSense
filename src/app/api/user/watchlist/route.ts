import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { watchlists: true }
  });

  return NextResponse.json(user?.watchlists.map(w => w.symbol) || []);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { symbol, action } = body; // action = 'add' or 'remove'

  // OWASP: Input Validation
  if (!symbol || typeof symbol !== "string" || symbol.length > 20 || !/^[A-Z0-9.-]+$/.test(symbol)) {
    return NextResponse.json({ error: "Invalid symbol format" }, { status: 400 });
  }

  if (action !== "add" && action !== "remove") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (action === "add") {
    await prisma.watchlist.upsert({
      where: { userId_symbol: { userId: user.id, symbol } },
      update: {},
      create: { userId: user.id, symbol }
    });
  } else if (action === "remove") {
    await prisma.watchlist.deleteMany({
      where: { userId: user.id, symbol }
    });
  }

  return NextResponse.json({ success: true, symbol, action });
}
