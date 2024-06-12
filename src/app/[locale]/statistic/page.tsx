import { Box } from "@chakra-ui/react";

const Statistic = () => {
  return (
    <Box
      m={{ base: "8px 5px", sm: "8px 5px", md: "1em 0.8em", xl: "1em 0.8em" }}
      bg={"#fff"}
      borderRadius={"8px"}
      p={{ base: "8px 16px", sm: "8px 16px", md: "8px 16px", xl: "8px 16px" }}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.02)"}
      h={"86%"}
    >
      Statistic
    </Box>
  );
};

export default Statistic;
