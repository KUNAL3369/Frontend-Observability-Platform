import { create } from "zustand";

export const useMetricsStore = create((set) => ({
  history: [],
  setHistory: (data) => set({ history: data }),
}));