import { PaperContent } from "@/shared/ui/PaperContent";
import { FC, ReactNode } from "react";

type IOpporType = {
  children: ReactNode;
};

const OpportunitiesLayout: FC<IOpporType> = ({ children }) => {
  return <PaperContent>{children}</PaperContent>;
};

export default OpportunitiesLayout;
