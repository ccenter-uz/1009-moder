import { scssVariables } from "@/application/utils/vars";
import { IOption, ISelectAutocomplelte } from "@/shared/types";
import SelectAutocomplete from "@/shared/ui/Autocomplete";
import { Box, FormControl, FormLabel, useColorMode } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";

const SearchPanelOpportunities: FC<
  { setOpenIndex: Dispatch<SetStateAction<number | null>> } & Pick<
    ISelectAutocomplelte,
    "options"
  >
> = ({ options, setOpenIndex }) => {
  const { colorMode } = useColorMode();

  const handleSelect = (selectedOption: IOption) => {
    const filter = options.findIndex(
      (item: any) => item.value == selectedOption.value
    );
    setOpenIndex(filter);
  };

  return (
    <Box
      h={{ base: "70px", sm: "70px", md: "171px", xl: "171px" }}
      w={{ base: "100%", sm: "100%", md: "975px", xl: "975px" }}
      m={{
        base: "16px auto",
        sm: "16px auto",
        md: "24px auto",
        xl: "24px auto",
      }}
      borderRadius={{ base: "6px", sm: "6px", md: "16px", xl: "16px" }}
      bg={
        colorMode === "dark" ? scssVariables.darkBg : scssVariables.blockBgColor
      }
      pt={{ base: "15px", sm: "15px", md: "31px", xl: "31px" }}
      px={"16px"}
      display={"flex"}
      justifyContent={"center"}
      boxShadow={scssVariables.boxShadowPartnerBox}
    >
      <Box w={{ base: "100%", sm: "100%", md: "625px", xl: "625px" }}>
        <FormControl>
          <FormLabel
            display={{ base: "none", sm: "none", md: "block", xl: "block" }}
            htmlFor="search-opportunities"
          >
            Поиск:
          </FormLabel>
          <SelectAutocomplete options={options} onSelect={handleSelect} />
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchPanelOpportunities;
