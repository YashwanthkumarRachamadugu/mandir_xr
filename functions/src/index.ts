/// <reference path="./types/node.d.ts" />
/// <reference path="./types/firebase-functions.d.ts" />

import * as functions from "firebase-functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const mandirAI = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  const userMessage = data.message;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
You are MandirAI, a Digital Historian.

You specialize in:
- Indian temple architecture
- Dravidian, Nagara, Vesara styles
- History of temples in India
- Cultural and spiritual significance

If the user asks about temples available in AR:
Available temples:
- Ram Mandir
- Birla Mandir

If user asks to visit one of these temples,
respond in JSON:
{
  "reply": "...",
  "redirect": "/ar?temple=TempleName"
}

Otherwise respond normally:
{
  "reply": "historical explanation",
  "redirect": null
}

User question:
${userMessage}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      reply: text,
      redirect: null,
    };
  }
});