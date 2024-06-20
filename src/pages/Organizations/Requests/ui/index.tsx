"use client";
import { scssVariables } from "@/application/utils/vars";
import { Link } from "@/navigation";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import TableGen from "@/shared/ui/Table";
import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Check, Eye, X } from "react-feather";

type Props = {};

export const Requests = (props: Props) => {
  const breadcrumb = [
    {
      id: 1,
      title: "Заявки",
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
                  width={18}
                  height={18}
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
              <Icon as={Check} width={18} height={18} color={"green"} />
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
              <Icon as={X} width={18} height={18} color={"crimson"} />
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

  return (
    <Box>
      <BreadCrumb item={breadcrumb} />
      <TableGen columns={columns} dataSource={dataSource} />
    </Box>
  );
};
