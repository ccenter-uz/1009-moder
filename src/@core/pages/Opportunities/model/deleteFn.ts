import Swal from "sweetalert2";
import { deleteContent } from "../api/actions";
import { toast } from "react-toastify";
import { getURL } from "@/@core/application/utils/fn";

// DELETE
export const handleDelete = async (
  id: string | number,
  lastLink: string
): Promise<string | any> => {
  Swal.fire({
    title: "Are you sure?",
    text: "if you delete, content inside also will be removed and you won`t be able to revert it!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteContent(`${getURL(lastLink)}`, id);
      if (res?.status === "success") {
        toast.success(res.message, { position: "bottom-right" });

        setTimeout(() => window.location.reload(), 1500);
      }
    }
  });
};
