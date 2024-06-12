"use client";
import { scssVariables } from "@/application/utils/vars";
import { TableData } from "@/shared/types";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";

const GuestTable: FC<Partial<TableData>> = ({ rows, header = [] }) => {
  const { colorMode } = useColorMode();

  return (
    <TableContainer borderRadius={"4px"} border={"1px solid #E2E8F0"}>
      <Table aria-label="table">
        <Thead>
          <Tr>
            {header.map((col, colIndex) => (
              <Th
                bg={
                  colorMode === "dark" ? "#484a4a" : scssVariables.blockBgColor
                }
                key={colIndex}
                fontWeight={600}
                textTransform={"capitalize"}
                fontSize={{ base: "12px", sm: "12px", md: "16px", xl: "16px" }}
                p={{
                  base: "8px 10px",
                  sm: "8px 10px",
                  md: "16px 24px",
                  xl: "16px 24px",
                }}
                borderRight={"1px solid #E2E8F0"}
              >
                {col.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows?.map((row, rowIndex) => (
            <Tr
              _even={
                colorMode === "dark"
                  ? { background: "#484a4a" }
                  : { background: scssVariables.blockBgColor }
              }
              key={rowIndex}
            >
              {header.map((column, colIndex) => (
                <Td
                  fontSize={{
                    base: "12px",
                    sm: "12px",
                    md: "14px",
                    xl: "14px",
                  }}
                  p={{
                    base: "8px 10px",
                    sm: "8px 10px",
                    md: "16px 24px",
                    xl: "16px 24px",
                  }}
                  key={colIndex}
                >
                  {row[column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default GuestTable;
