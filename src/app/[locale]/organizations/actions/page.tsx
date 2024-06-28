import { ActionsAsync } from "@/@core/pages/Organizations";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Actions: FC<Props> = (props) => {
  return (
    <PaperContent>
      <ActionsAsync />
    </PaperContent>
  );
};

export default Actions;
