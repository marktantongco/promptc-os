import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryEntry {
  id: string;
  text: string;
  zone: string;
  timestamp: number;
}

interface CustomPrompt {
  id: string;
  label: string;
  content: string;
  zone: string;
  createdAt: number;
}

interface Stats {
  copies: number;
  zoneVisits: Record<string, number>;
  timeSpent: number;
}

interface AppState {
  favorites: Set<string>;
  history: HistoryEntry[];
  customPrompts: CustomPrompt[];
  stats: Stats;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  addCustomPrompt: (prompt: Omit<CustomPrompt, 'id' | 'createdAt'>) => void;
  removeCustomPrompt: (id: string) => void;
  incrementCopies: () => void;
  visitZone: (zone: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      history: [],
      customPrompts: [],
      stats: { copies: 0, zoneVisits: {}, timeSpent: 0 },

      addFavorite: (id) =>
        set((s) => ({ favorites: new Set([...s.favorites, id]) })),

      removeFavorite: (id) =>
        set((s) => {
          const next = new Set(s.favorites);
          next.delete(id);
          return { favorites: next };
        }),

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.has(id)) {
          const next = new Set(favorites);
          next.delete(id);
          set({ favorites: next });
        } else {
          set({ favorites: new Set([...favorites, id]) });
        }
      },

      isFavorite: (id) => get().favorites.has(id),

      addHistory: (entry) =>
        set((s) => ({
          history: [
            { ...entry, id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, timestamp: Date.now() },
            ...s.history.slice(0, 49),
          ],
        })),

      clearHistory: () => set({ history: [] }),

      addCustomPrompt: (prompt) =>
        set((s) => ({
          customPrompts: [
            ...s.customPrompts,
            { ...prompt, id: `cp-${Date.now()}`, createdAt: Date.now() },
          ],
        })),

      removeCustomPrompt: (id) =>
        set((s) => ({
          customPrompts: s.customPrompts.filter((p) => p.id !== id),
        })),

      incrementCopies: () =>
        set((s) => ({ stats: { ...s.stats, copies: s.stats.copies + 1 } })),

      visitZone: (zone) =>
        set((s) => ({
          stats: {
            ...s.stats,
            zoneVisits: {
              ...s.stats.zoneVisits,
              [zone]: (s.stats.zoneVisits[zone] || 0) + 1,
            },
          },
        })),
    }),
    {
      name: 'promptc-os-storage',
      partialize: (state) => ({
        favorites: Array.from(state.favorites),
        history: state.history,
        customPrompts: state.customPrompts,
        stats: state.stats,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<AppState>;
        return {
          ...current,
          favorites: new Set(Array.isArray(p?.favorites) ? p.favorites : []),
          history: Array.isArray(p?.history) ? p.history : [],
          customPrompts: Array.isArray(p?.customPrompts) ? p.customPrompts : [],
          stats: p?.stats || current.stats,
        };
      },
    }
  )
);
