import React, { useState } from 'react';
import { Laptop, Cloud, CheckCircle2, Copy, Check, Server, Globe } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  return (
    <div className="space-y-8">
      {/* Direct Answer Banner: Render vs Vercel */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-medium text-indigo-700 tracking-wide">
            MODULE 04 · LOCAL LAPTOP EXECUTION & CLOUD HOSTING (RENDER VS. VERCEL)
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Running Locally on Your Laptop & Choosing Between Render and Vercel
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl">
            You asked: <em>"I have to run this project locally in my laptop, then I will publish it in Render or Vercel — which would be better for me?"</em> Here is the clear, honest engineering recommendation and exact step-by-step commands.
          </p>
        </div>

        {/* Verdict Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Winner: Render */}
          <div className="bg-emerald-50/60 border border-emerald-300 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-base">
                <Server className="w-5 h-5 text-emerald-700" />
                <span>Recommended Winner: Render (Web Service)</span>
              </div>
              <span className="text-xs font-mono-tabular font-semibold text-emerald-800">
                BEST FOR THIS PROJECT
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Why Render is better for you:</strong> This project includes both a <strong>React Frontend</strong> and an <strong>Express Node.js Backend (`server.ts`)</strong> that processes canvas images (`/api/recognize-image`) and NLP requests (`/api/analyze-text`). Render runs `server.ts` natively as a single persistent Node.js server with zero configuration changes!
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Runs both Frontend + `/api/*` Backend on a single URL automatically</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>No 10-second serverless timeout or payload truncation on image OCR uploads</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Free tier Web Service connects directly to your GitHub repository</span>
              </li>
            </ul>
          </div>

          {/* Alternative: Vercel */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-base">
                <Globe className="w-5 h-5 text-slate-700" />
                <span>Alternative Option: Vercel (Static / Serverless)</span>
              </div>
              <span className="text-xs font-mono-tabular text-slate-600">
                GOOD FOR FRONTEND-ONLY
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>When to use Vercel:</strong> Vercel is designed primarily for static frontends or Next.js serverless functions. Because we built a deterministic local CNN & N-gram engine directly into the app (`src/utils/devanagariEngine.ts`), the app will still work on Vercel as a static Vite build, but Render is better if you want the Express backend active too.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Instant global CDN deployment for the Vite static bundle (`dist/`)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Works 100% offline/client-side using our built-in deterministic engine</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step-by-Step: Part 1 (Run Locally on Laptop) & Part 2 (Deploy to Render) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Part 1: Laptop Local Setup */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <Laptop className="w-5 h-5 text-indigo-700" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Part 1: How to Run Locally on Your Laptop
              </h3>
              <p className="text-xs text-slate-500">
                Follow these 4 terminal steps on Windows, Mac, or Linux before your presentation
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 'step-node',
                step: 'Step 1: Install Node.js (v20 or v22 LTS)',
                desc: 'Download and install Node.js from nodejs.org if not already installed. Verify in your terminal:',
                cmd: 'node -v && npm -v',
              },
              {
                id: 'step-install',
                step: 'Step 2: Open Project Folder & Install Packages',
                desc: 'Unzip or clone this project folder on your laptop, open terminal inside the folder, and run:',
                cmd: 'npm install',
              },
              {
                id: 'step-env',
                step: 'Step 3: (Optional) Add Gemini API Key in .env',
                desc: 'The project works out-of-the-box without an API key using the built-in CNN & N-gram engine. To also enable Gemini Vision OCR, create a .env file:',
                cmd: 'GEMINI_API_KEY="your_api_key_here"',
              },
              {
                id: 'step-dev',
                step: 'Step 4: Start the Local Server on Port 3000',
                desc: 'Run the development server and open http://localhost:3000 in Chrome or Edge:',
                cmd: 'npm run dev',
              },
            ].map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-900">{item.step}</div>
                <p className="text-xs text-slate-600">{item.desc}</p>
                <div className="flex items-center justify-between bg-slate-900 text-slate-100 px-3.5 py-2.5 rounded-lg font-mono-tabular text-xs">
                  <code>{item.cmd}</code>
                  <button
                    type="button"
                    onClick={() => copyCommand(item.cmd, item.id)}
                    aria-label={`Copy command ${item.cmd}`}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    {copiedCmd === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Publish to Render */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <Cloud className="w-5 h-5 text-indigo-700" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Part 2: Exact Settings to Publish on Render.com
              </h3>
              <p className="text-xs text-slate-500">
                Push your code to GitHub, then create a "New Web Service" on Render with these settings
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="py-2.5 px-3.5 font-semibold">Render Setting Field</th>
                  <th className="py-2.5 px-3.5 font-semibold">Exact Value to Enter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">Runtime / Environment</td>
                  <td className="py-2.5 px-3.5 font-mono-tabular text-slate-900">Node</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">Build Command</td>
                  <td className="py-2.5 px-3.5 font-mono-tabular text-indigo-700 font-semibold">
                    npm install && npm run build
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">Start Command</td>
                  <td className="py-2.5 px-3.5 font-mono-tabular text-indigo-700 font-semibold">
                    NODE_ENV=production npm start
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">Environment Variable 1</td>
                  <td className="py-2.5 px-3.5 font-mono-tabular text-slate-800">
                    NODE_ENV = production
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">Environment Variable 2</td>
                  <td className="py-2.5 px-3.5 font-mono-tabular text-slate-800">
                    GEMINI_API_KEY = (Your key, optional)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs text-slate-700">
            <div className="font-semibold text-slate-900">
              What if you prefer Vercel instead?
            </div>
            <p className="leading-relaxed">
              If you deploy on <strong>Vercel</strong>, simply import your GitHub repository, select <strong>Vite</strong> as the Framework Preset, set Build Command to <code className="font-mono-tabular bg-white px-1 py-0.5 rounded border border-slate-200">npm run build</code>, and Output Directory to <code className="font-mono-tabular bg-white px-1 py-0.5 rounded border border-slate-200">dist</code>. All interactive character presets, drawing feature heatmaps, and 5-language N-gram classifications will work automatically in the browser!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
