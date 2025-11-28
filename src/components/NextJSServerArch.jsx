'use client';
import React, { useState } from 'react';
import { FileText, Folder, Code, Globe, ArrowRight, AlertCircle } from 'lucide-react';

export default function NextJSRoutingGuide() {
  const [selectedTab, setSelectedTab] = useState('basics');

  const tabs = [
    { id: 'basics', label: 'The Basics' },
    { id: 'pages', label: 'Page Routes' },
    { id: 'api', label: 'API Routes' },
    { id: 'special', label: 'Special Files' },
    { id: 'examples', label: 'Real Examples' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Next.js Routing Explained
        </h1>
        <p className="text-purple-200 text-center mb-8">
          File Structure = URL Structure (It's that simple!)
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-800 text-purple-200 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl">
          {selectedTab === 'basics' && <BasicsTab />}
          {selectedTab === 'pages' && <PagesTab />}
          {selectedTab === 'api' && <APITab />}
          {selectedTab === 'special' && <SpecialFilesTab />}
          {selectedTab === 'examples' && <ExamplesTab />}
        </div>
      </div>
    </div>
  );
}

function BasicsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          The Golden Rule
        </h2>
        <p className="text-xl text-white font-semibold mb-2">
          Your folder structure IS your URL structure
        </p>
        <p className="text-purple-200">
          Whatever folders you create in the <code className="bg-slate-900 px-2 py-1 rounded">app/</code> directory 
          become URLs in your app. It's literally that simple.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-lg p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            File Structure
          </h3>
          <pre className="text-sm text-green-300 font-mono">
{`app/
├── page.tsx          
├── about/
│   └── page.tsx      
└── contact/
    └── page.tsx`}
          </pre>
        </div>

        <div className="bg-slate-900 rounded-lg p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            URLs Created
          </h3>
          <div className="space-y-2 text-sm">
            <RouteMapping folder="app/" url="/" />
            <RouteMapping folder="app/about/" url="/about" />
            <RouteMapping folder="app/contact/" url="/contact" />
          </div>
        </div>
      </div>

      <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-300 mb-3">Key Concepts:</h3>
        <ul className="space-y-2 text-blue-100">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>Folders</strong> create URL segments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>page.tsx</strong> makes a folder publicly accessible</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>Without page.tsx</strong>, the folder is NOT a route (just organization)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function PagesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">Page Routes (UI Pages)</h2>
      
      <div className="bg-slate-900 rounded-lg p-6">
        <h3 className="text-lg font-bold text-green-300 mb-3">The page.tsx File</h3>
        <p className="text-purple-200 mb-4">
          A <code className="bg-slate-800 px-2 py-1 rounded">page.tsx</code> file makes a route publicly accessible.
          It's the UI that users see.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-purple-300 mb-2 font-semibold">File Structure:</p>
            <pre className="bg-slate-950 p-4 rounded text-green-300 text-sm">
{`app/
├── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── dashboard/
    ├── page.tsx
    └── settings/
        └── page.tsx`}
            </pre>
          </div>
          
          <div>
            <p className="text-sm text-purple-300 mb-2 font-semibold">URLs Created:</p>
            <div className="space-y-2">
              <RouteBox url="/" file="app/page.tsx" />
              <RouteBox url="/blog" file="app/blog/page.tsx" />
              <RouteBox url="/blog/my-post" file="app/blog/[slug]/page.tsx" />
              <RouteBox url="/dashboard" file="app/dashboard/page.tsx" />
              <RouteBox url="/dashboard/settings" file="app/dashboard/settings/page.tsx" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-300 mb-3">Example page.tsx</h3>
        <pre className="bg-slate-950 p-4 rounded text-sm overflow-x-auto">
          <code className="text-purple-300">
{`// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page is at /about</p>
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}

function APITab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">API Routes (Backend Endpoints)</h2>
      
      <div className="bg-slate-900 rounded-lg p-6">
        <h3 className="text-lg font-bold text-green-300 mb-3">The route.ts File</h3>
        <p className="text-purple-200 mb-4">
          A <code className="bg-slate-800 px-2 py-1 rounded">route.ts</code> file creates a backend API endpoint.
          It handles HTTP requests (GET, POST, etc.)
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-purple-300 mb-2 font-semibold">File Structure:</p>
            <pre className="bg-slate-950 p-4 rounded text-green-300 text-sm">
{`app/
└── api/
    ├── hello/
    │   └── route.ts
    ├── no/
    │   └── route.ts
    └── users/
        └── [id]/
            └── route.ts`}
            </pre>
          </div>
          
          <div>
            <p className="text-sm text-purple-300 mb-2 font-semibold">API Endpoints Created:</p>
            <div className="space-y-2">
              <APIBox method="GET" url="/api/hello" file="app/api/hello/route.ts" />
              <APIBox method="GET" url="/api/no" file="app/api/no/route.ts" />
              <APIBox method="GET" url="/api/users/123" file="app/api/users/[id]/route.ts" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-300 mb-3">Example route.ts</h3>
        <pre className="bg-slate-950 p-4 rounded text-sm overflow-x-auto">
          <code className="text-purple-300">
{`// app/api/no/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // This runs on the SERVER
  const response = await fetch('https://external-api.com');
  const data = await response.json();
  
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Handle POST request
  return Response.json({ success: true });
}`}
          </code>
        </pre>
      </div>

      <div className="bg-red-900/30 border border-red-500 rounded-lg p-6">
        <h3 className="text-lg font-bold text-red-300 mb-3">⚠️ Important Rules</h3>
        <ul className="space-y-2 text-red-100">
          <li className="flex items-start gap-2">
            <span className="text-red-400 font-bold">•</span>
            <span>You CANNOT have both <code className="bg-slate-900 px-2 py-1 rounded">page.tsx</code> and <code className="bg-slate-900 px-2 py-1 rounded">route.ts</code> in the same folder</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 font-bold">•</span>
            <span><code className="bg-slate-900 px-2 py-1 rounded">route.ts</code> is for API endpoints only (returns JSON/data)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 font-bold">•</span>
            <span><code className="bg-slate-900 px-2 py-1 rounded">page.tsx</code> is for UI pages only (returns JSX/HTML)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SpecialFilesTab() {
  const specialFiles = [
    { name: 'page.tsx', purpose: 'Makes a route publicly accessible (UI)', color: 'green' },
    { name: 'route.ts', purpose: 'Creates an API endpoint (Backend)', color: 'blue' },
    { name: 'layout.tsx', purpose: 'Shared UI wrapper for child routes', color: 'purple' },
    { name: 'loading.tsx', purpose: 'Loading UI while page loads', color: 'yellow' },
    { name: 'error.tsx', purpose: 'Error UI when something breaks', color: 'red' },
    { name: 'not-found.tsx', purpose: '404 page for this route', color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">Special Files in Next.js</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {specialFiles.map(file => (
          <div key={file.name} className={`bg-slate-900 border-l-4 border-${file.color}-500 rounded-lg p-4`}>
            <h3 className={`font-mono font-bold text-${file.color}-300 mb-2`}>{file.name}</h3>
            <p className="text-purple-200 text-sm">{file.purpose}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-lg p-6">
        <h3 className="text-lg font-bold text-purple-300 mb-3">Example Folder Structure</h3>
        <pre className="bg-slate-950 p-4 rounded text-green-300 text-sm">
{`app/
└── dashboard/
    ├── layout.tsx       ← Wraps all dashboard pages
    ├── loading.tsx      ← Shows while dashboard loads
    ├── error.tsx        ← Shows if dashboard errors
    ├── page.tsx         ← /dashboard page
    └── settings/
        └── page.tsx     ← /dashboard/settings page`}
        </pre>
      </div>
    </div>
  );
}

function ExamplesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">Your Noracle App Structure</h2>
      
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-green-300 mb-3">Your File Structure</h3>
            <pre className="bg-slate-950 p-4 rounded text-green-300 text-sm">
{`app/
├── page.tsx
├── layout.tsx
└── api/
    └── no/
        └── route.ts

src/
├── components/
│   └── ChatBot.tsx
└── lib/
    └── api.ts`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-bold text-purple-300 mb-3">What They Do</h3>
            <div className="space-y-3 text-sm">
              <FileExplanation 
                file="app/page.tsx"
                url="/"
                desc="Homepage with your chatbot"
              />
              <FileExplanation 
                file="app/api/no/route.ts"
                url="/api/no"
                desc="API endpoint (server-side)"
              />
              <FileExplanation 
                file="src/components/ChatBot.tsx"
                url="(no URL)"
                desc="React component (used by pages)"
              />
              <FileExplanation 
                file="src/lib/api.ts"
                url="(no URL)"
                desc="Helper functions (not a route)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-300 mb-3">The Request Flow</h3>
        <div className="space-y-4">
          <FlowStep num="1" desc="User visits yourdomain.com/" result="app/page.tsx renders" />
          <FlowStep num="2" desc="Page displays <ChatBot /> component" result="src/components/ChatBot.tsx renders" />
          <FlowStep num="3" desc="User types message & clicks send" result="ChatBot calls getNoReason()" />
          <FlowStep num="4" desc="getNoReason() fetches /api/no" result="app/api/no/route.ts handles it" />
          <FlowStep num="5" desc="route.ts calls external API" result="Returns response to ChatBot" />
          <FlowStep num="6" desc="ChatBot displays bot message" result="User sees the response" />
        </div>
      </div>

      <div className="bg-green-900/30 border border-green-500 rounded-lg p-6">
        <h3 className="text-lg font-bold text-green-300 mb-3">✅ Remember:</h3>
        <ul className="space-y-2 text-green-100">
          <li>• Only files named <code className="bg-slate-900 px-2 py-1 rounded">page.tsx</code> or <code className="bg-slate-900 px-2 py-1 rounded">route.ts</code> create routes</li>
          <li>• Everything else is just organization (components, utils, etc.)</li>
          <li>• The <code className="bg-slate-900 px-2 py-1 rounded">app/</code> folder structure = your URL structure</li>
        </ul>
      </div>
    </div>
  );
}

// Helper Components
function RouteMapping({ folder, url }) {
  return (
    <div className="flex items-center gap-2 text-purple-200">
      <code className="bg-slate-950 px-3 py-1 rounded text-green-300">{folder}</code>
      <ArrowRight className="w-4 h-4 text-purple-400" />
      <code className="bg-slate-950 px-3 py-1 rounded text-blue-300">{url}</code>
    </div>
  );
}

function RouteBox({ url, file }) {
  return (
    <div className="bg-slate-950 p-3 rounded flex items-center justify-between">
      <span className="text-blue-300 font-mono">{url}</span>
      <span className="text-purple-300 text-xs">{file}</span>
    </div>
  );
}

function APIBox({ method, url, file }) {
  return (
    <div className="bg-slate-950 p-3 rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-green-400 font-mono text-xs font-bold">{method}</span>
        <span className="text-blue-300 font-mono">{url}</span>
      </div>
      <span className="text-purple-300 text-xs">{file}</span>
    </div>
  );
}

function FileExplanation({ file, url, desc }) {
  return (
    <div className="bg-slate-950 p-3 rounded">
      <div className="font-mono text-green-300 text-xs mb-1">{file}</div>
      <div className="text-blue-300 font-mono text-sm mb-1">{url}</div>
      <div className="text-purple-200 text-xs">{desc}</div>
    </div>
  );
}

function FlowStep({ num, desc, result }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
        {num}
      </div>
      <div className="flex-1">
        <div className="text-purple-200 mb-1">{desc}</div>
        <div className="text-green-300 text-sm flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          {result}
        </div>
      </div>
    </div>
  );
}