import dynamic from "next/dynamic";

export const RazdelAsync = dynamic(() =>
  import("./Razdel").then((res) => res.Razdel)
);
export const UsersAsync = dynamic(() =>
  import("./Users").then((res) => res.Users)
);
