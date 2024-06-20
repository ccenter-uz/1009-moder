"use client";
// StyledBox.js
import styled from "@emotion/styled";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { scssVariables } from "@/application/utils/vars";

const BoxGen = styled(Box)`
  background-color: ${() =>
    useColorModeValue("transparent", scssVariables.darkBg)};
`;

export default BoxGen;
