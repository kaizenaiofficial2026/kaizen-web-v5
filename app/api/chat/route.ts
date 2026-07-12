import { NextResponse } from "next/server";

// Vapi Chat API is server-side only — the private key must never reach the browser.
const VAPI_PRIVATE_KEY = process.env.VAPI_PRIVATE_KEY;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

type ChatRequest = {
  message?: unknown;
  previousChatId?: unknown;
};

type VapiChatOutput = { role?: string; content?: string };
type VapiChatResponse = { id?: string; output?: VapiChatOutput[] };

export async function POST(request: Request) {
  if (!VAPI_PRIVATE_KEY || !ASSISTANT_ID) {
    return NextResponse.json(
      { error: "Chat is not configured yet." },
      { status: 503 },
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const previousChatId =
    typeof body.previousChatId === "string" ? body.previousChatId : undefined;

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    const vapiResponse = await fetch("https://api.vapi.ai/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VAPI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: ASSISTANT_ID,
        input: message,
        ...(previousChatId ? { previousChatId } : {}),
      }),
    });

    if (!vapiResponse.ok) {
      const detail = await vapiResponse.text();
      console.error("Vapi chat error", vapiResponse.status, detail);
      return NextResponse.json(
        { error: "The assistant is unavailable right now." },
        { status: 502 },
      );
    }

    const data = (await vapiResponse.json()) as VapiChatResponse;
    const reply = (data.output ?? [])
      .filter((item) => item?.role === "assistant")
      .map((item) => item?.content ?? "")
      .join("")
      .trim();

    return NextResponse.json({
      reply: reply || "Sorry, I didn't catch that — could you rephrase?",
      chatId: data.id ?? null,
    });
  } catch (error) {
    console.error("Vapi chat request failed", error);
    return NextResponse.json(
      { error: "Could not reach the assistant." },
      { status: 502 },
    );
  }
}
