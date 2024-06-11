import { DrawerUI } from "@/shared/ui/Drawer";
import { FC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerLinks: FC<Props> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <DrawerUI isOpen={isOpen} onClose={onClose} title="LINKS">
      <h1>Here will be links</h1>
    </DrawerUI>
  );
};
