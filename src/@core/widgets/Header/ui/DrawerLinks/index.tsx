import { Links } from "@/@core/application/helpers/links";
import { scssVariables } from "@/@core/application/utils/vars";
import { Link, usePathname } from "@/navigation";
import { useLang } from "@/@core/shared/hook/useLang";
import { DrawerUI } from "@/@core/shared/ui/Drawer";
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
import {} from "next/navigation";
import { FC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerLinks: FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const pathname = usePathname();
  const { locale } = useLang();

  return (
    <DrawerUI isOpen={isOpen} onClose={onClose} title="Панель модератора">
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        borderTop={"1px solid rgba(255, 255, 255, 0.6)"}
      >
        {Links.map((link) => (
          <Accordion key={link.id} allowToggle>
            <AccordionItem border={"none"}>
              <AccordionButton
                as={Link}
                href={link.href}
                p={"0.5em 0"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                color={"teal"}
                fontSize={scssVariables.fonts.span}
                className={`${
                  pathname == `/${locale}${link.href}` ? "active" : ""
                }`}
              >
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Icon as={link.icon} color={"teal"} w={"18px"} h={"18px"} />
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
                      onClick={() => onClose()}
                      color={"teal"}
                      fontSize={scssVariables.fonts.span}
                      className={`${
                        pathname == `/${locale}${subLink.href}` ? "active" : ""
                      }`}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                        <Icon
                          as={subLink.icon}
                          color={"teal"}
                          w={"12px"}
                          h={"12px"}
                        />
                        {subLink.title}
                      </Box>
                    </AccordionButton>
                  </AccordionPanel>
                ))}
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </DrawerUI>
  );
};
