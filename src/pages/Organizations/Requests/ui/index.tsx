"use client";
import { scssVariables } from "@/application/utils/vars";
import { TitlePart } from "@/entities/TitlePart";
import { Link } from "@/navigation";
import { useLang } from "@/shared/hook/useLang";
import { usePagination } from "@/shared/hook/usePaginate";
import Pagination from "@/shared/ui/Pagination";
import { SortSelect } from "@/shared/ui/SortSelect";
import TableGen from "@/shared/ui/Table";
import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Check, Eye, X } from "react-feather";

type Props = {};

export const Requests = (props: Props) => {
  const { t } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const { current, pageSize, total, setTotal } = usePagination();
  const breadcrumb = [
    {
      id: 1,
      title: t("requests"),
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
      title: "Имя",
      dataIndex: "name",
      key: "name",
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
      title: "Раздел",
      dataIndex: "razdel",
      key: "razdel",
    },
    {
      title: "Подразделение",
      dataIndex: "podrazdel",
      key: "podrazdel",
    },
    {
      title: "Просмотр",
      dataIndex: "show",
      key: "show",
      align: "center",
      render: (t: any, row: any) => {
        return (
          <Flex align={"center"} justify={"center"}>
            <Tooltip label="Просмотр">
              <Link href={`/result/${row.id}`}>
                <Icon
                  as={Eye}
                  w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                  h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                  color={scssVariables.primary}
                  _hover={{ opacity: "0.8", cursor: "pointer" }}
                />
              </Link>
            </Tooltip>
          </Flex>
        );
      },
    },
    {
      title: "Применить действия",
      dataIndex: "action",
      key: "action",
      align: "flex-end",
      render: () => {
        return (
          <Flex
            justify={"center"}
            align={"center"}
            flexDirection={"column"}
            gap={"5px"}
          >
            <Flex
              align={"center"}
              gap={"5px"}
              cursor={"pointer"}
              _hover={{ opacity: "0.8", cursor: "pointer" }}
            >
              <Icon
                as={Check}
                w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                color={"green"}
              />
              <Text fontSize={scssVariables.fonts.span} color={"green"}>
                Подтвердить
              </Text>
            </Flex>
            <Flex
              align={"center"}
              gap={"5px"}
              cursor={"pointer"}
              _hover={{ opacity: "0.8", cursor: "pointer" }}
            >
              <Icon
                as={X}
                w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                color={"crimson"}
              />
              <Text fontSize={scssVariables.fonts.span} color={"crimson"}>
                Отклонить
              </Text>
            </Flex>
          </Flex>
        );
      },
    },
  ];

  const dataSource = [
    {
      id: 1,
      name: "John Brown",
      title: "Bahor kafesi",
      date: "20.06.2024 12:00",
      razdel: "Toshkent tumani",
      podrazdel: "Magazin",
    },
    {
      id: 2,
      name: "John Brown",
      title: "Bahor kafesi",
      date: "20.06.2024 12:00",
      razdel: "Toshkent tumani",
      podrazdel: "Magazin",
    },
    {
      id: 3,
      name: "John Brown",
      title: "Bahor kafesi",
      date: "20.06.2024 12:00",
      razdel: "Toshkent tumani",
      podrazdel: "Magazin",
    },
  ];

  // SORT
  const handleSort = ({ target: { value } }: { target: { value: string } }) => {
    if (value === "") return null;

    router.push(`?sort=${value}&page=1&pageSize=10`);
  };
  // PAGINATION
  const handlePageChange = (page: number) => {
    router.push(
      `?sort=${searchParams.get("sort")}&page=${page}&pageSize=${
        searchParams.get("pageSize") ?? 10
      }`
    );
  };
  const handlePageSizeChange = (pageSize: number) => {
    router.push(
      `?sort=${searchParams.get("sort")}&page=1&pageSize=${pageSize}`
    );
  };

  return (
    <Box>
      <TitlePart title={t("requests")} breadcrumb={breadcrumb} />
      <SortSelect
        defaultValue={searchParams.get("sort") || "by_date"}
        onChange={handleSort}
        options={[
          { label: "По дате", value: "by_date" },
          { label: "По алфавиту", value: "by_alphabet" },
        ]}
      />
      <TableGen columns={columns} dataSource={dataSource} />
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
