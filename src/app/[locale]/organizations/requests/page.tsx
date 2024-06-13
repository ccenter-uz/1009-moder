import { RequestsAsync } from "@/pages/Organizations";
import { PaperContent } from "@/shared/ui/PaperContent";
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
