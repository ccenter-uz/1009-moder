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
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { PenTool, Plus, Search, Trash } from "react-feather";
import { checkStatus } from "../model/helperFn";
import { SortSelect } from "@/@core/shared/ui/SortSelect";

export const StatisticsUsers: FC = () => {
  const { current, pageSize, total, setTotal } = usePagination();
  const { t } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const breadcrumb = [
    {
      id: 1,
      title: t("statistics-users"),
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
      title: "ФИО",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Время ",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Действия",
      dataIndex: "status",
      key: "status",
      render: (text: any, row: any) => {
        return checkStatus(text, t);
      },
    },
  ];
  const data = [
    {
      id: 1,
      full_name: "Aliyeev Aliyev Alisher",
      date: "01.01.2022 00:00:00",
      status: "edit",
    },
    {
      id: 2,
      full_name: "Botirov Botir Botirovich",
      status: "delete",
      date: "01.01.2022 00:00:00",
    },
    {
      id: 3,
      full_name: "Aliyeev Aliyev Alisher",
      status: "create",
      date: "01.01.2022 00:00:00",
    },
  ];

  // SORT
  const handleSort = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    console.log(value, "e");
    router.push(`?sort=${value}&page=1&pageSize=10`);
  };

  // PAGINATION
  const handlePageChange = (page: number) => {
    const params = searchParams!;
    router.push(
      `?sort=${params.get("sort")}&page=${page}&pageSize=${
        params.get("pageSize") || 10
      }`
    );
  };
  const handlePageSizeChange = (pageSize: number) => {
    const params = searchParams!;
    router.push(`?sort=${params.get("sort")}&page=1&pageSize=${pageSize}`);
  };
  return (
    <Box my={{ base: "0", sm: "0", md: "0.5em", xl: "1em" }}>
      <TitlePart title={t("statistics-users")} breadcrumb={breadcrumb} />
      <SortSelect
        defaultValue={searchParams.get("sort") || "by_all"}
        onChange={handleSort}
        options={[
          { label: "Все", value: "by_all" },
          { label: "Изменено", value: "by_edit" },
          { label: "Удалено", value: "by_delete" },
          { label: "Создано", value: "by_create" },
        ]}
      />
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
      <Button
        fontSize={scssVariables.fonts.span}
        w={{
          base: "fit-content",
          sm: "fit-content",
          md: "auto",
          xl: "auto",
        }}
        h={{ base: "30px", sm: "30px", md: "40px", xl: "40px" }}
        variant={"link"}
        color={"green.500"}
        leftIcon={
          <Image
            src="/excel-export.png"
            alt="export excel"
            w={"20px"}
            h={"20px"}
          />
        }
      >
        Export
      </Button>
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
