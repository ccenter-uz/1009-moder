import { AddOrgAsync } from "@/pages/Organizations";
import { PaperContent } from "@/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Addorgs: FC<Props> = (props) => {
  return (
    <PaperContent>
      <AddOrgAsync />
    </PaperContent>
  );
};

export default Addorgs;
