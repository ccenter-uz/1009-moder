import { create } from 'zustand'

export const AddOrgSlicer = create(set => ({
  photos: [],
  setPhotos: (photos: any) => set({ photos }),
  phones: [{ id: 1, value: '', type: '' }],
  setPhones: (phones: { id: number; value: string; type: string }[]) => set({ phones }),
  coordinates: [41.311151, 69.279737],
  setCoordinates: (coordinates: number[]) => set({ coordinates })
}))
