import { MyorgsAsync } from "@/pages/Organizations";
import { PaperContent } from "@/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Myorgs: FC<Props> = (props) => {
  return (
    <PaperContent>
      <MyorgsAsync />
    </PaperContent>
  );
};

export default Myorgs;
