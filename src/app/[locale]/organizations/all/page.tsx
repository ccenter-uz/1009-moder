import { AllorgsAsync } from "@/@core/pages/Organizations";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Allorgs: FC<Props> = (props) => {
  return (
    <PaperContent>
      <AllorgsAsync />
    </PaperContent>
  );
};
export default Allorgs;
