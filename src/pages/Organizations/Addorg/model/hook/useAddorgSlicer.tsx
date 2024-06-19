import { AddOrgSlicer } from '../Slicer'

export const useAddorgSlicer = () => {
  const phones = AddOrgSlicer((state: any) => state.phones)
  const photos = AddOrgSlicer((state: any) => state.photos)
  const setPhones = AddOrgSlicer((state: any) => state.setPhones)
  const setPhotos = AddOrgSlicer((state: any) => state.setPhotos)
  const coordinates = AddOrgSlicer((state: any) => state.coordinates)
  const setCoordinates = AddOrgSlicer((state: any) => state.setCoordinates)

  return {
    phones,
    photos,
    setPhones,
    setPhotos,
    coordinates,
    setCoordinates
  }
}
