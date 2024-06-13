import dynamic from "next/dynamic";

export const ActionsAsync = dynamic(() =>
  import("./Actions").then((res) => res.Actions)
);
export const AddOrgAsync = dynamic(() =>
  import("./Addorg").then((res) => res.Addorg)
);
export const MyorgsAsync = dynamic(() =>
  import("./Myorgs").then((res) => res.Myorgs)
);
export const RequestsAsync = dynamic(() =>
  import("./Requests").then((res) => res.Requests)
);
