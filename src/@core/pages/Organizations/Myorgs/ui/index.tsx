"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { TitlePart } from "@/@core/entities/TitlePart";
import { Link } from "@/navigation";
import { useLang } from "@/@core/shared/hook/useLang";
import { usePagination } from "@/@core/shared/hook/usePaginate";
import Pagination from "@/@core/shared/ui/Pagination";
import { SortSelect } from "@/@core/shared/ui/SortSelect";
import TableGen from "@/@core/shared/ui/Table";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Eye, PenTool, Trash } from "react-feather";

type Props = {};

export const Myorgs = (props: Props) => {
  const { t } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const { current, pageSize, total, setTotal } = usePagination();
  const breadcrumb = [
    {
      id: 1,
      title: t("myOrganizations"),
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
      title: "Просмотрено",
      dataIndex: "seen",
      key: "seen",
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
                  color={scssVariables.mainColor}
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
      title: "Применить действия",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (t: any, row: any) => {
        return (
          <Flex gap={2} justify={"center"}>
            <Tooltip label="Редактировать">
              <Link href={`/organizations/addorg?id=${row.id}`}>
                <Icon
                  color={"green.500"}
                  as={PenTool}
                  w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                  h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                  cursor={"pointer"}
                  _hover={{ opacity: "0.8", transition: "all 0.2s linear" }}
                />
              </Link>
            </Tooltip>
            <Tooltip label="Удалить">
              <Icon
                color={"orange.400"}
                as={Trash}
                w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
                h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
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
      title: "Bahor kafesi",
      date: "01.01.2022 00:00:00",
      razdel: "Раздел",
      podrazdel: "Подраздел",
      seen: "3.650",
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
      <TitlePart title={t("myOrganizations")} breadcrumb={breadcrumb} />
      <SortSelect
        defaultValue={searchParams.get("sort") || "by_date"}
        onChange={handleSort}
        options={[
          { label: "По дате", value: "by_date" },
          { label: "По алфавиту", value: "by_alphabet" },
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
