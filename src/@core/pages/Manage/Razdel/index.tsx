"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { TitlePart } from "@/@core/entities/TitlePart";
import { useLang } from "@/@core/shared/hook/useLang";
import { usePagination } from "@/@core/shared/hook/usePaginate";
import Pagination from "@/@core/shared/ui/Pagination";
import TableGen from "@/@core/shared/ui/Table";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { PenTool, Plus, Search, Trash } from "react-feather";

export const Razdel: FC = () => {
  const { current, pageSize, total, setTotal } = usePagination();
  const { t } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const breadcrumb = [
    {
      id: 1,
      title: t("razdel"),
    },
    {
      id: 2,
      title: (
        <Text
          as={"span"}
          color={scssVariables.mainColor}
          fontSize={scssVariables.fonts.span}
        >
          {t("all")}
        </Text>
      ),
    },
  ];
  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Время создания",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Действия",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (t: any, row: any) => {
        return (
          <Flex align={"center"} justify={"center"} gap={"10px"}>
            <Tooltip label="Редактировать">
              <Icon
                color={scssVariables.mainColor}
                as={PenTool}
                w={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
                h={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
                cursor={"pointer"}
                _hover={{ opacity: "0.8", transition: "all 0.2s linear" }}
              />
            </Tooltip>
            <Tooltip label="Удалить">
              <Icon
                color={"red.300"}
                as={Trash}
                w={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
                h={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
                cursor={"pointer"}
                _hover={{ opacity: "0.8", transition: "all 0.2s linear" }}
              />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];
  const data = [
    {
      id: 1,
      title: "Aloqa markazi",
      podrazdel: "12",
      date: "01.01.2022 00:00:00",
    },
    {
      id: 2,

      title: "Aloqa markazi",
      podrazdel: "12",
      date: "01.01.2022 00:00:00",
    },
  ];

  // PAGINATION
  const handlePageChange = (page: number) => {
    const params = searchParams!;
    router.push(`?page=${page}&pageSize=${params.get("pageSize") || 10}`);
  };
  const handlePageSizeChange = (pageSize: number) => {
    router.push(`?page=1&pageSize=${pageSize}`);
  };

  return (
    <Box my={{ base: "0", sm: "0", md: "0.5em", xl: "1em" }}>
      <TitlePart title={t("razdel")} breadcrumb={breadcrumb} />
      <Box display={"flex"} w={"100%"} justifyContent={"flex-end"}>
        <Button
          h={{ base: "25px", sm: "25px", md: "35px", xl: "35px" }}
          bg={"transparent"}
          color={scssVariables.primary}
          fontSize={scssVariables.fonts.parag}
          fontWeight={400}
          _hover={{ opacity: "0.8", transition: "all 0.2s linear" }}
          _focus={{ boxShadow: "none", bg: "teal" }}
          _active={{ transform: "scale(0.98)" }}
          rightIcon={<Plus width={"15"} height={"15"} />}
          px={0}
        >
          {t("create")}
        </Button>
      </Box>
      <InputGroup
        mb={"1em"}
        h={{ base: "25px", sm: "25px", md: "35px", xl: "35px" }}
      >
        <InputLeftElement
          h={{ base: "25px", sm: "25px", md: "35px", xl: "35px" }}
        >
          <Icon as={Search} w={"15"} h={"15"} />
        </InputLeftElement>
        <Input
          color={scssVariables.placeholderColor}
          borderRadius={"4px"}
          variant={"filled"}
          fontSize={scssVariables.fonts.span}
          h={{ base: "25px", sm: "25px", md: "35px", xl: "35px" }}
          _focus={{
            borderColor: scssVariables.blockBgColor,
            boxShadow: "none",
          }}
          placeholder={t("search")}
        />
      </InputGroup>
      <TableGen columns={columns} dataSource={data} />
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
};
