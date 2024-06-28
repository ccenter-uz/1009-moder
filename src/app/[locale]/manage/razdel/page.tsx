import { RazdelAsync } from "@/@core/pages/Manage";
import { PaperContent } from "@/@core/shared/ui/PaperContent";

type Props = {};

const Razdel = (props: Props) => {
  return (
    <PaperContent>
      <RazdelAsync />
    </PaperContent>
  );
};

export default Razdel;
