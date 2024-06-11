import { scssVariables } from "@/application/utils/vars";
import { List, ListItem, Box, Divider, Text } from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import { X } from "react-feather";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Profile: FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const popoverRef = useRef<any>();

  //   OUTSIDE-CLICK
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick);

    return () => document.removeEventListener("mouseup", handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display={isOpen ? "block" : "none"}
      position={"absolute"}
      bg={"white"}
      zIndex={10}
      right={0}
      top={{ base: 8, sm: 8, md: 8, xl: 10 }}
      borderRadius={"10px"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.10)"}
      border={"1px solid #E5E5E5"}
      ref={popoverRef}
      w={{ base: "120px", sm: "120px", md: "180px", xl: "180px" }}
    >
      <Box
        className="close-btn"
        aria-label="Close"
        cursor={"pointer"}
        p={{
          base: "5px 5px 2px",
          sm: "5px 5px 2px",
          md: "5px 10px 2px",
          xl: "5px 10px 2px",
        }}
        borderBottom={"1px solid #E5E5E5"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        onClick={(e) => {
          e.stopPropagation(), onClose();
        }}
      >
        <Text fontSize={scssVariables.fonts.parag} fontWeight={500}>
          Aziz
        </Text>
        <X width={"15px"} height={"15px"} />
      </Box>
      <Box
        className="popover-content"
        aria-label="Content"
        p={{
          base: "2px 8px 5px",
          sm: "2px 8px 5px",
          md: "2px 10px 8px",
          xl: "2px 10px 8px",
        }}
      >
        <List fontSize={scssVariables.fonts.parag}>
          <ListItem>Profile</ListItem>
          <ListItem>Settings</ListItem>
          <ListItem>Logout</ListItem>
        </List>
      </Box>
    </Box>
  );
};
