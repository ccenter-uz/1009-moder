"use client";
import colorTheme from "@/application/libs/colorTheme";
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChakraProvider theme={colorTheme}>{children}</ChakraProvider>
    </>
  );
}
