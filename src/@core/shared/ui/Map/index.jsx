import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { useLang } from "@/@core/shared/hook/useLang";
import { useDisclosure } from "@/@core/shared/hook/useDisclosure";
import { useAddorgSlicer } from "@/@core/pages/Organizations/Addorg/model/hook/useAddorgSlicer";

const defaultMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0],
});

const LocationFinderDummy = (props) => {
  const { setPosition } = props;
  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom());
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
};

export const Maps = () => {
  const { t } = useLang();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // position[0]=latitude, position[1]=longitude
  const { coordinates, setCoordinates } = useAddorgSlicer();
  const [position, setPosition] = useState(coordinates);

  // CHOOSE-COORDS
  const chooseCoords = () => {
    setCoordinates(position);
    onClose();
  };

  const handleClose = () => {
    setPosition(coordinates);
    onClose();
  };

  return (
    <Box position={"relative"}>
      <Text
        fontWeight={500}
        mb={{ base: "8px", sm: "8px", md: "10px", xl: "10px" }}
      >
        {t("add-location")}
      </Text>
      <iframe
        style={{ height: "200px", maxWidth: "400px", width: "100%" }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${
          position[1] - 0.01
        },${position[0] - 0.01},${position[1] + 0.01},${
          position[0] + 0.01
        }&layer=mapnik&marker=${position[0]},${position[1]}`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      <Box
        _hover={{ cursor: "pointer", bg: "rgba(0, 0, 0, 0.5)", color: "#fff" }}
        transition={"all 0.3s ease"}
        color={"transparent"}
        w={{ base: "100%", sm: "100%", md: "400px", xl: "400px" }}
        h={"200px"}
        zIndex={999}
        position={"absolute"}
        top={8}
        left={0}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={onOpen}
      >
        {t("change")}
      </Box>
      <Modal size={"5xl"} isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize={{ base: "14px", sm: "14px", md: "18px", xl: "18px" }}
            >
              {t("choose-location")}
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody
            p={0}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <MapContainer
              scrollWheelZoom={true}
              zoom={13}
              center={position}
              style={{ height: "80dvh", width: "95%" }}
            >
              <LocationFinderDummy setPosition={setPosition} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={defaultMarker}></Marker>
            </MapContainer>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={chooseCoords}
              colorScheme="teal"
              h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
              fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
            >
              {t("save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
