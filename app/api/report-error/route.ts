import { NextResponse } from "next/server";

type ReportPayload = {
  category?: unknown;
  message?: unknown;
  contact?: unknown;
  pageUrl?: unknown;
  trap?: unknown;
};

export const runtime = "nodejs";

function asTrimmedString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: ReportPayload;

  try {
    body = (await request.json()) as ReportPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (asTrimmedString(body.trap, 120)) {
    return NextResponse.json({ ok: true });
  }

  const category = asTrimmedString(body.category, 40) || "その他";
  const message = asTrimmedString(body.message, 1000);
  const contact = asTrimmedString(body.contact, 120);
  const pageUrl = asTrimmedString(body.pageUrl, 500);

  if (message.length < 8) {
    return NextResponse.json({ error: "Message is too short" }, { status: 400 });
  }

  const webhookUrl = process.env.REPORT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Report webhook is not configured" }, { status: 503 });
  }

  let response: Response;

  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.REPORT_WEBHOOK_SECRET
          ? { authorization: `Bearer ${process.env.REPORT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        category,
        message,
        contact,
        pageUrl,
        userAgent: request.headers.get("user-agent") ?? "",
        referer: request.headers.get("referer") ?? "",
        secret: process.env.REPORT_WEBHOOK_SECRET ?? "",
      }),
    });
  } catch {
    return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: "Webhook rejected report" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
