import { scssVariables } from "@/@core/application/utils/vars";
import { useLang } from "@/@core/shared/hook/useLang";
import { Flex, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
};

export const SortSelect: FC<Props> = (props) => {
  const { options, onChange, defaultValue } = props;
  const { t } = useLang();

  return (
    <Flex
      gap={{ base: "5px", sm: "5px", md: "10px", xl: "10px" }}
      align={{
        base: "flex-start",
        sm: "flex-start",
        md: "center",
        xl: "center",
      }}
      justify={"flex-end"}
      mb={"10px"}
      flexDirection={{ base: "column", sm: "column", md: "row", xl: "row" }}
    >
      <Text color={scssVariables.primary} fontSize={scssVariables.fonts.span}>
        {t("sort")}
      </Text>
      <Select
        onChange={onChange}
        defaultValue={defaultValue}
        w={{ base: "100%", sm: "100%", md: "auto", xl: "auto" }}
        h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
        fontSize={scssVariables.fonts.span}
        cursor={"pointer"}
        _focus={{ boxShadow: "none", borderColor: scssVariables.primary }}
        borderRadius={"4px"}
        borderColor={"lightgrey"}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
