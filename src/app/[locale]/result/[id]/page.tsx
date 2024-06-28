import { ResultAsync } from "@/@core/pages/Result";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Result: FC<Props> = () => {
  return (
    <PaperContent>
      <ResultAsync />
    </PaperContent>
  );
};

export default Result;
