import { ResultAsync } from "@/pages/Result";
import { PaperContent } from "@/shared/ui/PaperContent";
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
