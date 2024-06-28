import { scssVariables } from "@/@core/application/utils/vars";
import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

type IWarningText = {
  text: string;
};

const WarningText: FC<IWarningText> = ({ text }) => {
  return (
    <Box
      gap={"0.5em"}
      color={"#FF7C7C"}
      display={"flex"}
      alignItems={"flex-start"}
      my={{ base: "16px", sm: "16px", md: "24px", xl: "24px" }}
    >
      <img src="/alert-fill.svg" alt="warning" loading="lazy" />
      <Text fontSize={scssVariables.fonts.parag}>{text}</Text>
    </Box>
  );
};

export default WarningText;
