"use client";

import dynamic from "next/dynamic";

const PageContent = dynamic(() => import("./PageClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex flex-col" style={{ background: "#0B0D10" }}>
      {/* Loading skeleton nav bar */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(11,13,16,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded skeleton-shimmer" />
              <div className="w-20 h-4 rounded skeleton-shimmer" />
              <div className="w-8 h-4 rounded-full skeleton-shimmer" />
            </div>
            <div className="hidden sm:block flex-1 mx-4 gap-1 px-1">
              <div className="flex gap-1">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="w-16 h-7 rounded-lg skeleton-shimmer" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-lg skeleton-shimmer" />
              ))}
            </div>
          </div>
        </div>
      </nav>
      {/* Loading skeleton content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="flex gap-2 mb-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-24 h-7 rounded-full skeleton-shimmer" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-xl p-5 space-y-3" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between">
                <div className="w-24 h-4 rounded skeleton-shimmer" />
                <div className="w-7 h-7 rounded-lg skeleton-shimmer" />
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 rounded skeleton-shimmer" />
                <div className="w-3/4 h-3 rounded skeleton-shimmer" />
                <div className="w-5/6 h-3 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Loading footer */}
      <footer className="mt-auto py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
          <div className="w-48 h-3 rounded skeleton-shimmer" />
        </div>
      </footer>
    </div>
  ),
});

export default function Home() {
  return <PageContent />;
}
