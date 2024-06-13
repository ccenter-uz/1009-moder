import { DashboardAsync } from "@/pages/Dashboard";
import { PaperContent } from "@/shared/ui/PaperContent";
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
