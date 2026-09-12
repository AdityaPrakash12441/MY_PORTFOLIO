'use client';

import { useState } from 'react';

interface SafariWindowProps {
  onClose?: () => void;
}

type TabType = 'start' | 'google' | 'google-results' | 'github' | 'linkedin' | 'external';

interface SearchResult {
  title: string;
  displayUrl: string;
  url: string;
  snippet: string;
}

const DEFAULT_RESULTS: SearchResult[] = [
  {
    title: "Aditya Prakash | AI & Security Systems · Student Portfolio",
    displayUrl: "aditya.dev",
    url: "https://aditya.dev",
    snippet: "Interactive macOS-themed portfolio. Explore my tech stack via terminal, browse projects (DPI Engine, RECALL DSA), or get in touch. Built with Next.js."
  },
  {
    title: "AdityaPrakash12441 (Aditya Prakash) · GitHub",
    displayUrl: "github.com › AdityaPrakash12441",
    url: "https://github.com/AdityaPrakash12441",
    snippet: "Aditya Prakash — Software Engineering Student. Repositories include DPI Engine (C++17 networking) and RECALL DSA (RAG pipeline with LangChain & Qdrant)."
  },
  {
    title: "Aditya Prakash - Software Engineering Student - LinkedIn",
    displayUrl: "linkedin.com › in › aditya-prakash-124029330",
    url: "https://linkedin.com/in/aditya-prakash-124029330",
    snippet: "B.Tech CSE student at Manipal University Jaipur. Experienced in C++, Python, LLM-based apps, vector search, and networking systems."
  }
];

