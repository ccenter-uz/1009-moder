import { RequestsAsync } from "@/@core/pages/Organizations";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Requests: FC<Props> = (props) => {
  return (
    <PaperContent>
      <RequestsAsync />
    </PaperContent>
  );
};

export default Requests;
