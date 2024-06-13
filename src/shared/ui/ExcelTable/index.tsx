import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Modal,
  useColorMode,
  Box,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Divider,
  Input,
  Image,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { useLang } from "@/shared/hook/useLang";

interface TableColumn {
  key: string;
  title: string;
}

interface Row {
  id?: number;
  [key: string]: any;
}

interface TableProps {
  rows: Row[];
  columns: TableColumn[];
  recordId?: any;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  setDataTable: any;
  data: any;
}

// styles
const iconStyle = {
  w: { base: "15px", sm: "15px", md: "20px", xl: "20px" },
  h: { base: "15px", sm: "15px", md: "20px", xl: "20px" },
  role: "button",
};

const EditableTable: FC<TableProps> = ({
  rows: initialRows,
  columns: initialColumns,
  recordId,
  isOpen,
  onClose,
  setDataTable,
  data,
}) => {
  const { colorMode } = useColorMode();
  const [rows, setRows] = useState<Row[]>(
    initialRows.map((data, index) => ({ ...data, id: index + 1 }))
  );
  const [cols, setCols] = useState<TableColumn[]>(initialColumns);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const { t } = useLang();
  // DELETE
  // ROW
  const handleDeleteRow = (id: number | undefined) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  // COLUMN
  const handleDeleteColumn = (key: string) => {
    setCols(cols.filter((column) => column.key !== key));
    setRows(
      rows.map((row) => {
        const { [key]: deletedColumn, ...newRow } = row;

        return { id: newRow.id, ...newRow }; // Ensure id property is preserved
      })
    );
  };

  // EDIT
  // ROW
  const handleEditRow = (id: number | undefined) => {
    setEditingRowId(id as number);
  };
  // COLUMN
  const handleEditColumnTitle = (key: string, newTitle: string) => {
    const updatedCols = cols.map((column) => {
      if (column.key === key) {
        const newKey = DOMPurify.sanitize(newTitle)
          .toLowerCase()
          .replace(/\s/g, "_");
        const newRow = rows.map((row) => {
          const newRow = { ...row };
          newRow[newKey] = newRow[column.key];
          delete newRow[column.key];

          return newRow;
        });
        setRows(newRow);

        return { ...column, title: DOMPurify.sanitize(newTitle), key: newKey };
      }

      return column;
    });
    setCols(updatedCols);
  };

  // ADD
  // COLUMN
  const handleAddColumn = () => {
    const newTitle = prompt("Enter new column title");
    const filter =
      cols.filter((_) => _.title.toLowerCase() == newTitle?.toLowerCase())
        .length > 0
        ? true
        : false;
    if (!newTitle || filter)
      return alert("You have entered empty value or this value already exists");
    const newKey = DOMPurify.sanitize(newTitle)
      .toLowerCase()
      .replace(/\s/g, "_");
    setCols([...cols, { key: newKey, title: DOMPurify.sanitize(newTitle) }]);
    setRows(rows.map((row) => ({ ...row, [newKey]: "" })));
  };
  //ROW
  const handleAddRow = () => {
    const maxId = Math.max(...rows.map((row) => row.id as number), 0);
    const newRow: Row = { id: maxId + 1 };
    cols.forEach((column) => {
      newRow[column.key] = "";
    });
    setRows([...rows, newRow]);
  };

  // SAVE
  // ROW
  const handleSaveRow = (id: number | undefined) => {
    setEditingRowId(null);
  };
  // ALL
  const handleSave = () => {
    if (recordId) {
      const filtered = data.filter((item: any) => item.id !== recordId);
      setDataTable([...filtered, { id: recordId, header: cols, rows: rows }]);
    } else {
      setDataTable([
        ...data,
        { id: Date.now().toString(), header: cols, rows: rows },
      ]);
    }

    handleCloseModal();
  };

  // CLOSE
  const handleCloseModal = () => {
    onClose(false);
  };

  return (
    <Modal size={"full"} isOpen={isOpen} aria-modal onClose={handleCloseModal}>
      <ModalContent p={{ base: "8px", sm: "", md: "1em", xl: "1em" }}>
        <ModalHeader
          p={{ base: "8px", sm: "", md: "1em", xl: "1em" }}
          fontSize={{ base: "14px", sm: "14px", md: "20px", xl: "20px" }}
        >
          {t("create-or-edit-table")}
        </ModalHeader>
        <Divider mb={"1em"} />
        <ModalCloseButton />
        <Box>
          <Box display={"flex"} alignItems={"center"} gap={"8px"} my={"8px"}>
            <Button
              onClick={handleAddColumn}
              fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
              h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            >
              {t("add-column")}
            </Button>
            {cols.length > 0 && (
              <Button
                onClick={handleAddRow}
                fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
                h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
              >
                {t("add-row")}
              </Button>
            )}
          </Box>
          {cols.length > 0 && (
            <TableContainer borderRadius={"4px"} border={"1px solid #E2E8F0"}>
              <Table>
                <Thead bg={colorMode === "dark" ? "#484a4a" : "whitesmoke"}>
                  <Tr>
                    {cols.map((column) => (
                      <Th key={column.key} borderRight={"1px solid #E2E8F0"}>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          {column.title}
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            <Image
                              {...iconStyle}
                              src="/pencil.svg"
                              alt="edit"
                              onClick={() =>
                                handleEditColumnTitle(
                                  column.key,
                                  prompt("Enter new title") || ""
                                )
                              }
                            />

                            <Image
                              {...iconStyle}
                              src="/delete.svg"
                              alt="delete"
                              onClick={() => handleDeleteColumn(column.key)}
                            />
                          </Box>
                        </Box>
                      </Th>
                    ))}

                    <Th display={"flex"} justifyContent={"center"}>
                      {t("action")}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rows.map((row, rowIndex) => (
                    <Tr
                      key={rowIndex}
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "13px",
                        xl: "14px",
                      }}
                    >
                      {cols.map((column) => (
                        <Td key={column.key}>
                          {editingRowId === row.id ? (
                            <Input
                              type="text"
                              value={row[column.key]}
                              onChange={(e) =>
                                setRows(
                                  rows.map((r) =>
                                    r.id === row.id
                                      ? { ...r, [column.key]: e.target.value }
                                      : r
                                  )
                                )
                              }
                            />
                          ) : (
                            row[column.key]
                          )}
                        </Td>
                      ))}
                      <Td
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"8px"}
                      >
                        {editingRowId === row.id ? (
                          <>
                            <Button onClick={() => handleSaveRow(row.id)}>
                              {t("save")}
                            </Button>
                          </>
                        ) : (
                          <Image
                            {...iconStyle}
                            src="/pencil.svg"
                            alt="edit"
                            onClick={() => handleEditRow(row.id)}
                          />
                        )}
                        <Image
                          {...iconStyle}
                          src="/delete.svg"
                          alt="delete"
                          onClick={() => handleDeleteRow(row.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          {cols.length > 0 && rows.length > 0 && (
            <Box display={"flex"} justifyContent={"flex-end"} my={"8px"}>
              <Button
                fontSize={{ base: "12px", sm: "12px", md: "13px", xl: "14px" }}
                h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
                onClick={handleSave}
              >
                {t("save")}
              </Button>
            </Box>
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default EditableTable;
