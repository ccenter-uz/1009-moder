"use client";
import { scssVariables } from "@/application/utils/vars";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import TableGen from "@/shared/ui/Table";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { PenTool, Trash } from "react-feather";

type Props = {};

export const columns = [
  {
    id: 1,
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
    title: "Рейтинг",
    dataIndex: "rating",
    key: "rating",
  },
  {
    id: 5,
    title: "Просмотр",
    dataIndex: "seen",
    key: "seen",
  },
  {
    id: 6,
    title: "Действие",
    dataIndex: "action",
    key: "action",
    render: () => {
      return (
        <Flex gap={2}>
          <Tooltip label="Редактировать">
            <Icon
              color={"teal"}
              as={PenTool}
              w={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
              h={{ base: "15px", sm: "15px", md: "20px", xl: "20px" }}
              cursor={"pointer"}
              _hover={{ opacity: "0.8", transition: "all 0.2s linear" }}
            />
          </Tooltip>
          <Tooltip label="Удалить">
            <Icon
              color={"crimson"}
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
    title: "Название",
    razdel: "Раздел",
    podrazdel: "Подраздел",
    rating: "Рейтинг",
    seen: "3.650",
  },
];

export const Myorgs = (props: Props) => {
  const breadcrumb = [
    {
      id: 1,
      title: "Мои организации",
    },
    {
      id: 2,
      title: (
        <Text as={"span"} color={"blue"} fontSize={scssVariables.fonts.span}>
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
