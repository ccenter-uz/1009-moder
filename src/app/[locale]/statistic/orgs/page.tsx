import { StatisticsOrgsAsync } from "@/@core/pages/Statistics";
import { PaperContent } from "@/@core/shared/ui/PaperContent";

const StatisticsOrgs = () => {
  return (
    <PaperContent>
      <StatisticsOrgsAsync />
    </PaperContent>
  );
};

export default StatisticsOrgs;
