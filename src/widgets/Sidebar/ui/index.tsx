"use client";
import { Links } from "@/application/helpers/links";
import { scssVariables } from "@/application/utils/vars";
import { Link } from "@/navigation";
import { useLang } from "@/shared/hook/useLang";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {};

export const Sidebar: FC<Props> = (props) => {
  const { locale } = useLang();
  const pathname = usePathname();

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
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        borderTop={"1px solid rgba(255, 255, 255, 0.6)"}
        pt={"1em"}
      >
        {Links.map((link) => (
          <Accordion key={link.id} allowToggle>
            <AccordionItem border={"none"}>
              <AccordionButton
                as={Link}
                href={link.href}
                display={"flex"}
                alignItems={"center"}
                justifyContent={{
                  base: "none",
                  sm: "center",
                  md: "space-between",
                }}
                color={"#fff"}
                fontSize={scssVariables.fonts.span}
                className={`${
                  pathname == `/${locale}${link.href}` ? "active" : ""
                }`}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"10px"}
                >
                  <Icon as={link.icon} color={"#fff"} w={"18px"} h={"18px"} />
                  <Text display={{ sm: "none", md: "flex", xl: "flex" }}>
                    {link.title}
                  </Text>
                </Box>
                {link.subMenu && <AccordionIcon />}
              </AccordionButton>
              {link.subMenu &&
                link.subMenu.map((subLink) => (
                  <AccordionPanel key={subLink.id} p={"0"}>
                    <AccordionButton
                      as={Link}
                      href={subLink.href}
                      color={"lightgrey"}
                      fontSize={scssVariables.fonts.span}
                      className={`${
                        pathname == `/${locale}${subLink.href}` ? "active" : ""
                      }`}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                        <Icon
                          as={subLink.icon}
                          color={"#fff"}
                          w={"12px"}
                          h={"12px"}
                        />
                        <Text>{subLink.title}</Text>
                      </Box>
                    </AccordionButton>
                  </AccordionPanel>
                ))}
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
