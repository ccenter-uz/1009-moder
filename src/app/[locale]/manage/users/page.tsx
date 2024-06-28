import { UsersAsync } from "@/@core/pages/Manage";
import { PaperContent } from "@/@core/shared/ui/PaperContent";

type Props = {};

const Users = (props: Props) => {
  return (
    <PaperContent>
      <UsersAsync />
    </PaperContent>
  );
};

export default Users;
