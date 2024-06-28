import { useOpportunitySlicer } from "../Slicers";

export const useOpportunitys = () => {
  const record = useOpportunitySlicer((state: any) => state.record);
  const setRecord = useOpportunitySlicer((state: any) => state.setRecord);

  return { record, setRecord };
};
