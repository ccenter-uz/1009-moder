import { scssVariables } from "@/application/utils/vars";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import { Flex, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  breadcrumb: { id: number | string; title: string | ReactNode | null }[];
  title: string;
};

export const TitlePart: FC<Props> = (props) => {
  const { breadcrumb, title } = props;

  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      my={{ base: "10px", sm: "10px", md: "20px", xl: "20px" }}
      flexWrap={"wrap"}
    >
      <Text
        fontSize={{ base: "16px", sm: "16px", md: "24px", xl: "24px" }}
        fontWeight={500}
        color={scssVariables.mainColor}
      >
        {title}
      </Text>
      <BreadCrumb item={breadcrumb} />
    </Flex>
  );
};
