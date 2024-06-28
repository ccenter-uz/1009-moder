import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createCat, updateCat } from "../../api/actions";
import InputGen from "@/shared/ui/Input";
import { useLang } from "@/shared/hook/useLang";

type IDialogTypes = {
  isOpen: boolean;
  onClose: () => void;
  editInfo?: { title: string; title_ru: string; id: number };
  getCategories: () => void;
};

const DialogEntertainmentLinks: FC<IDialogTypes> = ({
  isOpen = false,
  onClose,
  editInfo,
  getCategories,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const { t } = useLang();

  const router = useRouter();
  //   handleClose
  const handleClose = () => {
    onClose();
    reset({ title: null, title_ru: null });
  };

  //   actionSubmit
  const actionSubmit = async (e: any) => {
    if (editInfo) {
      const res = await updateCat(editInfo.id, e);
      if (res?.status === "success") {
        toast.success(res.message, { position: "bottom-right" });
        handleClose();
        router.replace("/opportunities/entertainment");
        getCategories();
      }
    } else {
      const res = await createCat(e);
      if (res?.status === "success") {
        toast.success(res.message, { position: "bottom-right" });
        handleClose();
        getCategories();
      }
    }
  };

  useEffect(() => {
    editInfo && reset({ title: editInfo.title, title_ru: editInfo.title_ru });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent p={"1em"}>
        <ModalHeader
          p={"0"}
          fontSize={{ base: "16px", sm: "16px", md: "18px", xl: "18px" }}
        >
          {t("add_link")}
        </ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={handleSubmit(actionSubmit)}
          style={{ margin: "1em 0" }}
          id="link-entertainment-form"
        >
          <FormControl>
            <FormLabel
              htmlFor="add-link"
              fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
            >
              {t("add")}(UZ):
            </FormLabel>
            <InputGen
              id="add-link"
              {...register("title")}
              fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
              h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            />
          </FormControl>
          <FormControl mt={"8px"}>
            <FormLabel
              htmlFor="add-link"
              fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
            >
              {t("add")}(РУ)
            </FormLabel>
            <InputGen
              id="add-link"
              {...register("title_ru")}
              fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
              h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            />
          </FormControl>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              type="submit"
              form="link-entertainment-form"
              w={{
                base: "100%",
                sm: "100%",
                md: "fit-content",
                xl: "fit-content",
              }}
              mt={"1em"}
              colorScheme="teal"
              fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
              h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            >
              {t("save")}
            </Button>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DialogEntertainmentLinks;
