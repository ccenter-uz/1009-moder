import { RazdelAsync } from "@/pages/Manage";
import { PaperContent } from "@/shared/ui/PaperContent";

type Props = {};

const Razdel = (props: Props) => {
  return (
    <PaperContent>
      <RazdelAsync />
    </PaperContent>
  );
};

export default Razdel;
