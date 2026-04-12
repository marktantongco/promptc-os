"use client";

import dynamic from "next/dynamic";

const PageContent = dynamic(() => import("./PageClient"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return <PageContent />;
}
