import { Flex, Icon, Text } from "@chakra-ui/react";
import { CheckCircle, PenTool, XCircle } from "react-feather";

export const checkStatus = (status: string, t: any) => {
  switch (status) {
    case "edit":
      return (
        <Flex align={"center"} gap={"0 5px"} color={"orange.300"}>
          <Icon as={PenTool} />
          <Text>{t("edited")}</Text>
        </Flex>
      );
    case "create":
      return (
        <Flex align={"center"} gap={"0 5px"} color={"green.300"}>
          <Icon as={CheckCircle} />
          <Text>{t("created")}</Text>
        </Flex>
      );
    case "delete":
      return (
        <Flex align={"center"} gap={"0 5px"} color={"red.300"}>
          <Icon as={XCircle} />
          <Text>{t("deleted")}</Text>
        </Flex>
      );
    default:
      return null;
  }
};
