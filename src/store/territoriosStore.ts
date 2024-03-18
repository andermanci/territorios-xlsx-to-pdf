import { create } from "zustand";

export const useTerritoriosStore = create((set) => ({
  jsonData: null,
  setJsonData: (jsonData: any) => set({ jsonData })
}))