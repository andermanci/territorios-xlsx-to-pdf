import { create } from "zustand";

export const useTerritoriosStore = create((set) => ({
  statusPercentage: 0,
  jsonData: null,
  setStatusPercentage: (statusPercentage) => set({ statusPercentage }),
  setJsonData: (jsonData) => set({ jsonData })
}))