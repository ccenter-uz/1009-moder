"use client";
import { scssVariables } from "@/application/utils/vars";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import TableGen from "@/shared/ui/Table";
import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { Check, X } from "react-feather";

type Props = {};

export const columns = [
  {
    id: 1,
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    id: 1.1,
    title: "Название",
    dataIndex: "title",
    key: "title",
  },
  {
    id: 2,
    title: "Раздель",
    dataIndex: "razdel",
    key: "razdel",
  },
  {
    id: 3,
    title: "Подразделение",
    dataIndex: "podrazdel",
    key: "podrazdel",
  },
  {
    id: 4,
    title: "Дата создания",
    dataIndex: "date",
    key: "date",
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

  return (
    <>
      <BreadCrumb item={breadcrumb} />
      <TableGen columns={columns} dataSource={data} />
    </>
  );
};
