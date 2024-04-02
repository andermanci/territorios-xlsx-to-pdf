import { create } from "zustand";

export const useActiveSheetStore = create((set) => ({
  activeSheet: null,
  setActiveSheet: (activeSheet: any) => set({ activeSheet })
}))