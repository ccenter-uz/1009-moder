"use client";
import { scssVariables } from "@/application/utils/vars";
import { SearchFilter } from "@/feature/ResultPageFilter";
import { Link } from "@/navigation";
import { usePagination } from "@/shared/hook/usePaginate";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import Pagination from "@/shared/ui/Pagination";
import TableGen from "@/shared/ui/Table";
import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Eye } from "react-feather";

export const Allorgs: FC = () => {
  const { current, pageSize, total, setTotal } = usePagination();
  const searchParams = useSearchParams();
  const router = useRouter();
  const breadcrumb = [
    {
      id: 1,
      title: "Организации",
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
  ];
  const data = [
    {
      id: 1,
      name: "Akmal",
      title: "Aloqa markazi",
      address: "Toshkent, Chilonzor",
      razdel: "Toshkent tumani",
      podrazdel: "Magazin",
      date: "01.01.2022 00:00:00",
    },
    {
      id: 2,
      name: "Akmal",
      title: "Aloqa markazi",
      address: "Toshkent, Chilonzor",
      razdel: "Toshkent tumani",
      podrazdel: "Magazin",
      date: "01.01.2022 00:00:00",
    },
  ];

  // PAGINATION
  const handlePageChange = (page: number) => {
    const params = searchParams!;
    if (params.size > 3) {
      router.push(
        `?razdel=${params.get("razdel")}&podrazdel=${params.get(
          "podrazdel"
        )}&region=${params.get("region")}&razdel-tu=${params.get(
          "razdel-tu"
        )}&podrazdel-tu=${params.get("podrazdel-tu")}&view=${params.get(
          "view"
        )}&orientir=${params.get("orientir")}&nameorg=${params.get(
          "nameorg"
        )}&mainorg=${params.get("mainorg")}&kvartal=${params.get(
          "kvartal"
        )}&kv=${params.get("kv")}&house=${params.get(
          "house"
        )}&district=${params.get("district")}&city=${params.get(
          "city"
        )}&page=${page}&pageSize=${params.get("pageSize")}`
      );
    } else {
      router.push(
        `?nameorg=${params.get("nameorg")}&page=${page}&pageSize=${
          params.get("pageSize") || 10
        }`
      );
    }
  };
  const handlePageSizeChange = (pageSize: number) => {
    const params = searchParams!;
    if (params.size > 3) {
      router.push(
        `?razdel=${params.get("razdel")}&podrazdel=${params.get(
          "podrazdel"
        )}&region=${params.get("region")}&razdel-tu=${params.get(
          "razdel-tu"
        )}&podrazdel-tu=${params.get("podrazdel-tu")}&view=${params.get(
          "view"
        )}&orientir=${params.get("orientir")}&nameorg=${params.get(
          "nameorg"
        )}&mainorg=${params.get("mainorg")}&kvartal=${params.get(
          "kvartal"
        )}&kv=${params.get("kv")}&house=${params.get(
          "house"
        )}&district=${params.get("district")}&city=${params.get(
          "city"
        )}&page=${1}&pageSize=${pageSize}`
      );
    } else {
      router.push(
        `?nameorg=${params.get("nameorg")}&page=1&pageSize=${pageSize}`
      );
    }
  };

  return (
    <Box my={"1em"}>
      <BreadCrumb item={breadcrumb} />
      <Flex flexDirection={"column"} gap={"20px"}>
        <SearchFilter />
        <TableGen columns={columns} dataSource={data} />
      </Flex>
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
