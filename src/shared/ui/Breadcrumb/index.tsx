import { Link } from "@/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Iitem = {
  id: number | string;
  title: string | string[] | ReactNode;
  href?: string;
};

type Ibreadcrumb = {
  item: Iitem[] | [];
};

const BreadCrumb: FC<Ibreadcrumb> = ({ item }) => {
  return (
    <Breadcrumb
      separator={<Text color={"lightgrey"}>/</Text>}
      // mt={{ base: "5px", sm: "5px", md: "16px", xl: "16px" }}
      // mb={{ base: "16px", sm: "16px", md: "28px", xl: "28px" }}
    >
      {item?.map((value: Iitem) => (
        <BreadcrumbItem key={value.id}>
          {value.href ? (
            <BreadcrumbLink
              as={Link}
              color={"gray"}
              aria-current="page"
              href={value.href ? value.href : ""}
              fontSize={{ base: "10px", sm: "10px", md: "14px", xl: "14px" }}
            >
              {value.title}
            </BreadcrumbLink>
          ) : (
            <Text
              color={"gray"}
              fontSize={{ base: "10px", sm: "10px", md: "14px", xl: "14px" }}
            >
              {value.title}
            </Text>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
