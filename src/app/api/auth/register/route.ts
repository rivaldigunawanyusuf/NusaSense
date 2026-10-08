import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, telegramChatId } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      if (!existingUser.password) {
        // User exists but has no password (created via OAuth or old dummy logic)
        // Let's update their password and telegram ID
        const updatedUser = await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            telegramChatId: telegramChatId || existingUser.telegramChatId,
            name: name || existingUser.name,
          },
        });
        return NextResponse.json(
          { message: "Account updated successfully", user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email } },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        telegramChatId: telegramChatId || null,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser.id, name: newUser.name, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
