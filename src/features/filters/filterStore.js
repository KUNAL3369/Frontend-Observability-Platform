import { create } from "zustand";

export const useFilterStore = create((set) => ({
  dateRange: "7d",
  device: "all",

  setDateRange: (value) => set({ dateRange: value }),
  setDevice: (value) => set({ device: value }),
}));