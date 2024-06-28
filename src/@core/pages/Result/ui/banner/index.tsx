import { useLang } from "@/@core/shared/hook/useLang";
import BoxGen from "@/@core/shared/ui/Box";
import Rate from "@/@core/shared/ui/Rate";
import { Box, Heading, Img, Text, useColorMode } from "@chakra-ui/react";
import { FC } from "react";

const Banner: FC = () => {
  const { colorMode } = useColorMode();
  const { t } = useLang();

  return (
    <BoxGen
      w={"100%"}
      minH={"104px"}
      boxShadow={"0px 15px 20px 0px rgba(0, 0, 0, 0.05)"}
      p={{ base: "10px", sm: "10px", md: "15px", xl: "16px" }}
      display={"flex"}
      alignItems={{ base: "flex-start", xl: "center" }}
      gap={"10px"}
      flexDirection={{ base: "column", sm: "column", md: "row", xl: "row" }}
    >
      <Box flex={1.5} display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Heading
          wordBreak={"break-word"}
          fontSize={{ base: "20px", sm: "20px", md: "40px", xl: "40px" }}
          fontWeight={400}
          color={colorMode === "dark" ? "white" : "rgba(100, 116, 139, 1)"}
        >
          Кафе - Сайрам
        </Heading>
        <Box display={"flex"} alignItems={"center"} gap={"8px"}>
          <Img src="/location.svg" alt="location" />
          <Text
            fontSize={{ base: "10px", sm: "10px", md: "13px", xl: "14px" }}
            color={
              colorMode === "dark" ? "whitesmoke" : "rgba(100, 116, 139, 1)"
            }
          >
            Мукумий, Дом-5
          </Text>
        </Box>
      </Box>
      <Box flex={1} display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Text fontSize={{ base: "14px", sm: "14px", md: "18px", xl: "20px" }}>
          {t("rate")}
        </Text>
        <Rate
          starColor="yellow"
          disabled
          maxStars={5}
          initialValue={4}
          onRatingChange={(value) => console.log(value, "value")}
        />
      </Box>
    </BoxGen>
  );
};

export default Banner;
