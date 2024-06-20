import { scssVariables } from "@/application/utils/vars";
import { useLang } from "@/shared/hook/useLang";
import {
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";

const inputs = [
  { id: 1, label: "Раздел", value: "Рестораны- Кафе" },
  { id: 2, label: "Подраздел", value: "Обще пит." },
  { id: 3, label: "Название", value: "Сайрам" },
  { id: 4, label: "Раздел Т/У", value: "Рестораны- Кафе" },
  { id: 5, label: "Подраздел Т/У", value: "Кафе" },
  { id: 6, label: "Гол. Ораниз", value: "Не имеется" },
  {
    id: 7,
    label: "Адрес",
    value: "г.Ташкент, Чиланзар -7, ул. Мукумий, Дом-5",
  },
  { id: 8, label: "Электронная почта/ E-mail", value: "bahor234@gmail.com" },
  { id: 9, label: "Индекс", value: "12345" },
  { id: 10, label: "Вид оплаты", value: "Нал. Перечесление, Терминал" },
  {
    id: 11,
    label: "Режим работы",
    value: "09:00-18:00/ Выходные-Субота и Воскресение",
  },
  {
    id: 12,
    label: "Как можно добратся",
    value: "Автобус № 12, 56, Станция метро-Новза",
  },
];

const MainDataPart: FC = () => {
  const { colorMode } = useColorMode();
  const { t } = useLang();

  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", sm: "column", md: "row", xl: "row" }}
      alignItems={"flex-start"}
      gap={{ base: "8px", sm: "8px", md: "44px", xl: "54px" }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, xl: 2 }}
        w={"100%"}
        flex={1.5}
        mt={{ base: "16px", sm: "16px", md: "20px", xl: "24px" }}
        gap={{
          base: "8px 0px",
          sm: "8px 0px",
          md: "15px 34px",
          xl: "20px 44px",
        }}
      >
        {inputs.map((input) => {
          return (
            <FormControl key={input.id}>
              <FormLabel mb={"5px"} fontSize={scssVariables.fonts.parag}>
                {input.label}
              </FormLabel>
              <Box
                userSelect={"none"}
                wordBreak={"break-word"}
                display={"flex"}
                alignItems={"center"}
                minH={{ base: "35px", sm: "35px", md: "40px", xl: "42px" }}
                p={"0 16px"}
                borderRadius={"6px"}
                boxShadow={"0px 15px 20px 0px rgba(0, 0, 0, 0.05)"}
                border={`1px solid ${
                  colorMode === "dark" ? "#454545" : "rgba(217, 217, 217, 1)"
                }`}
                fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
                color={
                  colorMode === "dark" ? "whitesmoke" : "rgba(100, 116, 139, 1)"
                }
              >
                {input.value}
              </Box>
            </FormControl>
          );
        })}
      </SimpleGrid>
      <Box flex={1} mt={"24px"} w={"100%"}>
        <Text fontSize={scssVariables.fonts.parag} color={"grey"} mb={"16px"}>
          Посмотреть на карте
        </Text>
        <Box
          w={"100%"}
          h={{ base: "300px", sm: "300px", md: "400px", xl: "459px" }}
          bg={"lightgrey"}
          borderRadius={"8px"}
        ></Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={{ base: "1px", sm: "1px", md: "5px", xl: "5px" }}
          mt={"8px"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ base: "8px", sm: "8px", md: "14px", xl: "16px" }}
          >
            <img
              width={"20px"}
              height={"20px"}
              src="/phone-fill.svg"
              alt="phone"
            />
            <Text fontSize={scssVariables.fonts.parag}>
              + (998) 99-123-45-67
            </Text>
            <Text fontSize={scssVariables.fonts.parag}>
              {t("mobile-phone")}
            </Text>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ base: "8px", sm: "8px", md: "14px", xl: "16px" }}
          >
            <img
              width={"20px"}
              height={"20px"}
              src="/phone-fill.svg"
              alt="phone"
            />
            <Text fontSize={scssVariables.fonts.parag}>
              + (998) 99-123-45-67
            </Text>
            <Text fontSize={scssVariables.fonts.parag}>{t("home-phone")}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainDataPart;
