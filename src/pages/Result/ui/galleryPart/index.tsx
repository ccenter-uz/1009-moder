import Loading from "@/app/[locale]/loading";
import { Box, Button, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC } from "react";
import "react-alice-carousel/lib/alice-carousel.css";

const AliceCarousel = dynamic(() => import("react-alice-carousel"), {
  ssr: false,
  loading: () => <Loading />,
});

const images = [
  <img
    key={1}
    width={"97%"}
    height={"393px"}
    src="/carousel/1.svg"
    role="presentation"
    alt="1"
  />,
  <img
    key={2}
    width={"97%"}
    height={"393px"}
    src="/carousel/2.svg"
    role="presentation"
    alt="2"
  />,
  <img
    key={3}
    width={"97%"}
    height={"393px"}
    src="/carousel/1.svg"
    role="presentation"
    alt="1"
  />,
  <img
    key={4}
    width={"97%"}
    height={"393px"}
    src="/carousel/2.svg"
    role="presentation"
    alt="2"
  />,
];

const responsive = {
  0: { items: 1 },
  545: { items: 1 },
  768: { items: 2 },
  1024: { items: 3 },
};
const GallaryPart: FC = () => {
  return (
    <Box mt={{ base: "5em", sm: "5em", md: "10em", xl: "10em" }}>
      <Text
        fontSize={{ base: "14px", sm: "14px", md: "16px", xl: "20px" }}
        color={"grey"}
        mb={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
      >
        Картинки
      </Text>
      <AliceCarousel
        infinite
        disableDotsControls
        animationDuration={1500}
        key={"carousel"}
        items={images}
        responsive={responsive}
        renderPrevButton={() => {
          return (
            <Button
              position={"absolute"}
              top={"45%"}
              left={-4}
              borderRadius={"50%"}
              w={"45px"}
              h={"45px"}
              opacity={0.9}
            >
              {"<"}
            </Button>
          );
        }}
        renderNextButton={() => {
          return (
            <Button
              position={"absolute"}
              top={"45%"}
              right={0}
              borderRadius={"50%"}
              w={"45px"}
              h={"45px"}
              opacity={0.9}
            >
              {">"}
            </Button>
          );
        }}
      />
    </Box>
  );
};

export default GallaryPart;
