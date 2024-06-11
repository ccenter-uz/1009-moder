import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    darkMode: {
      background: "#000",
    },
  },
  styles: {
    global: (props: any) => ({
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        bg: props.colorMode === "dark" ? "darkMode.background" : "#7080901f",
        fontFamily: "inherit",
      },
    }),
  },
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  components: {
    // Input
    Input: {
      baseStyle: {
        // Style for the input
      },
      defaultProps: {
        // Default props for the input
      },
      variants: {
        outline: (props: any) => ({
          field: {
            color: "#64748B",
            _placeholder: {
              color: props.colorMode === "dark" ? "#64748B" : "#64748B",
            },
          },
        }),
      },
    },
  },
});

export default theme;
