import dynamic from "next/dynamic";

export const DashboardAsync = dynamic(() =>
  import("./ui").then((res) => res.Dashboard)
);
