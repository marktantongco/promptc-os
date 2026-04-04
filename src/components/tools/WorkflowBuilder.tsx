"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ANIMALS, AC, AE, CHAINS, LAYER_TPL, WEB_VARS } from "@/lib/data";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Pill } from "@/components/shared/Pill";
import { Plus, Trash2, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, animal, onRemove }: { id: string; animal: string; onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const a = ANIMALS.find((x) => x.name === animal);
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 px-3 py-2 rounded-lg" {...attributes}>
      <button {...listeners} style={{ color: "#6b7280", cursor: "grab" }}>
        <GripVertical size={14} />
      </button>
      <span className="text-lg">{a?.emoji}</span>
      <span className="text-sm flex-1" style={{ color: AC[animal] }}>{animal}</span>
      <span className="text-[10px]" style={{ color: "#6b7280" }}>{a?.mode}</span>
      <button onClick={() => onRemove(id)} style={{ color: "#6b7280" }}>
        <Trash2 size={12} />
      </button>
    </div>
  );
}

export function WorkflowBuilder() {
  const [chain, setChain] = useState<{ id: string; animal: string }[]>([]);
  const [available, setAvailable] = useState(ANIMALS.map((a) => a.name));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addToChain = (animal: string) => {
    if (chain.length >= 6) return;
    setChain([...chain, { id: `${animal}-${Date.now()}`, animal }]);
    setAvailable(available.filter((a) => a !== animal));
  };

  const removeFromChain = (id: string) => {
    const item = chain.find((c) => c.id === id);
    if (item) setAvailable([...available, item.animal]);
    setChain(chain.filter((c) => c.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setChain((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const generatePrompt = () => {
    if (chain.length === 0) return "";
    const parts = chain.map((c, i) => {
      const a = ANIMALS.find((x) => x.name === c.animal);
      return `Phase ${i + 1} — ${a?.emoji} ${c.animal} Mode (${a?.mode})\n${a?.prompt}`;
    });
    return parts.join("\n\n---\n\n");
  };

  const generatedPrompt = generatePrompt();

  return (
    <div className="space-y-4">
      <SectionLabel color="#FF4FD8">WORKFLOW CHAIN BUILDER</SectionLabel>
      <p className="text-xs" style={{ color: "#a1a1aa" }}>Select animals to build a thinking chain. Drag to reorder.</p>

      {/* Available animals */}
      <div className="flex flex-wrap gap-2">
        {available.map((animal) => (
          <button
            key={animal}
            onClick={() => addToChain(animal)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all hover:scale-105"
            style={{
              background: `${AC[animal]}12`,
              border: `1px solid ${AC[animal]}30`,
              color: AC[animal],
            }}
          >
            <Plus size={12} />
            {ANIMALS.find((a) => a.name === animal)?.emoji} {animal}
          </button>
        ))}
      </div>

      {/* Chain */}
      {chain.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={chain.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {chain.map((c) => (
                <div key={c.id} className="rounded-lg" style={{ background: `${AC[c.animal]}08`, border: `1px solid ${AC[c.animal]}20` }}>
                  <SortableItem id={c.id} animal={c.animal} onRemove={removeFromChain} />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {chain.length > 1 && (
        <div className="flex gap-1.5 items-center">
          {chain.map((c, i) => (
            <span key={c.id} className="flex items-center gap-1">
              <span style={{ color: AC[c.animal] }}>{AE[c.animal]}</span>
              {i < chain.length - 1 && <span style={{ color: "#6b7280" }}>→</span>}
            </span>
          ))}
        </div>
      )}

      {/* Output */}
      {generatedPrompt && <CodeBlock code={generatedPrompt} id="wf-builder" zone="builder" label="Custom Workflow" />}
    </div>
  );
}
