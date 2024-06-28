"use client";
import { Next13ProgressBar } from "next13-progressbar";
import { ReactNode } from "react";

export const NProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="3px"
        color={"teal"}
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};
