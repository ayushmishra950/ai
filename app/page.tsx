"use client";
import { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as LucideIcons from "lucide-react"; // AI icons use kar sake isliye

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      
      // AI response se markdown tags (```jsx) hatane ke liye clean-up logic
      const cleanCode = data.code.replace(/```jsx|```javascript|```tsx|```/g, "").trim();
      setGeneratedCode(cleanCode);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "MyComponent.tsx";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">AI Design Generator</h1>
      
      {/* Input Area */}
      <div className="flex gap-2">
        <input 
          className="border p-3 flex-1 rounded-lg text-black outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., A modern blue pricing card with a 'Buy Now' button"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {generatedCode && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 border rounded-xl overflow-hidden shadow-lg">
          
          {/* Live Preview Area */}
          <div className="p-6 bg-white min-h-[400px]">
            <h3 className="text-sm font-semibold mb-4 text-gray-500 uppercase">Live Preview</h3>
            <LiveProvider code={generatedCode} scope={{ ...LucideIcons }}>
              <LivePreview />
              <LiveError className="text-red-500 mt-4 text-xs bg-red-50 p-2 rounded" />
            </LiveProvider>
          </div>

          {/* Code Editor & Download */}
          <div className="bg-gray-900 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Generated Code</h3>
              <button 
                onClick={downloadCode}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
              >
                Download .tsx
              </button>
            </div>
            <LiveProvider code={generatedCode}>
              <LiveEditor className="font-mono text-sm h-[350px] overflow-auto rounded border border-gray-700" />
            </LiveProvider>
          </div>

        </div>
      )}
    </div>
  );
}
