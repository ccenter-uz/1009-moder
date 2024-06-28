"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Menu, Search, User } from "react-feather";
import { FC } from "react";
import { useDisclosure } from "@/@core/shared/hook/useDisclosure";
import { DrawerLinks } from "./DrawerLinks";
import { Profile } from "./Profile";

type Props = {};

export const Header: FC<Props> = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenProfile,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
  } = useDisclosure();

  return (
    <Box
      w="100%"
      bg={"#fff"}
      h={{ base: "50px", sm: "50px", md: "70px", xl: "70px" }}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.02)"
      display={"flex"}
      alignItems={"center"}
      justifyContent={{
        base: "center",
        sm: "flex-end",
        md: "flex-end",
        xl: "flex-end",
      }}
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
      fontSize={scssVariables.fonts.parag}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={{ base: "10px", sm: "10px", md: "20px", xl: "20px" }}
      >
        <Box
          className="burger-menu"
          display={{ base: "block", sm: "none", md: "none", xl: "none" }}
        >
          <Menu width={"20px"} height={"20px"} onClick={onOpen} />
        </Box>
        <Box>
          <InputGroup>
            <Input
              placeholder="Search"
              variant="outline"
              borderColor={"lightgrey"}
              fontSize={scssVariables.fonts.parag}
              p={{
                base: "5px 10px",
                sm: "5px 10px",
                md: "5px 10px",
                xl: "5px 10px",
              }}
              h={{ base: "30px", sm: "30px", md: "40px", xl: "40px" }}
              _focus={{
                borderColor: "teal",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02)",
              }}
            />
            <InputRightElement
              h={{ base: "30px", sm: "30px", md: "40px", xl: "40px" }}
              _hover={{
                cursor: "pointer",
                opacity: "0.7",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Search height={"20px"} width={"20px"} />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box display={{ base: "none", sm: "block", md: "block", xl: "block" }}>
          <Text fontSize={scssVariables.fonts.parag}>Azizov Aziz</Text>
          <Text fontSize={scssVariables.fonts.span} color={"grey"}>
            moderator
          </Text>
        </Box>

        <Box
          border={"2px solid teal"}
          borderRadius={"50%"}
          p={{ base: "2px", sm: "2px", md: "5px", xl: "5px" }}
          w={{ base: "30px", sm: "30px", md: "34px", xl: "34px" }}
          h={{ base: "30px", sm: "30px", md: "34px", xl: "34px" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          userSelect={"none"}
          position={"relative"}
          onClick={onOpenProfile}
        >
          <User width={"24"} height={"24"} color={"teal"} />
          {/* PROFILE-POPOVER */}
          <Profile isOpen={isOpenProfile} onClose={onCloseProfile} />
        </Box>
      </Box>
      {/* DRAWER-LINKS */}
      <DrawerLinks isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
