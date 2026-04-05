"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WorkflowBuilder } from "@/components/tools/WorkflowBuilder";
import { LayerComposer } from "@/components/tools/LayerComposer";
import { WebAppGenerator } from "@/components/tools/WebAppGenerator";
import { PromptDiff } from "@/components/tools/PromptDiff";
import { Pill } from "@/components/shared/Pill";

const SUB_TABS = ["Workflow Builder", "Layer Composer", "WebApp Gen", "Prompt Diff"];

export function BuilderZone() {
  const [tab, setTab] = useState("Workflow Builder");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 rounded-full" style={{ background: "#FF4FD8" }} />
        <h2 className="text-2xl font-display tracking-wide" style={{ color: "#FF4FD8" }}>BUILDER</h2>
        <span className="text-xs" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>Interactive composers</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SUB_TABS.map((t) => (
          <Pill key={t} active={tab === t} color="#FF4FD8" onClick={() => setTab(t)}>
            {t}
          </Pill>
        ))}
      </div>

      <div className="animate-fade-slide-in">
        {tab === "Workflow Builder" && <WorkflowBuilder />}
        {tab === "Layer Composer" && <LayerComposer />}
        {tab === "WebApp Gen" && <WebAppGenerator />}
        {tab === "Prompt Diff" && <PromptDiff />}
      </div>
    </motion.div>
  );
}
