import { useLang } from "@/@core/shared/hook/useLang";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { FC } from "react";

const text = [
  {
    id: 1,
    text: 'Ресторан "Фигаро" вобрал в себя лучшие традиции европейской, испанской и средиземноморской кухни.   Уютная, доброжелательная атмосфера и достойный сервис  - это основные преимущества ресторана. Все вышеперечисленное и плюс доступный уровень цен позволили заведению оказаться в списке лучших ресторанов  ',
  },
];

const Info: FC = () => {
  const { t } = useLang();
  const { colorMode } = useColorMode();

  return (
    <Box my={{ base: "1em", sm: "1em", md: "64px", xl: "64px" }}>
      <Text
        fontSize={{ base: "14px", sm: "14px", md: "16px", xl: "20px" }}
        color={"grey"}
        mb={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
      >
        {t("main-company-info")}
      </Text>
      <Box>
        {text.map((p) => {
          return (
            <Box
              key={p.id}
              wordBreak={"break-word"}
              fontSize={{ base: "11px", sm: "11px", md: "14px", xl: "14px" }}
              bg={"rgb(95 117 149 / 15%)"}
              p={{ base: "1em", sm: "1em", md: "16px", xl: "16px" }}
              borderRadius={"8px"}
              color={
                colorMode === "dark" ? "lightgrey" : "rgba(100, 116, 139, 1)"
              }
            >
              {p.text}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Info;
