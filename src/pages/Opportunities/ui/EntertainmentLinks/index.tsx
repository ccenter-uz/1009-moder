import { Link } from "@/navigation";
import {
  Box,
  Button,
  Switch,
  TableContainer,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import DialogEntertainmentLinks from "./dialog";
import Loading from "@/app/[locale]/loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteCat, getCat, getDataByid } from "../../api/actions";
import { useLang } from "@/shared/hook/useLang";
import { useDisclosure } from "@/shared/hook/useDisclosure";
import { scssVariables } from "@/application/utils/vars";
import { IdataInfoFromApi } from "../../model/types";

type IenterLinks = {
  index: string;
  id: number;
  title: string;
  title_ru: string;
};

type IEnterLinksType = {
  setData: Dispatch<SetStateAction<any>>;
  getAgain?: boolean;
};

const EntertainmentLinks: FC<IEnterLinksType> = ({ setData, getAgain }) => {
  const { colorMode } = useColorMode();
  const { locale } = useLang();
  const searchParams = useSearchParams();
  const selectedPage = searchParams.get("page");
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  // const [linkDialog, setLinkDialog] = useState<boolean>(false)
  const [editLinks, setEditLinks] = useState<boolean>(false);
  const [enterLinks, setEnterLinks] = useState<IenterLinks[]>();
  const [editInfo, setEditInfo] = useState<{
    title: string;
    title_ru: string;
    id: number;
  }>();
  const router = useRouter();
  // getDatabyId
  const getDataById = async (id: number) => {
    if (id !== undefined) {
      const params = { language: locale };
      const res = await getDataByid(id, params);
      setData(
        res?.entertainments.map((item: IdataInfoFromApi) => {
          return {
            ...item,
            id: item.id,
            mention: item.mention,
            warning: item.warning,
            title: item?.title,
            content: item.text.content,
            table_arr: item.table_arr,
          };
        })
      );
    }
  };

  // getCategories
  const getCategories = async () => {
    const res = await getCat();
    if (res) {
      const filtered = res?.filter((link: IenterLinks) => {
        return locale === "ru"
          ? link.title_ru === selectedPage
          : link.title === selectedPage;
      })[0]?.id;
      selectedPage && (await getDataById(filtered));
      setEnterLinks(
        res.map((link: IenterLinks) => ({
          ...link,
          index: locale === "ru" ? link.title_ru : link.title,
        }))
      );
    }
  };

  // effect for fetch data by query params
  useLayoutEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAgain]);

  // watch selectedPage change
  useEffect(() => {
    if (selectedPage) {
      const filter = enterLinks?.filter((link: IenterLinks) => {
        return locale === "ru"
          ? link.title_ru === selectedPage
          : link.title === selectedPage;
      });
      filter && getDataById(filter[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage]);

  // handleChangeSwitch
  const handleChangeSwitch = () => {
    setEditLinks((prevState) => !prevState);
  };

  // handleDelete
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "if you delete, content inside also will be removed and you won`t be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCat(id);
        if (res?.status === "success") {
          toast.success(res.message, { position: "bottom-right" });
          router.replace("/opportunities/entertainment");
          getCategories();
        }
      }
    });
  };

  return (
    <Box id="enterLinks" aria-label="enter-links">
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"5px"}
        justifyContent={"flex-end"}
        mb={"0.2em"}
      >
        <label aria-label="label-edit-switch" htmlFor="label-edit-switch">
          <img width={"18px"} height={"18px"} src="/pencil.svg" alt="edit" />
        </label>
        <Switch
          id="label-edit-switch"
          aria-disabled={enterLinks ? false : true}
          isDisabled={enterLinks ? false : true}
          colorScheme="teal"
          onChange={handleChangeSwitch}
        />
      </Box>
      <TableContainer
        borderRadius={"4px"}
        h={{ base: "63px", sm: "63px", md: "82px", xl: "82px" }}
        w={"100%"}
        bg={
          colorMode === "dark"
            ? scssVariables.darkBg
            : scssVariables.blockBgColor
        }
        display={"flex"}
        gap={{ base: "0 16px", sm: "0 16px", md: "0 18px", xl: "0 18px" }}
        alignItems={"center"}
        px={"20px"}
        mb={"24px"}
      >
        {!enterLinks ? (
          <Loading />
        ) : (
          enterLinks?.map((link: IenterLinks) => {
            return (
              <Link
                id="enterlink-btns"
                className="fade-in"
                key={link.id}
                href={`?page=${link.index}`}
                scroll={false}
              >
                <Button
                  onClick={() =>
                    sessionStorage.setItem("catId", JSON.stringify(link.id))
                  }
                  leftIcon={
                    editLinks ? (
                      <Text
                        as={"span"}
                        role="button"
                        aria-label="delete-enter-links"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditInfo({
                            title: link.title,
                            title_ru: link.title_ru,
                            id: link.id,
                          });
                          onToggle();
                        }}
                        fontSize={scssVariables.fonts.parag}
                        style={{
                          position: "absolute",
                          top: "-0.5em",
                          left: "-0.5em",
                          width: "15px",
                          height: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: "lightgrey",
                          color: "white",
                          fontSize: "10px",
                          zIndex: 99,
                        }}
                      >
                        <img
                          src="/pencil.svg"
                          alt="pencil"
                          width={"12px"}
                          height={"12px"}
                        />
                      </Text>
                    ) : undefined
                  }
                  rightIcon={
                    editLinks ? (
                      <Text
                        as={"span"}
                        role="button"
                        aria-label="delete-enter-links"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(link.id);
                        }}
                        fontSize={scssVariables.fonts.parag}
                        style={{
                          position: "absolute",
                          top: "-0.5em",
                          right: "-0.5em",
                          width: "15px",
                          height: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: "#e53e3e",
                          color: "white",
                          fontSize: "10px",
                          zIndex: 99,
                        }}
                      >
                        X
                      </Text>
                    ) : undefined
                  }
                  className={`${
                    selectedPage?.includes(link.index) && "active"
                  }`}
                  bg={colorMode === "dark" ? "#444343" : "white"}
                  w={{ base: "99px", sm: "99px", md: "167px", xl: "167px" }}
                  h={{ base: "30px", sm: "30px", md: "39px", xl: "39px" }}
                  fontSize={scssVariables.fonts.parag}
                >
                  {locale === "ru"
                    ? `${link.title_ru[0].toUpperCase()}${link.title_ru.slice(
                        1
                      )}`
                    : `${link.title[0].toUpperCase()}${link.title.slice(1)}`}
                </Button>
              </Link>
            );
          })
        )}
        {editLinks && (
          <Tooltip label={`Добавить`}>
            <img
              role="button"
              aria-label="add-link"
              onClick={onOpen}
              style={{ cursor: "pointer" }}
              width={"20px"}
              height={"20px"}
              src="/add.svg"
              alt="add-link"
            />
          </Tooltip>
        )}
      </TableContainer>
      <DialogEntertainmentLinks
        isOpen={isOpen}
        onClose={onClose}
        editInfo={editInfo}
        getCategories={getCategories}
      />
    </Box>
  );
};

export default EntertainmentLinks;
