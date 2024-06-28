import { scssVariables } from "@/@core/application/utils/vars";
import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";

const style = {
  inputStyle: {
    fontSize: scssVariables.fonts.parag,
    h: { base: "30px", sm: "30px", md: "40px", xl: "40px" },
    borderRadius: "4px",
    border: "1px solid rgba(233, 233, 233, 1)",
    _focus: { boxShadow: "none", border: "1px solid teal" },
    boxShadow: "0px 15px 20px 0px rgba(0, 0, 0, 0.05)",
  },
  buttonStyle: {
    w: { base: "100px", sm: "100px", md: "230px", xl: "236px" },
    h: { base: "30px", sm: "30px", md: "40px", xl: "40px" },
    _hover: { opacity: 0.7, transition: "all 0.5s ease" },
    color: "#fff",
    fontWeight: 400,
    fontSize: scssVariables.fonts.parag,
  },
  bannerStyle: {
    w: "100%",
    h: { base: "50px", sm: "50px", md: "65px", xl: "70px" },
    bg: "rgba(9, 205, 205, 1)",
    borderRadius: "6px 6px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: "1em",
    fontSize: { base: "16px", sm: "16px", md: "22px", xl: "24px" },
    color: "#fff",

    top: 0,
    zIndex: 99,
  },
  main: {
    bg: "#ffffffdb",
    overflow: { base: "scroll", sm: "scroll", md: "scroll", xl: "hidden" },
    transition: "height 0.5s ease-in",
    backdropBlur: "10px",
    borderRadius: "6px",
    w: "100%",
  },
};

type IMoreFilterType = {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
};

const MoreFilter: FC<IMoreFilterType> = ({ open, close }) => {
  const searchParams = useSearchParams()!;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      city: searchParams.get("city"),
      district: searchParams.get("district"),
      house: searchParams.get("house"),
      kv: searchParams.get("kv"),
      kvartal: searchParams.get("kvartal"),
      mainorg: searchParams.get("mainorg"),
      nameorg: searchParams.get("nameorg"),
      orientir: searchParams.get("orientir"),
      podrazdel: searchParams.get("podrazdel"),
      "podrazdel-tu": searchParams.get("podrazdel-tu"),
      razdel: searchParams.get("razdel"),
      "razdel-tu": searchParams.get("razdel-tu"),
      region: searchParams.get("region"),
      view: searchParams.get("view"),
    },
  });
  const router = useRouter();

  // SAVE
  const handleFinish = (values: any) => {
    router.push(
      `?razdel=${values.razdel}&podrazdel=${values.podrazdel}&region=${values.region}&razdel-tu=${values["razdel-tu"]}&podrazdel-tu=${values["podrazdel-tu"]}&view=${values.view}&orientir=${values.orientir}&nameorg=${values.nameorg}&mainorg=${values.mainorg}&kvartal=${values.kvartal}&kv=${values.kv}&house=${values.house}&district=${values.district}&city=${values.city}&page=1&pageSize=10`
    );
  };

  return (
    <Box {...style.main} h={open ? "570px" : "0"}>
      <Box position={"sticky"} {...style.bannerStyle}>
        Расширенный поиск
        <CloseButton role="button" onClick={() => close(false)} />
      </Box>
      <Box p={{ base: "8px 10px", sm: "8px 10px", md: "1em", xl: "1em" }}>
        <form id="more-filter" onSubmit={handleSubmit(handleFinish)}>
          <Text
            color={"grey"}
            fontSize={{ base: "11px", sm: "11px", md: "13px", xl: "14px" }}
            mb={{ base: "16px", sm: "16px", md: "20px", xl: "23px" }}
          >
            Заполните поля
          </Text>
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 3, xl: 4 }}
            gap={{ base: "10px", sm: "10px", md: "15px 23px", xl: "16px 24px" }}
          >
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="razdel">
                Раздел
              </FormLabel>
              <Select {...style.inputStyle} {...register("razdel")} id="razdel">
                <option value="1">Apteka</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="nameorg">
                Название организации
              </FormLabel>
              <Input
                {...style.inputStyle}
                {...register("nameorg")}
                placeholder="Кафе"
                id="nameorg"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="kv">
                Квартира
              </FormLabel>
              <Input
                {...style.inputStyle}
                {...register("kv")}
                placeholder="9"
                id="kv"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={scssVariables.fonts.parag}
                htmlFor="podrazdel"
              >
                Подраздел
              </FormLabel>
              <Select
                {...style.inputStyle}
                {...register("podrazdel")}
                id="podrazdel"
              >
                <option value="1">Общие пит</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="city">
                Город
              </FormLabel>
              <Select {...style.inputStyle} {...register("city")} id="city">
                <option value="1">Tashkent</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={scssVariables.fonts.parag}
                htmlFor="orientir"
              >
                Ориентир
              </FormLabel>
              <Select
                {...style.inputStyle}
                {...register("orientir")}
                id="orientir"
              >
                <option value="1">Novza metro</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="mainorg">
                Гол. Ораниз
              </FormLabel>
              <Select
                {...style.inputStyle}
                {...register("mainorg")}
                id="mainorg"
              >
                <option value="1">Muqimiy</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={scssVariables.fonts.parag}
                htmlFor="razdel-tu"
              >
                Раздел Т/У
              </FormLabel>
              <Input
                {...style.inputStyle}
                {...register("razdel-tu")}
                placeholder="Kafe"
                id="razdel-tu"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="region">
                Область
              </FormLabel>
              <Select {...style.inputStyle} {...register("region")} id="region">
                <option value="1">Tashkent</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="house">
                Дом
              </FormLabel>
              <Input
                {...style.inputStyle}
                {...register("house")}
                placeholder="25"
                id="house"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="view">
                Вид
              </FormLabel>
              <Select {...style.inputStyle} {...register("view")} id="view">
                <option value="1">Kafe</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={scssVariables.fonts.parag}
                htmlFor="podrazdel-tu"
              >
                Подраздел Т/У
              </FormLabel>
              <Select
                {...style.inputStyle}
                {...register("podrazdel-tu")}
                id="podrazdel-tu"
              >
                <option value="1">Kafe</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={scssVariables.fonts.parag}
                htmlFor="district"
              >
                Район
              </FormLabel>
              <Select
                {...style.inputStyle}
                {...register("district")}
                id="district"
              >
                <option value="1">Chilonzor</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={scssVariables.fonts.parag} htmlFor="kvartal">
                Квартал
              </FormLabel>
              <Select
                {...style.inputStyle}
                {...register("kvartal")}
                id="kvartal"
              >
                <option value="1">12</option>
              </Select>
            </FormControl>
          </SimpleGrid>
          <Box
            mt={"36px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={"13px"}
          >
            <Button
              onClick={() => {
                reset(), router.push("/organizations/all");
              }}
              {...style.buttonStyle}
              bg={"#a9a9a9"}
            >
              Очистить
            </Button>
            <Button
              type="submit"
              form="more-filter"
              {...style.buttonStyle}
              bg={"rgba(9, 205, 205, 1)"}
            >
              Поиск
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default MoreFilter;
