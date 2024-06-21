"use client";
import { scssVariables } from "@/application/utils/vars";
import { Link } from "@/navigation";
import { usePagination } from "@/shared/hook/usePaginate";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import Pagination from "@/shared/ui/Pagination";
import { SortSelect } from "@/shared/ui/SortSelect";
import TableGen from "@/shared/ui/Table";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Check, Eye, X } from "react-feather";

type Props = {};

export const columns = [
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
    id: 6,
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (t: string) => {
      if (t === "rejected")
        return (
          <Flex
            alignItems={"center"}
            gap={"10px"}
            as={"span"}
            color={"red"}
            fontSize={scssVariables.fonts.span}
          >
            <Icon
              as={X}
              color={"red"}
              w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
              h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
            />
            Отклонено
          </Flex>
        );

      if (t === "accepted")
        return (
          <Flex
            alignItems={"center"}
            gap={"10px"}
            as={"span"}
            color={"green"}
            fontSize={scssVariables.fonts.span}
          >
            <Icon
              as={Check}
              color={"green"}
              w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
              h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
            />
            Подтверждено
          </Flex>
        );
    },
  },
];

const data = [
  {
    id: 1,
    name: "Aliyev Alim Alisher",
    title: "Tutzor Mchj",
    razdel: "Toshkent tumani",
    podrazdel: "Magazin",
    date: "01.01.2022",
    status: "accepted",
  },
  {
    id: 2,
    name: "Aliyev Alim Alisher",
    title: "Tutzor Mchj",
    razdel: "Toshkent tumani",
    podrazdel: "Magazin",
    date: "01.01.2022",
    status: "rejected",
  },
];

export const Actions = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const { current, pageSize, total, setTotal } = usePagination();
  const breadcrumb = [
    {
      id: 1,
      title: "Действия",
    },
    {
      id: 2,
      title: (
        <Text
          as={"span"}
          color={scssVariables.primary}
          fontSize={scssVariables.fonts.span}
        >
          Все
        </Text>
      ),
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
    <>
      <BreadCrumb item={breadcrumb} />
      <SortSelect
        defaultValue={searchParams.get("sort") || "all"}
        onChange={handleSort}
        options={[
          { label: "Все", value: "all" },
          { label: "Подтвержденные", value: "accepted" },
          { label: "Отказанные", value: "cancelled" },
        ]}
      />
      <TableGen columns={columns} dataSource={data} />
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};
