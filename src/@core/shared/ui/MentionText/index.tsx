import { scssVariables } from "@/@core/application/utils/vars";
import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

type IMentionText = {
  text: string;
};

const MentionText: FC<IMentionText> = ({ text }) => {
  return (
    <Box
      my={{ base: "16px", sm: "16px", md: "24px", xl: "24px" }}
      position={"relative"}
      _before={{
        content: `""`,
        w: "8px",
        h: "100%",
        position: "absolute",
        left: "left",
        bg: "#45BFFF",
      }}
      display={"flex"}
      alignItems={"center"}
      background={`linear-gradient(0deg, #F3F8FF, #F3F8FF),
    linear-gradient(90.05deg, #45BFFF 27.8%, #00A7FF 98.65%);
    `}
    >
      <Text
        p={"1em"}
        color={scssVariables.textBlackColor}
        fontSize={scssVariables.fonts.parag}
      >
        {text}
      </Text>
    </Box>
  );
};

export default MentionText;
