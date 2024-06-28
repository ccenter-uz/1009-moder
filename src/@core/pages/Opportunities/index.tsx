import dynamic from "next/dynamic";

export const OpportunitiesAsync = dynamic(() => import("./ui"));
