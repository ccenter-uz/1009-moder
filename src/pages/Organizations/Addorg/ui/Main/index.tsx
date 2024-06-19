import { FC } from "react";
import { MODEL_FORM_INCOME } from "../../model/types";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Img,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useAddorgSlicer } from "../../model/hook/useAddorgSlicer";
import { useLang } from "@/shared/hook/useLang";
import { AddorgFormInput } from "@/entities/AddorgFormInput";
import { AddorgAccordionInputs } from "@/entities/AddorgAccordionInputs";

export const AddOrgMainInfo: FC<MODEL_FORM_INCOME> = (props) => {
  const { register, errors } = props;
  const { photos, setPhotos } = useAddorgSlicer();
  const { t } = useLang();

  //   UPLOAD
  const handleUpload = async ({
    target: { files },
  }: {
    target: { files: any };
  }) => {
    const file = { id: Date.now(), file: files[0] };
    file && setPhotos([...photos, file]);
  };

  //   DELETE
  const handleDelete = (id: number) => {
    setPhotos(photos.filter((file: any) => file.id !== id));
  };

  //   OPEN
  const handleOpen = async (id: number) => {
    const filter = photos.filter((file: any) => file.id === id);
    if (filter.length === 0) return;

    Swal.fire({
      imageUrl: URL.createObjectURL(filter[0].file),
      imageHeight: "auto",
      imageWidth: "auto",
      imageAlt: "Custom image",
      showConfirmButton: false,
    });
  };

  return (
    <Box>
      <AddorgFormInput
        register={register}
        errors={errors}
        value="razdel"
        placeholder={t("razdel")}
        minLength={3}
        maxLength={100}
        required
        label={t("razdel")}
        errortext={t("required-field")}
      />
      <AddorgFormInput
        register={register}
        errors={errors}
        value="podrazdel"
        placeholder={t("podrazdel")}
        minLength={3}
        maxLength={100}
        required
        label={t("podrazdel")}
        errortext={t("required-field")}
      />

      <AddorgAccordionInputs
        register={register}
        errors={errors}
        label={t("razdel-tovar-and-service")}
        inputs={[
          {
            id: 1,
            value: "razdel_tovar_and_service",
            placeholder: t("razdel-tovar-and-service"),
            required: true,
            minLength: 3,
            maxLength: 100,
            errortext: t("required-field"),
          },
          {
            id: 2,
            value: "podrazdel_tovar_and_service",
            placeholder: t("podrazdel-tovar-and-service"),
            required: true,
            minLength: 3,
            maxLength: 100,
            errortext: t("required-field"),
          },
        ]}
      />

      <AddorgFormInput
        register={register}
        errors={errors}
        value="organization_name"
        placeholder={"Бахор кафеси"}
        minLength={3}
        maxLength={100}
        required
        label={t("organization-name")}
        errortext={t("required-field")}
      />
      <AddorgFormInput
        register={register}
        errors={errors}
        value="main-organization"
        placeholder={"Ички ишлар вазирлиги"}
        label={t("main_organization")}
      />
      <AddorgFormInput
        register={register}
        errors={errors}
        value="manager"
        placeholder={"Азизов Азиз главный администратор"}
        label={t("manager")}
      />
      <Box mt={{ base: "2em", sm: "2em", md: "3em", xl: "3em" }}>
        <Text
          fontWeight={400}
          fontSize={{ base: "12px", sm: "12px", md: "16px", xl: "16px" }}
          color={"grey"}
          mb={{ base: "8px", sm: "8px", md: "10px", xl: "10px" }}
        >
          {t("add-image")}
        </Text>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={{ base: "8px", sm: "8px", md: "15px", xl: "20px" }}
        >
          {photos.map((file: any, index: number) => {
            return (
              <Box key={index} position={"relative"}>
                <Img
                  src={URL.createObjectURL(file.file)}
                  w={{ base: "80px", sm: "80px", md: "99px", xl: "99px" }}
                  h={{ base: "80px", sm: "80px", md: "99px", xl: "99px" }}
                  alt={"image"}
                  borderRadius={"8px"}
                  objectFit={"cover"}
                />
                <Box
                  position={"absolute"}
                  top={0}
                  right={0}
                  bg={"rgba(0,0,0,0.5)"}
                  w={"100%"}
                  h={"100%"}
                  borderRadius={"8px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"8px"}
                >
                  <Tooltip label={t("show")}>
                    <Img
                      onClick={() => handleOpen(file.id)}
                      src="/eye-fill.svg"
                      alt="eye"
                      width={5}
                      height={5}
                      _hover={{ opacity: "0.8" }}
                      cursor={"pointer"}
                      style={{
                        filter:
                          " invert(100%) sepia(100%) saturate(0%) hue-rotate(157deg) brightness(200%) contrast(200%)",
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={t("delete")}>
                    <Img
                      onClick={() => handleDelete(file.id)}
                      src="/delete.svg"
                      alt="delete"
                      width={5}
                      height={5}
                      _hover={{ opacity: "0.8" }}
                      cursor={"pointer"}
                      style={{
                        filter:
                          " invert(100%) sepia(100%) saturate(0%) hue-rotate(157deg) brightness(104%) contrast(104%)",
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            );
          })}
          <Box>
            <FormControl isInvalid={photos.length === 0}>
              <FormLabel
                htmlFor="image-1"
                w={{ base: "80px", sm: "80px", md: "99px", xl: "99px" }}
                h={{ base: "80px", sm: "80px", md: "99px", xl: "99px" }}
                boxShadow={"0px 15px 20px 0px rgba(0, 0, 0, 0.05)"}
                cursor={"pointer"}
                borderRadius={"8px"}
                border={"1px solid rgba(0,0,0,0.10)"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={{ base: "22px", sm: "12px", md: "16px", xl: "56px" }}
                margin={0}
                fontWeight={400}
                color={"grey"}
                _hover={{ bg: "whitesmoke" }}
              >
                <Img
                  src={"/addOrganization/plus.svg"}
                  alt={"plus"}
                  w={{ base: "28px", sm: "28px", md: "38px", xl: "38px" }}
                />
              </FormLabel>
              <FormErrorMessage
                fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
              >
                {t("required-field")}
              </FormErrorMessage>
              <Input
                type="file"
                id="image-1"
                display={"none"}
                onChange={handleUpload}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
