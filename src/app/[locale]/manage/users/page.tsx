import { UsersAsync } from "@/pages/Manage";
import { PaperContent } from "@/shared/ui/PaperContent";

type Props = {};

const Users = (props: Props) => {
  return (
    <PaperContent>
      <UsersAsync />
    </PaperContent>
  );
};

export default Users;
