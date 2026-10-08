import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if the message contains text
    if (body.message && body.message.text) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      // If user sends /start
      if (text === "/start") {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        
        if (!botToken) {
          console.error("TELEGRAM_BOT_TOKEN is not defined");
          return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const replyMessage = "✅ *Berhasil!*\n\nAkun Telegram Anda sudah terhubung dengan NusaSense. Anda akan menerima notifikasi pintar (anomaly alert) langsung di sini!\n\nID Anda: `" + chatId + "`\n_(Silakan masukkan ID ini di platform NusaSense jika belum)_";

        // Send reply via Telegram API
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyMessage,
            parse_mode: "Markdown",
          }),
        });
      }
    }

    // Always return 200 OK to Telegram to acknowledge receipt
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
