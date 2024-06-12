"use client";
import { Links } from "@/application/helpers/links";
import { scssVariables } from "@/application/utils/vars";
import { Link } from "@/navigation";
import { useDisclosure } from "@/shared/hook/useDisclosure";
import { useLang } from "@/shared/hook/useLang";
import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Plus } from "react-feather";

type Props = {};

export const Sidebar: FC<Props> = (props) => {
  const { locale } = useLang();
  const pathname = usePathname();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      display={{ base: "none", sm: "block", md: "block", xl: "block" }}
      w={{ base: "0", sm: "70px", md: "324px", xl: "324px" }}
      transition={"width 0.3s linear"}
      bg={scssVariables.mainColor}
      p={{ base: "8px", sm: "8px", md: "20px", xl: "20px" }}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.10)"}
    >
      <Text
        color={"whitesmoke"}
        fontSize={{ base: "0", sm: "13px", md: "20px", xl: "20px" }}
        fontWeight={500}
        textAlign={"center"}
        mb={{ sm: "10px", md: "20px", xl: "20px" }}
      >
        Панель модератора
      </Text>
      <List
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        borderTop={"1px solid rgba(255, 255, 255, 0.6)"}
        pt={"1em"}
      >
        {Links.map((link) => (
          <ListItem
            as={Link}
            href={link.href}
            key={link.id}
            onClick={() => {
              link.subMenu && onToggle();
            }}
            _hover={{ background: "rgba(41, 164, 134, 1)", cursor: "pointer" }}
            transition={"background-color 0.2s linear"}
            p={"8px "}
            borderRadius={"8px"}
            fontSize={scssVariables.fonts.parag}
            color={"#fff"}
            display={"flex"}
            className={`${
              pathname == `/${locale}${link.href}` ? "active" : ""
            }`}
            alignItems={"center"}
            justifyContent={{
              sm: "center",
              md: "flex-start",
              xl: "flex-start",
            }}
            gap={{ sm: "10px", md: "20px", xl: "20px" }}
          >
            <ListIcon as={link.icon} mr={0} />
            <Box
              display={{ sm: "none", md: "flex", xl: "flex" }}
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"100%"}
            >
              {link.title}
              {link.subMenu && <ListIcon as={Plus} mr={0} />}
            </Box>
          </ListItem>
        ))}
        {Links.map((link) => (
          <List
            key={link.id}
            display={"flex"}
            flexDirection={"column"}
            gap={"8px"}
          >
            {isOpen &&
              link.subMenu?.map((menu) => (
                <ListItem
                  key={menu.id}
                  color={"lightgrey"}
                  borderRadius={"8px"}
                  p={"8px 1em"}
                  as={Link}
                  href={menu.href}
                  fontSize={scssVariables.fonts.span}
                  _hover={{
                    background: "rgba(41, 164, 134, 1)",
                    cursor: "pointer",
                  }}
                  className={`${
                    pathname == `/${locale}${menu.href}` ? "active" : ""
                  }`}
                >
                  {menu.title}
                </ListItem>
              ))}
          </List>
        ))}
      </List>
    </Box>
  );
};