export default function SafariWindow({ onClose }: SafariWindowProps) {
  const [currentTab, setCurrentTab] = useState<TabType>('start');
  const [urlInput, setUrlInput] = useState('Safari Start Page');
  const [searchQuery, setSearchQuery] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dotsHovered, setDotsHovered] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(DEFAULT_RESULTS);
  const [isSearching, setIsSearching] = useState(false);
  const [resultCount, setResultCount] = useState("124,000");
  const [searchTime, setSearchTime] = useState("0.28");

  const navigateTo = (tab: TabType, newUrl: string, iframe: string = '') => {
    setCurrentTab(tab);
    setUrlInput(newUrl);
    if (iframe) setIframeUrl(iframe);
  };

  const executeSearch = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
    navigateTo('google-results', `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`);
    setIsSearching(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed })
      });
      const data = await res.json();
      if (data.results && Array.isArray(data.results) && data.results.length > 0) {
        setSearchResults(data.results);
        setResultCount((Math.floor(Math.random() * 400 + 50) * 1000).toLocaleString());
        setSearchTime((Math.random() * 0.25 + 0.15).toFixed(2));
      } else {
        setSearchResults(DEFAULT_RESULTS);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults(DEFAULT_RESULTS);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = urlInput.trim();
    if (!query) return;

    if (query.toLowerCase() === 'safari' || query.toLowerCase() === 'start') {
      navigateTo('start', 'Safari Start Page');
    } else if (query.toLowerCase().includes('google.com') && !query.includes('search')) {
      navigateTo('google', 'https://www.google.com');
    } else if (query.toLowerCase().includes('github.com/aditya') || query.toLowerCase() === 'github') {
      navigateTo('github', 'https://github.com/AdityaPrakash12441');
    } else if (query.toLowerCase().includes('linkedin.com') || query.toLowerCase() === 'linkedin') {
      navigateTo('linkedin', 'https://linkedin.com/in/aditya-prakash-124029330');
    } else if (/^https?:\/\//i.test(query) || (query.includes('.') && !query.includes(' '))) {
      // Treat as URL
      let formattedUrl = query;
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = 'https://' + formattedUrl;
      }
      navigateTo('external', formattedUrl, formattedUrl);
    } else {
      // Treat as a search query
      executeSearch(query);
    }
  };

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    executeSearch(searchQuery);
  };

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="cursor-pointer bg-neutral-800 text-white/50 px-4 py-2 rounded-lg border border-white/10 text-xs flex items-center gap-2 hover:bg-neutral-700 transition-all shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
        <span>Safari (minimized) - click to restore</span>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#1c1c1e] select-none overflow-hidden shadow-2xl flex flex-col transition-all duration-300"
      style={{
        width: isMaximized ? '100%' : 780,
        height: isMaximized ? 'calc(100vh - 80px)' : 500,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
      }}
    >
      {/* --- Toolbar --- */}
      <div 
        className="window-handle cursor-grab active:cursor-grabbing flex items-center justify-between px-4 py-2.5 bg-[#2a2a2c] border-b border-white/[0.07] gap-4"
        onMouseEnter={() => setDotsHovered(true)}
        onMouseLeave={() => setDotsHovered(false)}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-[7px] flex-shrink-0">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 active:brightness-75 transition-all flex items-center justify-center" title="Close">
            {dotsHovered && (
                <svg viewBox="0 0 6 6" fill="none" className="w-[7px] h-[7px]">
                    <path d="M1 1l4 4M5 1L1 5" stroke="#7a1f1f" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            )}
          </button>
          <button onClick={() => setIsMinimized(true)} className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-110 active:brightness-75 transition-all" title="Minimize" />
          <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 active:brightness-75 transition-all" title="Maximize" />
        </div>

        {/* Back / Forward Controls */}
        <div className="flex items-center gap-2.5 text-white/30 flex-shrink-0">
          <button onClick={() => navigateTo('start', 'Safari Start Page')} className="hover:text-white/70 transition-colors cursor-pointer" title="Home">
            <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 max-w-[480px]">
          <div className="relative flex items-center w-full bg-[#1e1e1f] border border-white/[0.06] rounded-md px-3 py-1 text-white/70 hover:bg-[#252526] transition-colors focus-within:bg-[#1a1a1b] focus-within:border-sky-500/50">
            {/* SSL Lock if not start page */}
            {currentTab !== 'start' && (
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-emerald-400 mr-2 flex-shrink-0" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white/90 selection:bg-sky-600/30"
              placeholder="Search or enter website name"
            />
            {/* Open in new window/tab button */}
            {currentTab === 'external' && (
              <button
                type="button"
                onClick={() => window.open(iframeUrl, '_blank')}
                className="text-sky-400 hover:text-sky-300 transition-colors ml-1.5 flex-shrink-0 cursor-pointer text-[10px] font-bold"
                title="Open in real new tab"
              >
                ↗
              </button>
            )}
          </div>
        </form>

        {/* Action icons */}
        <div className="flex items-center gap-3 text-white/45 flex-shrink-0">
          <button className="hover:text-white/80 transition-colors cursor-pointer" title="Tabs">
            <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <rect x="7" y="7" width="10" height="10" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- Browser Window Content Pane --- */}
      <div className="flex-1 bg-[#1a1a1c] overflow-y-auto relative text-white flex flex-col">

        {/* ==================== 1. START / FAVORITES PAGE ==================== */}
        {currentTab === 'start' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1c1c1e] to-[#121214]">
            <h2 className="text-2xl font-light mb-8 text-white/90">Favorites</h2>

            <div className="grid grid-cols-4 gap-8 max-w-lg w-full">
              {/* Google Link */}
              <div
                onClick={() => { navigateTo('google', 'https://www.google.com'); setSearchQuery(''); }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <span className="text-2xl font-bold text-blue-500">G</span>
                </div>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">Google</span>
              </div>

              {/* GitHub Link */}
              <div
                onClick={() => window.open('https://github.com/AdityaPrakash12441', '_blank')}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-lg border border-white/10 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">GitHub</span>
              </div>

              {/* LinkedIn Link */}
              <div
                onClick={() => window.open('https://linkedin.com/in/aditya-prakash-124029330', '_blank')}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0077b5] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">LinkedIn</span>
              </div>

              {/* LeetCode Link */}
              <div
                onClick={() => window.open('https://leetcode.com/u/Aditya_prakash_1/', '_blank')}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FFA116] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <span className="text-white text-xs font-bold font-sans">LC</span>
                </div>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">LeetCode</span>
              </div>

            </div>

            <div className="mt-16 text-center max-w-sm">
              <p className="text-xs text-white/40 leading-relaxed">
                Tip: Enter any web URL in the address bar at the top, or click Google to perform custom queries.
              </p>
            </div>
          </div>
        )}

        {/* ==================== 2. MOCK GOOGLE HOMEPAGE ==================== */}
        {currentTab === 'google' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#202124] text-white">
            <h1 className="text-5xl font-semibold mb-8 tracking-tight">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </h1>

            <form onSubmit={handleGoogleSearch} className="w-full max-w-xl">
              <div className="flex items-center w-full bg-[#303134] hover:bg-[#3c4043] border border-transparent rounded-full px-5 py-2.5 text-white/90 shadow transition-colors">
                <svg className="w-4 h-4 text-white/45 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Google or type a URL"
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>

              <div className="flex justify-center gap-3 mt-8">
                <button type="submit" className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-xs font-medium text-white/90 border border-transparent active:border-white/20 transition-all">
                  Google Search
                </button>
                <button
                  type="button"
                  onClick={() => executeSearch('Aditya Prakash portfolio')}
                  className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] rounded text-xs font-medium text-white/90 border border-transparent active:border-white/20 transition-all"
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== 3. DYNAMIC GOOGLE SEARCH RESULTS ==================== */}
        {currentTab === 'google-results' && (
          <div className="flex-1 bg-[#202124] text-white p-6 flex flex-col font-sans select-text overflow-y-auto">
            {/* Header info with interactive search bar */}
            <div className="flex items-center gap-4 pb-4 border-b border-[#303134] mb-4 flex-shrink-0">
              <span className="text-xl font-bold text-blue-500 cursor-pointer flex-shrink-0" onClick={() => navigateTo('google', 'https://www.google.com')}>Google</span>
              <form onSubmit={(e) => { e.preventDefault(); executeSearch(searchQuery); }} className="flex-1 max-w-xl">
                <div className="flex items-center bg-[#303134] hover:bg-[#3c4043] rounded-full px-4 py-1.5 text-xs text-white/90 transition-colors">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-xs text-white/90"
                    placeholder="Search Google or ask about Aditya..."
                  />
                  {isSearching ? (
                    <div className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin ml-2 flex-shrink-0" />
                  ) : (
                    <button type="submit" className="text-white/40 hover:text-white/80 ml-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            </div>

            <p className="text-xs text-white/40 mb-5">
              {isSearching ? "Searching with Gemini..." : `About ${resultCount} results (${searchTime} seconds)`}
            </p>

            {/* Results or Loading Skeleton */}
            {isSearching ? (
              <div className="space-y-6 max-w-xl animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-2.5 bg-white/10 rounded w-40" />
                    <div className="h-4 bg-sky-500/25 rounded w-72" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : (
              searchResults.map((item, idx) => (
                <div key={idx} className="mb-6 max-w-xl">
                  <span className="text-[11px] text-white/50 block">{item.displayUrl}</span>
                  <h3
                    onClick={() => {
                      if (item.url.startsWith('http')) {
                        window.open(item.url, '_blank');
                      } else if (item.url === 'start') {
                        navigateTo('start', 'Safari Start Page');
                      } else {
                        window.open(item.url, '_blank');
                      }
                    }}
                    className="text-sky-400 hover:underline cursor-pointer text-lg font-medium leading-tight mt-0.5"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 leading-normal">
                    {item.snippet}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* ==================== 4. MOCK GITHUB PROFILE ==================== */}
        {currentTab === 'github' && (
          <div className="flex-1 bg-[#0d1117] text-[#c9d1d9] font-sans p-6 select-text flex flex-col">
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-[#21262d] mb-6">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#f0f6fc]">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-semibold text-[#f0f6fc]">github.com</span>
              </div>
              <button onClick={() => window.open('https://github.com/AdityaPrakash12441', '_blank')} className="px-3 py-1 bg-[#21262d] hover:bg-[#30363d] rounded text-xs font-semibold text-[#c9d1d9] border border-[#30363d]">
                Open in Github
              </button>
            </div>

            <div className="flex gap-6">
              {/* Sidebar Info */}
              <div className="w-1/3 flex flex-col items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden border border-[#30363d] mb-4">
                  <img src="/images/dp.jpeg" alt="Avatar" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                </div>
                <h2 className="text-xl font-bold text-[#f0f6fc]">Aditya Prakash</h2>
                <span className="text-sm text-[#8b949e]">AdityaPrakash12441</span>
                <p className="text-xs text-[#8b949e] mt-4 text-center">
                  Software Engineering Student | Building AI-native and security-focused systems with C++ and Python.
                </p>
              </div>

              {/* Repositories */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-[#f0f6fc] border-b border-[#21262d] pb-2 mb-4">Popular Repositories</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-[#30363d] rounded-md bg-[#161b22]">
                    <h4 className="text-xs font-bold text-[#58a6ff]">dpi-engine</h4>
                    <p className="text-[10px] text-[#8b949e] mt-1">C++17 Deep Packet Inspection engine with stateful flow tracking, TLS SNI inspection, and multithreaded pipeline.</p>
                    <span className="inline-block mt-3 text-[9px] text-blue-400">● C++</span>
                  </div>

                  <div className="p-3 border border-[#30363d] rounded-md bg-[#161b22]">
                    <h4 className="text-xs font-bold text-[#58a6ff]">recall-dsa-rag</h4>
                    <p className="text-[10px] text-[#8b949e] mt-1">Timestamp-aware RAG pipeline for 50+ hours of DSA lectures using MLX-Whisper, Qdrant, and BGE-M3.</p>
                    <span className="inline-block mt-3 text-[9px] text-yellow-500">● Python</span>
                  </div>

                  <div className="p-3 border border-[#30363d] rounded-md bg-[#161b22]">
                    <h4 className="text-xs font-bold text-[#58a6ff]">mac-portfolio</h4>
                    <p className="text-[10px] text-[#8b949e] mt-1">A portfolio mimicking the macOS desktop and windowing workspace. Built with Next.js and TypeScript.</p>
                    <span className="inline-block mt-3 text-[9px] text-[#3178c6]">● TypeScript</span>
                  </div>

                  <div className="p-3 border border-[#30363d] rounded-md bg-[#161b22]">
                    <h4 className="text-xs font-bold text-[#58a6ff]">nlp-data-cleaner</h4>
                    <p className="text-[10px] text-[#8b949e] mt-1">LLM-powered pipeline to correct phonetic hallucinations in Hinglish domain audio transcripts.</p>
                    <span className="inline-block mt-3 text-[9px] text-yellow-500">● Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. MOCK LINKEDIN CARD ==================== */}
        {currentTab === 'linkedin' && (
          <div className="flex-1 bg-[#f3f3f3] text-neutral-800 font-sans p-6 select-text flex flex-col justify-center items-center">
            {/* Header info */}
            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-md">
              <div className="h-24 bg-gradient-to-r from-sky-600 to-indigo-600 relative">
                <button
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="absolute top-2 right-2 px-2 py-0.5 bg-black/35 hover:bg-black/50 text-[10px] text-white rounded font-bold"
                >
                  Visit LinkedIn ↗
                </button>
              </div>

              <div className="px-6 pb-6 relative flex flex-col items-center">
                {/* Photo */}
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden -mt-12 shadow-sm mb-3">
                  <img src="/images/dp.jpeg" alt="Avatar" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                </div>

                <h2 className="text-lg font-bold text-neutral-800">Aditya Prakash</h2>
                <p className="text-xs text-neutral-500 text-center font-medium mt-0.5">Software Engineering Student · AI & Security Systems</p>
                <p className="text-[10px] text-neutral-400 mt-1">Building AI-native systems at Manipal University Jaipur.</p>

                <div className="w-full border-t border-neutral-100 my-4" />

                <div className="w-full">
                  <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">Education</h3>

                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-sky-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-sky-700">MUJ</div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">B.Tech — Computer Science Engineering</h4>
                      <p className="text-[10px] text-neutral-500">Manipal University Jaipur · Full-time</p>
                      <p className="text-[9px] text-neutral-400">July 2024 – July 2028</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-700">OCI</div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">Oracle Cloud AI Foundations Associate</h4>
                      <p className="text-[10px] text-neutral-500">Oracle · Certification</p>
                      <p className="text-[9px] text-neutral-400">2025</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 6. EXTERNAL IFRAME FALLBACK ==================== */}
        {currentTab === 'external' && (
          <div className="flex-1 bg-white relative flex flex-col h-full w-full">
            <iframe
              src={iframeUrl}
              className="w-full h-full border-none flex-1"
              title="Safari Embedded Browser"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
            {/* Notice text in case embedding is blocked */}
            <div className="bg-neutral-900 border-t border-white/5 text-[10px] text-white/60 p-2.5 flex justify-between items-center px-4">
              <span>⚠️ External websites may block embedded views. If the page is blank:</span>
              <button
                onClick={() => window.open(iframeUrl, '_blank')}
                className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                Open in New Tab ↗
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
