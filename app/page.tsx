"use client";
import { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as LucideIcons from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // 'desktop' or 'mobile'

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt!");
    setLoading(true);
    try {
      const res = await fetch("/api/generate", { 
        method: "POST", 
        body: JSON.stringify({ prompt }) 
      });
      const data = await res.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadAsHTML = () => {
    const cleanContent = generatedCode
      .replace(/render\(.*\);/g, "")
      .replace(/const GeneratedComponent = \(\) => {/g, "")
      .replace(/return \(/g, "")
      .replace(/\);/g, "")
      .replace(/};/g, "")
      .trim();

    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://tailwindcss.com"></script>
        <style>body { background: #020617; color: white; margin: 0; font-family: sans-serif; }</style>
      </head>
      <body>${cleanContent}</body>
      </html>
    `;
    const element = document.createElement("a");
    const file = new Blob([fullHTML], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "MyWebsite.html";
    element.click();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      {/* Header & Input */}
      <div className="max-w-4xl mx-auto text-center space-y-6 pt-10">
        <h1 className="text-5xl font-black tracking-tight text-white italic">AI WEBSITE BUILDER</h1>
        <div className="relative flex bg-slate-900 border border-white/10 p-2 rounded-2xl shadow-2xl">
          <input 
            className="bg-transparent flex-1 p-4 outline-none text-white"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A luxury skincare brand landing page..."
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all"
          >
            {loading ? "Building..." : "Build Now"}
          </button>
        </div>
      </div>

      {generatedCode && (
        <div className="mt-16 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-1000">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-white/5 gap-4">
            <div className="flex bg-black p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setViewMode("desktop")}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <LucideIcons.Monitor size={16} /> Desktop
              </button>
              <button 
                onClick={() => setViewMode("mobile")}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <LucideIcons.Smartphone size={16} /> Mobile
              </button>
            </div>

            <button 
              onClick={downloadAsHTML} 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <LucideIcons.Download size={18} /> Export Website (.html)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- RESPONSIVE PREVIEW --- */}
            <div className="lg:col-span-2 flex justify-center bg-slate-950/50 p-4 rounded-[2.5rem] border border-white/5 min-h-[800px]">
              <div 
                className={`transition-all duration-500 ease-in-out bg-black overflow-hidden shadow-2xl relative border border-white/10 ${viewMode === 'mobile' ? 'w-[375px] rounded-[3rem] h-[667px] mt-10 ring-8 ring-slate-800' : 'w-full rounded-3xl h-auto'}`}
              >
                <LiveProvider code={generatedCode} scope={{ ...LucideIcons }} noInline={true}>
                  <div className="w-full h-full overflow-y-auto custom-scrollbar">
                    <LivePreview />
                  </div>
                  <LiveError className="absolute bottom-4 left-4 right-4 bg-red-600/90 text-white p-4 rounded-xl text-xs font-mono" />
                </LiveProvider>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-slate-900 rounded-[2rem] p-6 border border-white/10 h-full">
              <h3 className="text-xs font-black uppercase text-slate-500 mb-4 tracking-widest">Source Code</h3>
              <LiveProvider code={generatedCode} noInline={true}>
                <LiveEditor className="font-mono text-sm opacity-80" />
              </LiveProvider>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
