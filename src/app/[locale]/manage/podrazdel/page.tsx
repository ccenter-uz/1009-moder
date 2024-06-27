import { PodrazdelAsync } from "@/pages/Manage";
import { PaperContent } from "@/shared/ui/PaperContent";

type Props = {};

const Podrazdel = (props: Props) => {
  return (
    <PaperContent>
      <PodrazdelAsync />
    </PaperContent>
  );
};

export default Podrazdel;
