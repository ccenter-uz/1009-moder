import { FC } from "react";
import { MODEL_FORM_INCOME } from "../../model/types";
import { Box, Button, IconButton, Img, Input, Select } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useAddorgSlicer } from "../../model/hook/useAddorgSlicer";
import dynamic from "next/dynamic";
import LoaderUI from "@/shared/ui/LoadingUI";
import { useLang } from "@/shared/hook/useLang";
import { scssVariables } from "@/application/utils/vars";
import { AddorgAccordionInputs } from "@/entities/AddorgAccordionInputs";
import {
  filterArrayEqualToID,
  filterArrayNotEqualToID,
} from "@/application/utils/fn";
import { AddorgFormInput } from "@/entities/AddorgFormInput";
import XmarkIcon from "@/shared/ui/Xmark";

const Maps = dynamic(
  () => import("@/shared/UI/Map/index").then((res) => res.Maps),
  {
    ssr: false,
    loading: () => <LoaderUI />,
  }
);

export const AddOrgContacts: FC<MODEL_FORM_INCOME> = (props) => {
  const { register, errors } = props;
  const { phones, setPhones } = useAddorgSlicer();
  const { t } = useLang();

  // ADD-NUMBER
  const addNumber = () => {
    setPhones([...phones, { id: Date.now(), value: "", type: "" }]);
  };

  // DELETE
  const deleteNumber = (id: number) => {
    if (phones.length === 1)
      return Swal.fire({ text: t("warning-need-number"), icon: "warning" });
    const lastNumbers = phones.filter(
      (phone: { id: number; value: string; type: string }) => phone.id !== id
    );
    setPhones(lastNumbers);
  };

  // SELECT
  const selectChange = ({
    target: { id, value },
  }: {
    target: { id: string; value: string };
  }) => {
    const other = filterArrayNotEqualToID(phones, parseInt(id));
    const filter = filterArrayEqualToID(phones, parseInt(id));
    if (filter.length === 0) return null;
    const newObj = { ...filter[0], type: value };
    const newNumbers = [newObj, ...other];
    setPhones(newNumbers);
  };

  // INPUT
  const inputChange = ({
    target: { id, value },
  }: {
    target: { id: string; value: string };
  }) => {
    if (value === "") return null;
    const other = filterArrayNotEqualToID(phones, parseInt(id));
    const filter = filterArrayEqualToID(phones, parseInt(id));
    if (filter.length === 0) return null;
    const newObj = { ...filter[0], value };
    setPhones([newObj, ...other]);
  };

  return (
    <Box>
      <AddorgAccordionInputs label={t("auth-phone")}>
        <Box mb={{ base: "10px", sm: "10px", md: "16px", xl: "16px" }}>
          {phones.map((phone: { id: number; value: string; type: string }) => (
            <Box
              key={phone.id}
              mb={"8px"}
              display={"flex"}
              alignItems={"center"}
              gap={"8px"}
            >
              <Input
                required
                onChange={inputChange}
                id={String(phone.id)}
                _focus={{
                  border: "1px solid teal",
                  boxShadow: `0 0 2px ${scssVariables.blockBgColor}`,
                }}
                type="text"
                h={{ base: "30px", sm: "30", md: "40px", xl: "40px" }}
                fontSize={{ base: "13px", sm: "13px", md: "14px", xl: "14px" }}
                p={{
                  base: "5px 10px",
                  sm: "5px 10px",
                  md: "10px 16px",
                  xl: "10px 16px",
                }}
              />
              <Select
                required
                defaultValue={""}
                onChange={selectChange}
                id={String(phone.id)}
                _focus={{
                  border: "1px solid teal",
                  boxShadow: `0 0 2px ${scssVariables.blockBgColor}`,
                }}
                variant="outline"
                h={{ base: "30px", sm: "30", md: "40px", xl: "40px" }}
                fontSize={{ base: "13px", sm: "13px", md: "14px", xl: "14px" }}
              >
                <option value="">{t("none")}</option>
                <option value="mobile">{t("mobile-phone")}</option>
                <option value="home">{t("home-phone")}</option>
              </Select>
              <IconButton
                onClick={() => deleteNumber(phone.id)}
                aria-label="delete"
                icon={<XmarkIcon />}
                h={{ base: "30px", sm: "30", md: "40px", xl: "40px" }}
              />
            </Box>
          ))}
        </Box>
        <Button
          onClick={addNumber}
          w={"100%"}
          variant={"outline"}
          leftIcon={
            <Img
              src="/add.svg"
              alt="add"
              w={{ base: "16px", sm: "16px", md: "24px", xl: "24px" }}
              h={{ base: "16px", sm: "16px", md: "24px", xl: "24px" }}
            />
          }
          h={{ base: "30px", sm: "30", md: "40px", xl: "40px" }}
          fontSize={{ base: "13px", sm: "13px", md: "14px", xl: "14px" }}
        >
          {t("add-number")}
        </Button>
      </AddorgAccordionInputs>

      <AddorgFormInput
        register={register}
        errors={errors}
        value="email"
        placeholder={"bahor@gmail.com"}
        minLength={3}
        maxLength={100}
        required
        label={t("email")}
        errortext={t("required-field")}
      />
      <AddorgFormInput
        register={register}
        errors={errors}
        value="index"
        placeholder={"10000"}
        label={t("index")}
      />

      <AddorgAccordionInputs
        register={register}
        errors={errors}
        label={t("address")}
        inputs={[
          {
            id: 1,
            value: "region",
            placeholder: t("region"),
          },
          {
            id: 2,
            value: "city",
            placeholder: t("city"),
            required: true,
            minLength: 3,
            maxLength: 100,
            errortext: t("required-field"),
          },
          {
            id: 3,
            value: "area",
            placeholder: t("area"),
          },
          {
            id: 4,
            value: "house",
            placeholder: t("house"),
          },
          {
            id: 5,
            value: "block",
            placeholder: t("block"),
          },
          {
            id: 6,
            value: "apartment",
            placeholder: t("apartment"),
          },
        ]}
      />
      <Maps />
    </Box>
  );
};
