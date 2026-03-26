import { create } from "zustand";

export const useAlertsStore = create((set) => ({
  alerts: [],

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, 20),
    })),

  clearAlerts: () => set({ alerts: [] }),
}));