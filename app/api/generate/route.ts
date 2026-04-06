// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// // Save GEMINI_API_KEY in .env.local
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Give AI instruction to return only code
//    const fullPrompt = `You are a specialized React and Tailwind CSS developer. 
// Create a high-quality, modern component based on this prompt: "${prompt}". 

// RULES:
// 1. Return ONLY the component code.
// 2. DO NOT use "export default". 
// 3. Use an arrow function format like: () => { return ( <div className="...">...</div> ) }
// 4. Use Tailwind CSS for all styling.
// 5. Do not include any imports.
// 6. Do not include markdown backticks or explanations.`;


//     const result = await model.generateContent(fullPrompt);
//     const code = result.response.text();

//     return NextResponse.json({ code });
//   } catch (error) {
//     return NextResponse.json({ error: "Generation failed" }, { status: 500 });
//   }
// }


// import Groq from "groq-sdk";
// import { NextResponse } from "next/server";

// // .env.local mein GROQ_API_KEY=gsk_... naam se key save karein
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     if (!process.env.GROQ_API_KEY) {
//       return NextResponse.json({ error: "Groq API Key missing" }, { status: 500 });
//     }

//     // Llama-3.3-70b-versatile ya llama3-8b-8192 use karein (Fast & Free)
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You are a React and Tailwind CSS expert. Return ONLY the functional component code. No markdown, no imports. Use: const GeneratedComponent = () => { return (...) }; render(<GeneratedComponent />);",
//         },
//         {
//           role: "user",
//           content: `Create this component: ${prompt}`,
//         },
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = chatCompletion.choices[0]?.message?.content || "";

//     // Clean any accidental markdown
//     const cleanCode = text.replace(/```jsx|```javascript|```tsx|```/g, "").trim();

//     return NextResponse.json({ code: cleanCode });
//   } catch (error: any) {
//     console.error("GROQ ERROR:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }




import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Groq API Key missing" }, { status: 500 });
    }

    // AI ko aur behtar instruction dene ke liye prompt ko enhance kiya
    const enhancedPrompt = `Create a high-end, unique, and highly attractive React component for: "${prompt}". 
    Focus on premium aesthetics like Apple, Stripe, or Vercel. 
    Use sophisticated typography, balanced padding, and artistic UI elements.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
     content: `You are a Luxury UI/UX Designer. 
COLOR & STYLE RULES:
1. NO DEFAULT COLORS: Avoid plain 'bg-blue-500' or 'bg-gray-100'. 
2. USE TRENDY PALETTES: Use "Midnight Navy & Neon Cyan", "Deep Charcoal & Rose Gold", or "Dark Violet & Emerald".
3. MESH GRADIENTS: Use multi-step gradients like 'bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155]'.
4. GLASS EFFECTS: Use 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'.
5. ACCENT GLOW: Add glowing effects using 'shadow-[0_0_20px_rgba(59,130,246,0.5)]' for primary buttons.
6. NO imports. Define 'const GeneratedComponent' and MUST end with 'render(<GeneratedComponent />);'.`

        },
        { role: "user", content: enhancedPrompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6, // Higher temperature = More unique/creative designs
    });

    let code = chatCompletion.choices?.[0]?.message?.content || "";

    // Step 1: Remove Markdown Backticks
    code = code.replace(/```jsx|```javascript|```tsx|```/g, "").trim();

    // Step 2: Remove any unintentional imports or require statements
    code = code.split('\n')
      .filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('require('))
      .join('\n');

    // Step 3: Self-Healing Render Logic
    if (!code.includes("render(")) {
      code += "\n\nrender(<GeneratedComponent />);";
    }

    return NextResponse.json({ code });
  } catch (error: any) {
    console.error("GROQ ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
}
