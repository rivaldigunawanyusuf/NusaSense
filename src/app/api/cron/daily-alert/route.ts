import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Secure this endpoint with a secret key
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    if (secret !== (process.env.CRON_SECRET || "nusa123")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const SECTORS_API_KEY = process.env.SECTORS_API_KEY || "78fbb01ef1f4fd325625f6d3102a70463c4297ac65ee5916dc8ec81b2745a795";
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: "No Telegram Token" }, { status: 500 });
    }

    // 1. Fetch real data from Sectors API
    const response = await fetch(
      "https://api.sectors.app/v2/companies/?where=pe_ttm>0 and pb_mrq>0 and yield_ttm>-1 and market_cap>0&order_by=-market_cap&limit=30&include_query_values=true",
      {
        headers: { "Authorization": SECTORS_API_KEY }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Sectors API");
    }

    const data = await response.json();
    const results = data.results || [];

    // 2. Detect Anomalies
    const anomalies: any[] = [];
    results.forEach((item: any) => {
      const qv = item.query_values || {};
      const pe = qv.pe_ttm || 0;
      const pbv = qv.pb_mrq || 0;
      const divYield = (qv.yield_ttm || 0) * 100;
      const symbol = item.symbol.replace(".JK", "");

      if (pe > 0 && pe < 15 && pbv > 0 && pbv < 1.5) {
        anomalies.push({ symbol, pe, pbv, divYield });
      }
    });

    if (anomalies.length === 0) {
      return NextResponse.json({ status: "No anomalies today" });
    }

    // 3. Construct Message
    let message = `🚨 *NusaSense Anomaly Alert* 🚨\n\nKami mendeteksi ${anomalies.length} saham dengan valuasi menarik (Undervalued) hari ini:\n\n`;
    anomalies.forEach(a => {
      message += `🔹 *${a.symbol}*\n`;
      message += `   - P/E: ${a.pe.toFixed(2)}x\n`;
      message += `   - PBV: ${a.pbv.toFixed(2)}x\n`;
      message += `   - Div Yield: ${a.divYield.toFixed(2)}%\n\n`;
    });
    message += `_Otomatis dari NusaSense Engine_`;

    // 4. Get all users with Telegram IDs
    const users = await prisma.user.findMany({
      where: {
        telegramChatId: { not: null }
      }
    });

    // 5. Send Telegram Messages
    let sentCount = 0;
    for (const user of users) {
      if (user.telegramChatId) {
        try {
          await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: user.telegramChatId,
              text: message,
              parse_mode: "Markdown",
            }),
          });
          sentCount++;
        } catch (e) {
          console.error(`Failed to send to ${user.telegramChatId}`, e);
        }
      }
    }

    return NextResponse.json({ status: "Success", sentTo: sentCount, anomaliesFound: anomalies.length });
  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
