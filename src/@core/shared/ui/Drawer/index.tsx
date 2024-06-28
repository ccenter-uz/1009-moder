import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Portal,
  StyleProps,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?:
    | string
    | {
        base?: string;
        sm: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
  footer?: ReactNode;
  title?: string;
  titleStyle?: StyleProps;
  footerStyle?: StyleProps;
};

export const DrawerUI: FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    width,
    children,
    footer,
    title,
    titleStyle,
    footerStyle,
  } = props;

  return (
    <Portal>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent w={width}>
          <DrawerCloseButton />
          {title && <DrawerHeader {...titleStyle}>{title}</DrawerHeader>}
          <DrawerBody>{children}</DrawerBody>
          {footer && <DrawerFooter {...footerStyle}>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    </Portal>
  );
};
