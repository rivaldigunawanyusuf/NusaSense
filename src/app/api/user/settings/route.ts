import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Res.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { telegramChatId: true }
  });

  return Res.json({ telegramChatId: user?.telegramChatId || "" });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { telegramChatId } = body;

  // OWASP: Input Validation
  if (telegramChatId && (typeof telegramChatId !== "string" || telegramChatId.length > 50 || !/^\d+$/.test(telegramChatId))) {
    return NextResponse.json({ error: "Invalid Chat ID format" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { telegramChatId: telegramChatId || null }
  });

  return NextResponse.json({ success: true, telegramChatId });
}
