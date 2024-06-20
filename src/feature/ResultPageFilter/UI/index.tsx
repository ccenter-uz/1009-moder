import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import MoreFilter from "./moreFilterModal/moreFilter";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { scssVariables } from "@/application/utils/vars";

const SearchFilter: FC = () => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nameorg: searchParams.get("nameorg") || "",
    },
  });
  const [openMoreFilter, setOpenMoreFilter] = useState<boolean>(
    searchParams.has("razdel") &&
      searchParams.has("podrazdel") &&
      searchParams.has("region")
      ? true
      : false
  );

  // SAVE
  const handleFinish = (values: any) => {
    router.push(`?nameorg=${values.nameorg}&page=1&pageSize=10`);
  };

  return (
    <Box
      minH={{ base: "80px", sm: "80px", md: "152px", xl: "152px" }}
      bg={scssVariables.blockBgColor}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"center"}
      p={"0.5em"}
      borderRadius={"6px"}
    >
      <Box w={{ base: "100%", sm: "100%", md: "80%", xl: "80%" }}>
        <form id="search" onSubmit={handleSubmit(handleFinish)}>
          <InputGroup display={openMoreFilter ? "none" : "block"}>
            <InputLeftElement
              h={{ base: "30px", sm: "30px", md: "45px", xl: "50px" }}
            >
              <img
                src="/search-line.svg"
                alt="search"
                width={"18px"}
                height={"18px"}
              />
            </InputLeftElement>
            <Input
              {...register("nameorg")}
              h={{ base: "30px", sm: "30px", md: "45px", xl: "50px" }}
              type="text"
              placeholder="Поиск"
              bg={"#fff"}
              borderColor={"lightgrey"}
              _focus={{ boxShadow: "none", border: "1px solid teal" }}
              fontSize={scssVariables.fonts.parag}
              borderRadius={"6px"}
              box-shadow={" 0px 15px 20px 0px rgba(0, 0, 0, 0.05)"}
            />
            <InputRightElement
              w={"fit-content"}
              display={"flex"}
              alignItems={"center"}
              gap={"16px"}
              h={{ base: "30px", sm: "30px", md: "45px", xl: "50px" }}
            >
              <img
                role="button"
                aria-label="more-filter"
                onClick={() => setOpenMoreFilter((prev) => !prev)}
                src="/equalizer-fill.svg"
                alt="equalizer"
                width={"18px"}
                height={"18px"}
              />
              <Button
                type="submit"
                form="search"
                w={{ base: "60px", sm: "60px", md: "200px", xl: "234px" }}
                h={{ base: "30px", sm: "30px", md: "45px", xl: "50px" }}
                borderRadius={"6px"}
                bg={scssVariables.gradientColor}
                color={"#fff"}
                fontSize={scssVariables.fonts.parag}
                _hover={{
                  bg: scssVariables.gradientColor,
                  opacity: "0.8",
                  transition: "all 0.5s ease",
                }}
              >
                Поиск
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
      <MoreFilter open={openMoreFilter} close={setOpenMoreFilter} />
    </Box>
  );
};

export default SearchFilter;
