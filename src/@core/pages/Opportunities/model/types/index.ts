import { TableData } from "@/@core/shared/types";

export type IdataInfoFromApi = {
  id: string;
  mention: string;
  table_arr: {
    table: TableData;
  };
  text: { content: { id: string | number; text: string }[] };
  title: string;
  warning: string;
  type: "text" | "table";
};
