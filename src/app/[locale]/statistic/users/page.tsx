import { StatisticsUsersAsync } from "@/@core/pages/Statistics";
import { PaperContent } from "@/@core/shared/ui/PaperContent";

const StatisticsUsers = () => {
  return (
    <PaperContent>
      <StatisticsUsersAsync />
    </PaperContent>
  );
};

export default StatisticsUsers;
