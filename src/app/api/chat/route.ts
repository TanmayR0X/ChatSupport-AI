import connectDB from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();
    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and owner id is required" },
        { status: 400 }
      )
    }

    await connectDB();

    const setting = await Settings.findOne({ ownerId })
    if (!setting) {
      return NextResponse.json(
        { message: "chat bot is not configured yet" },
        { status: 400 }
      )
    }

    const KNOWLEDGE = `
    business name- ${setting.businessName || "not provided"}
    support email- ${setting.supportEmail || "not provided"}
    knowledge- ${setting.knowledge || "not provided"}

    `

const prompt = `
You are a professional customer support assistant.

Your job is to answer customer questions using ONLY the provided business information.

RULES:
- Do not use outside knowledge.
- Do not guess or assume missing details.
- Do not create new policies, pricing, or guarantees.
- Keep responses clear, polite, and concise.
- If partial information exists, answer only what is supported.
- If the customer sends only a greeting (like "hi", "hello", "hey", etc.),
  respond with a friendly greeting including the company name and ask how you can help.
  Example style: "Hello from <Company Name>! How can I help you today?"

FALLBACK RULE:
If the question cannot be answered from the provided information,
reply exactly with:
"Please contact support."

----------------------------
BUSINESS INFORMATION
----------------------------
${KNOWLEDGE}

----------------------------
CUSTOMER QUESTION
----------------------------
${message}

----------------------------
ANSWER
----------------------------
`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const response = NextResponse.json(res.text)
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response

  } catch (error) {
    const response = NextResponse.json(
      { message: `chat error ${error}` },
      { status: 500 }
    )
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response
  }
}

export const OPTIONS = async () => {
  return NextResponse.json(null, {
    status: 201,
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}
  })
}