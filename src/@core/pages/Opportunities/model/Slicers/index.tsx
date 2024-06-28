import { create } from "zustand";

export const useOpportunitySlicer = create((set) => ({
  record: null,
  setRecord: (value: any) => set({ record: value }),
}));
