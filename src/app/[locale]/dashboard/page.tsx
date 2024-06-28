import { DashboardAsync } from "@/@core/pages/Dashboard";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import { FC } from "react";

type Props = {};

const Dashboard: FC<Props> = (props) => {
  return (
    <PaperContent>
      <DashboardAsync />
    </PaperContent>
  );
};

export default Dashboard;
