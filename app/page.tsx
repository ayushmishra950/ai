"use client";
import { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as LucideIcons from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.code) {
        setGeneratedCode(data.code);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">AI Design Engine</h1>
        
        <div className="flex gap-2 bg-white p-2 rounded-xl shadow-md">
          <input 
            className="flex-1 p-3 outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your premium UI (e.g., A modern dark pricing card)..."
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {generatedCode && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Preview Area in page.tsx */}
<div className="bg-gray-100 rounded-xl overflow-hidden border">
 <div className="p-10 bg-[#020617] min-h-[500px] flex items-center justify-center rounded-xl relative overflow-hidden">
  {/* Subtle Background Glow */}
  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(56,189,248,0.05),transparent)]" />
  
  <LiveProvider code={generatedCode} scope={{ ...LucideIcons }} noInline={true}>
    <LivePreview />
  </LiveProvider>
</div>

</div>


            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 p-2 text-xs font-bold uppercase tracking-widest text-gray-400">Source Code</div>
              <LiveProvider code={generatedCode} noInline={true}>
                <LiveEditor className="font-mono text-sm h-[400px] overflow-auto" />
              </LiveProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
