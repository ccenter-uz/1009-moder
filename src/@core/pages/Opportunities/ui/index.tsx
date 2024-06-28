"use client";
import { FC, useLayoutEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  AccordionIcon,
  Image,
  Tooltip,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import { usePathname, useSearchParams } from "next/navigation";
import { useLang } from "@/@core/shared/hook/useLang";
import Swal from "sweetalert2";
import { handleDelete } from "../model/deleteFn";
import { getDataAnother } from "../model/getAnotherDataFn";
import EntertainmentLinks from "./EntertainmentLinks";
import SearchPanelOpportunities from "./SearchPanel";
import CreateAccModal from "./CreateAccordion";
import { useDisclosure } from "@/@core/shared/hook/useDisclosure";
import { IdataInfo } from "@/@core/shared/types";
import { scssVariables } from "@/@core/application/utils/vars";
import { useOpportunitys } from "../model/hook";
import MentionText from "@/@core/shared/ui/MentionText";
import WarningText from "@/@core/shared/ui/WarningText";
import GuestTable from "@/@core/shared/ui/GuestTable";
import BreadCrumb from "@/@core/shared/ui/Breadcrumb";

const Opportunities: FC = () => {
  const pathname = usePathname()!;
  const lastLink = pathname.replaceAll("/", " ").split(" ").slice(-1).join();
  const searchParams = useSearchParams()!;
  const { t, locale } = useLang();
  const breadcrumblinks = [
    { id: 1, title: `${t("opportunities")}` },
    { id: 2, title: `${t(`${lastLink}`)}` },
    {
      id: 3,
      title: `${
        searchParams.has("page") ? searchParams.get("page") : t("all")
      }`,
    },
  ];
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [iscreateAccordion, setIsCreateAccordion] = useState<boolean>(false)
  const { setRecord } = useOpportunitys();
  const [dataInfo, setData] = useState<IdataInfo[]>([]);
  const [getAgain, setGetAgain] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // REFETCH-DATA
  useLayoutEffect(() => {
    getDataAnother(lastLink, locale, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAgain, locale]);

  // ACCORDION
  const handleAccordion = () => {
    if (lastLink === "entertainment" && searchParams.size === 0) {
      Swal.fire({ text: "Please, choose category first!", icon: "warning" });
    } else {
      onOpen();
    }
  };
  const handleChangeAccordion = (index: number[]) => {
    setOpenIndex(index[1]);
  };

  return (
    <Box id="opportunities" className="fade-in" aria-current="page">
      <BreadCrumb item={breadcrumblinks} />
      <SearchPanelOpportunities
        setOpenIndex={setOpenIndex}
        options={dataInfo?.map((option) => ({
          label: option.title.toLowerCase(),
          value: option.title.toLowerCase(),
        }))}
      />
      {lastLink === "entertainment" && (
        <EntertainmentLinks getAgain={getAgain} setData={setData} />
      )}
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"0 8px"}
        mb={{ base: "0", sm: "0", md: "4em", xl: "4em" }}
      >
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
          onClick={handleAccordion}
        >
          {t("create")}
        </Button>
      </Box>
      {/* Accordion renders from API data */}
      <Accordion
        allowMultiple
        index={[openIndex as number]}
        onChange={handleChangeAccordion}
      >
        {dataInfo?.map((data, index) => (
          <AccordionItem
            id={index.toString() + 1}
            key={index}
            borderTop={"none"}
            style={{ borderBottom: "0.5px solid #d3d3d373" }}
            my={{ base: "8px", sm: "8px", md: "1em", xl: "1em" }}
          >
            <AccordionButton
              textTransform={"capitalize"}
              h={{ base: "37px", sm: "37px", md: "45px", xl: "45px" }}
              fontSize={scssVariables.fonts.parag}
              p={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
            >
              <Box aria-label="title-panel" as="span" flex="1" textAlign="left">
                {data.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel
              boxShadow={scssVariables.boxShadowPartnerBox}
              mb={{ base: "24px", sm: "24px", md: "48px", xl: "48px" }}
              bg={colorMode === "dark" ? scssVariables.darkBg : "#F8FFFF"}
              p={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
            >
              <Box
                display={"flex"}
                gap={"8px"}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                <Tooltip label="Изменить" aria-label="A tooltip">
                  <Image
                    width={{ base: "14px", sm: "14px", md: "20px", xl: "22px" }}
                    _hover={{ opacity: "0.8" }}
                    src="/pencil.svg"
                    alt="edit"
                    role="button"
                    aria-label="delete-button"
                    onClick={() => (
                      setRecord(dataInfo.filter((item) => item.id === data.id)),
                      onOpen()
                    )}
                  />
                </Tooltip>
                <Tooltip label="Удалить" aria-label="A tooltip">
                  <Image
                    width={{ base: "14px", sm: "14px", md: "20px", xl: "22px" }}
                    _hover={{ opacity: "0.8" }}
                    src="/delete.svg"
                    alt="edit"
                    role="button"
                    aria-label="delete-button"
                    onClick={() => handleDelete(data.id, lastLink)}
                  />
                </Tooltip>
              </Box>
              {data.mention && <MentionText text={data.mention} />}
              {data.warning && <WarningText text={data.warning} />}
              {data.table_arr.table &&
                data.table_arr?.table.map((table) => {
                  return (
                    <Box
                      key={table.id}
                      my={{ base: "8px", sm: "8px", md: "24px", xl: "24px" }}
                    >
                      <GuestTable rows={table.rows} header={table.header} />
                    </Box>
                  );
                })}
              {data.content &&
                data.content.map((text) => {
                  return (
                    <Box
                      key={text.id}
                      my={{ base: "16px", sm: "16px", md: "24px", xl: "24px" }}
                      fontSize={scssVariables.fonts.parag}
                    >
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
                          __html: DOMPurify.sanitize(text.text),
                        }}
                      />
                    </Box>
                  );
                })}
              <Text
                fontSize={{ base: "8px", sm: "8px", md: "11px", xl: "11px" }}
                color={"grey"}
              >
                {t("updated")}
                {new Date(data.update_date).toLocaleDateString("ru-GB", {
                  hour12: false,
                })}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {/* CreateAccordion */}
      {isOpen && (
        <CreateAccModal
          open={isOpen}
          close={onClose}
          setGetAgain={setGetAgain}
        />
      )}
    </Box>
  );
};
export default Opportunities;
