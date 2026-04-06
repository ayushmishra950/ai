import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Save GEMINI_API_KEY in .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Give AI instruction to return only code
   const fullPrompt = `You are a specialized React and Tailwind CSS developer. 
Create a high-quality, modern component based on this prompt: "${prompt}". 

RULES:
1. Return ONLY the component code.
2. DO NOT use "export default". 
3. Use an arrow function format like: () => { return ( <div className="...">...</div> ) }
4. Use Tailwind CSS for all styling.
5. Do not include any imports.
6. Do not include markdown backticks or explanations.`;


    const result = await model.generateContent(fullPrompt);
    const code = result.response.text();

    return NextResponse.json({ code });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
