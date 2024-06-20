"use client";
import { useLang } from "@/shared/hook/useLang";
import BreadCrumb from "@/shared/ui/Breadcrumb";
import { Box, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import Banner from "./banner";
import MainDataPart from "./mainDataPart";
import GallaryPart from "./galleryPart";
import Info from "./info";

export const Result = () => {
  const { t } = useLang();
  const router = useRouter();
  const params = useParams()!;
  const breadcrumblink = [
    {
      id: 1,
      title: (
        <Text
          as={"span"}
          cursor={"pointer"}
          _hover={{ opacity: "0.8" }}
          onClick={() => router.back()}
        >
          {"<- " + t("back")}
        </Text>
      ),
    },
    {
      id: 2,
      title: params.id,
    },
  ];

  return (
    <Box id="result-item" className="wrapper fade-in" minH={"100dvh"}>
      <BreadCrumb item={breadcrumblink} />
      <Banner />
      <MainDataPart />
      <GallaryPart />
      <Info />
    </Box>
  );
};
