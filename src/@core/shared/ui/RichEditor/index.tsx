"use client";
import Loading from "@/app/[locale]/loading";
import dynamic from "next/dynamic";
import { FC, memo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { formats } from "./formats";
import { modules } from "./modules";
import {
  Button,
  Divider,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import { IRichEditor } from "@/@core/shared/types";
import { useLang } from "@/@core/shared/hook/useLang";
// dynamic import Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Loading />,
});

const RichEditor: FC<IRichEditor> = ({
  isOpen,
  onClose,
  defaultValue,
  value,
  setValue,
}) => {
  const [editorValue, setEditorValue] = useState(
    (defaultValue && defaultValue[0].text) || ""
  );
  const { t } = useLang();

  // CLOSE
  const handleClose = () => {
    onClose((prev: boolean) => !prev);
  };

  // SAVE
  const handleSave = async () => {
    const filtered = defaultValue
      ? value.filter((item) => item.id !== defaultValue[0].id)
      : value;
    setValue([
      ...filtered,
      { id: defaultValue ? defaultValue[0].id : Date.now(), text: editorValue },
    ]);
    handleClose();
  };

  return (
    <Modal size={"full"} aria-modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent p={{ base: "8px", sm: "", md: "1em", xl: "1em" }}>
        <ModalHeader
          p={{ base: "8px", sm: "", md: "1em", xl: "1em" }}
          fontSize={{ base: "14px", sm: "14px", md: "20px", xl: "20px" }}
        >
          {t("create-editor")}
        </ModalHeader>
        <Divider mb={"1em"} />
        <ModalCloseButton />
        <ReactQuill
          theme="snow"
          value={editorValue}
          formats={formats}
          modules={modules}
          onChange={setEditorValue}
        />
        <Button
          onClick={handleSave}
          aria-disabled={editorValue.length > 3 ? false : true}
          isDisabled={editorValue.length > 3 ? false : true}
          aria-label="button-save"
          colorScheme="teal"
          fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
          h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
          form="editor-modal-form"
          my={"8px"}
          type="submit"
        >
          {t("save")}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default memo(RichEditor);
