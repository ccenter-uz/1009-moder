import { PodrazdelAsync } from "@/@core/pages/Manage";
import { PaperContent } from "@/@core/shared/ui/PaperContent";

type Props = {};

const Podrazdel = (props: Props) => {
  return (
    <PaperContent>
      <PodrazdelAsync />
    </PaperContent>
  );
};

export default Podrazdel;
