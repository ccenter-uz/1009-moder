import dynamic from "next/dynamic";

export const ResultAsync = dynamic(() =>
  import("./ui").then((res) => res.Result)
);
