import { scssVariables } from "@/application/utils/vars";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {};

export const Sidebar: FC<Props> = (props) => {
  return (
    <Box
      display={{ base: "none", sm: "block", md: "block", xl: "block" }}
      w={{ base: "0", sm: "70px", md: "324px", xl: "324px" }}
      transition={"width 0.3s linear"}
      h={"100%"}
      maxH={"100dvh"}
      bg={scssVariables.mainColor}
      p={{ base: "8px", sm: "8px", md: "20px", xl: "20px" }}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.10)"}
    >
      Sidebar
    </Box>
  );
};
