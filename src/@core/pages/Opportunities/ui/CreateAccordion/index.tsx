import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Textarea,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createContent, updateContent } from "../../api/actions";
import { IcreateAccordionType, TableData } from "@/@core/shared/types";
import { useOpportunitys } from "../../model/hook";
import { useLang } from "@/@core/shared/hook/useLang";
import GuestTable from "@/@core/shared/ui/GuestTable";
import { getURL } from "@/@core/application/utils/fn";
import RichEditor from "@/@core/shared/ui/RichEditor";
import EditableTable from "@/@core/shared/ui/ExcelTable";

// STYLES
const inputsStyle = {
  _focus: { border: `none`, boxShadow: "0 0 0px 2px teal" },
  fontSize: { base: "12px", sm: "12px", md: "13px", xl: "14px" },
  size: "sm",
};
const labelStyle = {
  fontSize: { base: "12px", sm: "12px", md: "14px", xl: "14px" },
  mb: "2px",
  color: "#454545",
};

const CreateAccModal: FC<IcreateAccordionType> = ({
  open,
  close,
  setGetAgain,
}) => {
  const { t } = useLang();
  const pathname = usePathname()!;
  const lastLink = pathname.replaceAll("/", " ").split(" ").slice(-1).join();
  const { record, setRecord } = useOpportunitys();
  const { locale } = useLang();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: record && record[0].title,
      warning: record && record[0].warning,
      mention: record && record[0].mention,
    },
  });
  const { colorMode } = useColorMode();
  const [dataTable, setDataTable] = useState(
    record ? record[0].table_arr.table : []
  );
  const [editorValue, setEditorValue] = useState<any>(
    record ? record[0]?.content : []
  );
  const [isExcelTableOpen, setIsExcelTableOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [defaultTableData, setDefaultTableData] = useState<TableData[] | null>(
    null
  );
  const [defaultEditorValue, setDefaultEditorValue] = useState<
    { id: number | string; text: string }[] | null
  >(null);

  // CLOSE
  const handleClose = () => {
    close();
    setRecord(null);
  };

  // SAVE
  const handleSave = async (values: any) => {
    let body;
    lastLink === "entertainment"
      ? (body = {
          category_id: JSON.parse(sessionStorage.getItem("catId") as string),
          title: values.title,
          type: "text",
          language: locale === "ru" ? "ru" : "uz",
          warning: values.warning,
          mention: values.mention,
          text: { content: editorValue },
          table_arr: {
            table: dataTable,
          },
        })
      : (body = {
          title: values.title,
          type: "text",
          language: locale === "ru" ? "ru" : "uz",
          warning: values.warning,
          mention: values.mention,
          text: { content: editorValue },
          table_arr: {
            table: dataTable,
          },
        });

    if (!record) {
      const res = await createContent(`${getURL(lastLink)}`, body);
      if (res?.status === "success") {
        toast.success(res.message, { position: "bottom-right" });
        setGetAgain((prev: boolean) => !prev);
        handleClose();
      }
    } else {
      const res = await updateContent(
        `${getURL(lastLink)}`,
        body,
        record[0]?.id
      );
      if (res?.status === "success") {
        toast.success(res.message, { position: "bottom-right" });
        setGetAgain((prev: boolean) => !prev);
        handleClose();
      }
    }
  };

  // CHOOSE-CATEGORY
  const chooseCat = (content: "table" | "editor") => {
    content === "table"
      ? (setIsExcelTableOpen((prev) => !prev), setDefaultTableData(null))
      : setIsEditorOpen((prev) => !prev),
      setDefaultEditorValue(null);
  };

  // DELETE
  const handleDeleteTable = (id: number | string) => {
    const deletedtable = dataTable.filter((_: any) => _.id !== id);
    setDataTable(deletedtable);
  };
  const handleDeleteEditor = (id: number | string) => {
    const deletedtable = editorValue.filter((_: any) => _.id !== id);
    setEditorValue(deletedtable);
  };

  return (
    <Modal size={"full"} aria-modal isOpen={open} onClose={handleClose}>
      <ModalContent p={{ base: "8px", sm: "", md: "1em", xl: "1em" }}>
        <ModalHeader
          p={"8px"}
          fontSize={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
        >
          {t("create-acc")}
        </ModalHeader>
        <Divider mb={"1em"} />
        <ModalCloseButton />
        <form id="create-acc-form" onSubmit={handleSubmit(handleSave)}>
          <FormControl
            isRequired
            mb={{ base: "14px", sm: "14px", md: "2em", xl: "2em" }}
          >
            <FormLabel htmlFor="title" {...labelStyle}>
              {t("title")}
            </FormLabel>
            <Input
              {...register("title")}
              {...inputsStyle}
              id="title"
              placeholder="title"
            />
          </FormControl>

          <FormControl
            mb={{ base: "14px", sm: "14px", md: "14px", xl: "14px" }}
          >
            <FormLabel htmlFor="warning-text" {...labelStyle}>
              {t("warning-info")}
            </FormLabel>
            <Textarea
              {...register("warning")}
              {...inputsStyle}
              id="warning-text"
              placeholder="Type for warnings!"
              resize={"vertical"}
            />
          </FormControl>

          <FormControl mb={{ base: "14px", sm: "14px", md: "2em", xl: "2em" }}>
            <FormLabel htmlFor="mention-text" {...labelStyle}>
              {t("mention-info")}
            </FormLabel>
            <Textarea
              {...register("mention")}
              {...inputsStyle}
              id="mention-text"
              placeholder="Type for mentions!"
              resize={"vertical"}
            />
          </FormControl>
        </form>
        <Box display={"flex"} alignItems={"center"} gap={"0 8px"}>
          <Button
            leftIcon={
              <img
                src="/add.svg"
                alt="add-circle-table"
                width={"20px"}
                height={"20px"}
              />
            }
            aria-label="create-table"
            fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            onClick={() => chooseCat("table")}
          >
            {t("create-table")}
          </Button>
          <Button
            leftIcon={
              <img
                src="/add.svg"
                alt="add-circle-editor"
                width={"20px"}
                height={"20px"}
              />
            }
            aria-label="create-text"
            fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            onClick={() => chooseCat("editor")}
          >
            {t("create-text")}
          </Button>
        </Box>
        {/* TABLE VIEW */}
        {dataTable?.length > 0 &&
          dataTable.map((table: TableData) => {
            return (
              <Box
                key={table.id}
                aria-label="table-section"
                my={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
              >
                <Box
                  display={"flex"}
                  gap={"8px"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <Tooltip label="Изменить" aria-label="A tooltip">
                    <Image
                      width={{
                        base: "14px",
                        sm: "14px",
                        md: "18px",
                        xl: "18px",
                      }}
                      _hover={{ opacity: "0.8" }}
                      src="/pencil.svg"
                      alt="edit"
                      role="button"
                      aria-label="edit-button"
                      onClick={() => {
                        setDefaultTableData(
                          dataTable.filter(
                            (item: TableData) => item.id == table.id
                          )
                        ),
                          setIsExcelTableOpen(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip label="Удалить" aria-label="A tooltip">
                    <Image
                      width={{
                        base: "14px",
                        sm: "14px",
                        md: "18px",
                        xl: "18px",
                      }}
                      _hover={{ opacity: "0.8" }}
                      src="/delete.svg"
                      alt="delete"
                      role="button"
                      aria-label="delete-button"
                      onClick={() => handleDeleteTable(table.id)}
                    />
                  </Tooltip>
                </Box>
                <GuestTable rows={table.rows} header={table.header} />
              </Box>
            );
          })}
        {/* EDITOR VIEW */}
        {editorValue.length > 0 &&
          editorValue.map((value: { id: number | string; text: string }) => {
            return (
              <Box key={value.id} aria-label="editor-section">
                <Box
                  display={"flex"}
                  gap={"8px"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <Tooltip label="Изменить" aria-label="A tooltip">
                    <Image
                      width={{
                        base: "14px",
                        sm: "14px",
                        md: "18px",
                        xl: "18px",
                      }}
                      _hover={{ opacity: "0.8" }}
                      src="/pencil.svg"
                      alt="edit"
                      role="button"
                      aria-label="edit-button"
                      onClick={() => {
                        setDefaultEditorValue(
                          editorValue.filter(
                            (_: { id: string | number }) => _.id == value.id
                          )
                        ),
                          setIsEditorOpen(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip label="Удалить" aria-label="A tooltip">
                    <Image
                      width={{
                        base: "14px",
                        sm: "14px",
                        md: "18px",
                        xl: "18px",
                      }}
                      _hover={{ opacity: "0.8" }}
                      src="/delete.svg"
                      alt="delete"
                      role="button"
                      aria-label="delete-button"
                      onClick={() => handleDeleteEditor(value.id)}
                    />
                  </Tooltip>
                </Box>
                <div
                  style={
                    colorMode === "dark"
                      ? {
                          background: "#757575",
                          padding: "0.5em 1em",
                          borderRadius: "8px",
                        }
                      : {
                          background: "#f9f9f6",
                          padding: "0.5em 1em",
                          borderRadius: "8px",
                        }
                  }
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(value.text),
                  }}
                />
              </Box>
            );
          })}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          my={"8px"}
        >
          <Button
            aria-label="button-save"
            colorScheme="teal"
            fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            form="create-acc-form"
            mb={"8px"}
            type="submit"
          >
            {t("save")}
          </Button>
        </Box>
        {/* editableTable */}
        {isExcelTableOpen && (
          <EditableTable
            recordId={defaultTableData ? defaultTableData[0].id : null}
            rows={defaultTableData ? defaultTableData[0].rows : []}
            columns={defaultTableData ? defaultTableData[0].header : []}
            isOpen={isExcelTableOpen}
            onClose={setIsExcelTableOpen}
            setDataTable={setDataTable}
            data={dataTable}
          />
        )}
        {/* richEditor */}
        {isEditorOpen && (
          <RichEditor
            defaultValue={defaultEditorValue}
            value={editorValue}
            setValue={setEditorValue}
            isOpen={isEditorOpen}
            onClose={setIsEditorOpen}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateAccModal;
