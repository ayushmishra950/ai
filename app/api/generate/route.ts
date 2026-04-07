



// y code sahi kaam kar rha hai or design bhi sahi bana rha hai 
//===============================================================
//===============================================================

// import Groq from "groq-sdk";
// import { NextResponse } from "next/server";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     if (!process.env.GROQ_API_KEY) {
//       return NextResponse.json({ error: "Groq API Key missing" }, { status: 500 });
//     }

//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: `You are a World-Class UI/UX Designer & Senior React Developer (Stripe, Vercel, Apple style).
          
//           DESIGN RULES:
//           1. DARK MODE FIRST: Use deep blacks (#020202) or rich navy (#050816).
//           2. LUXURY AESTHETIC: Use thin borders (border-white/10), heavy backdrop-blur (bg-white/5), and rounded-3xl corners.
//           3. TYPOGRAPHY: Use tracking-tight for headings and leading-relaxed for text.
//           4. NO BASIC COLORS: Use specific hex like #6366f1 (Indigo), #8b5cf6 (Violet), #10b981 (Emerald). 
//           5. EFFECTS: Use Mesh gradients, glowing hover states (hover:shadow-blue-500/20), and subtle 'animate-pulse' on accent dots.
//           6. BENTO GRID: If multiple elements are needed, arrange them in a sleek Bento box layout.
          
//           CODE RULES:
//           - NO imports. 
//           - Define 'const GeneratedComponent = () => { ... }'.
//           - Use Lucide icons directly (e.g., <ArrowRight />) if needed.
//           - ALWAYS end with 'render(<GeneratedComponent />);'.
//           - Return ONLY code, no explanations or markdown backticks.`
//         },
//         { 
//           role: "user", 
//           content: `Create a breathtaking, highly-functional, and unique React component for: "${prompt}". Make it look like a $10,000 custom website design.` 
//         }
//       ],
//       model: "llama-3.3-70b-versatile",
//       temperature: 0.9, 
//     });

//     let code = chatCompletion.choices?.[0]?.message?.content || "";

//     // 1. Cleaning Markdown
//     code = code.replace(/```jsx|```javascript|```tsx|```/g, "").trim();

//     // 2. Extra Clean-up (Remove all Import lines)
//     code = code.split('\n')
//       .filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('export '))
//       .join('\n');

//     // 3. Ensuring Render
//     if (!code.includes("render(")) {
//       if (code.includes("const GeneratedComponent")) {
//         code += "\n\nrender(<GeneratedComponent />);";
//       } else {
//         // If AI forgot the name, wrap the whole thing
//         code = `const GeneratedComponent = () => {\n  return (\n    <>${code}</>\n  );\n};\n\nrender(<GeneratedComponent />);`;
//       }
//     }

//     return NextResponse.json({ code });
//   } catch (error: any) {
//     console.error("GROQ ERROR:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } 
// }












// import Groq from "groq-sdk";
// import { NextResponse } from "next/server";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: `You are a Senior Web Architect. Generate a FLOTLESS, clean React landing page.
          
//           FIXING COMMON ISSUES:
//           1. NO OVERLAP: Use 'flex flex-col' or 'grid' with 'gap-8' or 'gap-12'. NEVER use absolute positioning for main text.
//           2. SPACING: Use 'py-20' and 'px-6' for sections to prevent crowding.
//           3. IMAGES: Use only this format: <img src="https://unsplash.com?{keyword}" className="w-full h-[400px] object-cover rounded-2xl" />. Replace {keyword} with things like 'gym', 'coffee', 'tech'.
//           4. LAYOUT: Navbar (fixed top), Hero (split 50/50 image & text), Features (3-cols), Footer.
          
//           STRICT CODE RULES:
//           - NO imports, NO exports.
//           - Use Lucide icons: <ArrowRight />, <Check />, <Zap />.
//           - Use Tailwind only. Wrap in 'const GeneratedComponent = () => { return (...) };'
//           - End with 'render(<GeneratedComponent />);'.`
//         },
//         { 
//           role: "user", 
//           content: `Design a premium, professional landing page for: "${prompt}". Ensure no text overlaps and images are clearly visible.` 
//         }
//       ],
//       model: "llama-3.3-70b-versatile",
//       temperature: 0.5, // Reduced to 0.5 for high stability and less errors
//     });

//     let code = chatCompletion.choices?.[0]?.message?.content || "";
    
//     // 1. Clean Markdown
//     code = code.replace(/```jsx|```javascript|```tsx|```/g, "").trim();
    
//     // 2. Remove broken imports/exports
//     code = code.split('\n')
//       .filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('export '))
//       .join('\n');

//     // 3. Image URL Fixer (Force Unsplash if AI fails)
//     code = code.replace(/src="[^"]*unsplash[^"]*"/g, (match) => {
//         if(!match.includes("://unsplash.com")) {
//             return `src="https://unsplash.com?business"`;
//         }
//         return match;
//     });

//     if (!code.includes("render(")) {
//       code += "\n\nrender(<GeneratedComponent />);";
//     }

//     return NextResponse.json({ code });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } 
// }




import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a World-Class UI/UX Architect. 
          
          ICON RULES (CRITICAL):
          1. ALL Lucide icons MUST have fixed sizes. Example: <Zap className="w-8 h-8 text-blue-500" />.
          2. NEVER use icons without className. Standard sizes: Hero (w-12 h-12), Features (w-8 h-8), Buttons (w-5 h-5).

          IMAGE RULES:
          1. Use ONLY: <img src="https://unsplash.com[ID]?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover rounded-[2rem]" />.
          2. IDs: Tech (1519389950473-47ba0277781c), Business (1497215728101-856f4ea42174), Gym (1534438346910-13f942ba769d), Coffee (1495474472287-4d71bcdd2085).

          STRUCTURE:
          1. Use 'flex flex-col' for layout. Sections MUST have 'py-24 px-6 md:px-20' and 'bg-[#020617]'.
          2. Wrap content in <div className="max-w-7xl mx-auto">.
          3. NO imports/exports. Wrap in 'const GeneratedComponent = () => { return (...) };' and end with 'render(<GeneratedComponent />);'.`
        },
        { 
          role: "user", 
          content: `Build an ultra-premium landing page for: "${prompt}". Focus on small balanced icons and massive spacing.` 
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2, 
    });

    let code = chatCompletion.choices?.[0]?.message?.content || "";
    
    // Cleaning
    code = code.replace(/```(?:jsx|tsx|javascript|js)?\n?|```/g, "").trim();
    const componentStart = code.indexOf("const GeneratedComponent");
    if (componentStart !== -1) code = code.substring(componentStart);
    
    code = code.split('\n').filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('export ')).join('\n');

    // Fix Images & Icons
    code = code.replace(/https:\/\/unsplash\.com/g, "https://unsplash.com");
    code = code.replace(/<([A-Z][a-zA-Z0-9]+)\s*\/>/g, '<$1 className="w-6 h-6" />');

    if (!code.includes("render(")) code += "\n\nrender(<GeneratedComponent />);";

    return NextResponse.json({ code });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
}
