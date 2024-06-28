"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { useLang } from "@/@core/shared/hook/useLang";
import { IPagination } from "@/@core/shared/types";
import { Box, Button, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";

// options
const options = [
  {
    id: 1,
    value: 10,
    label: 10,
  },
  {
    id: 2,
    value: 20,
    label: 20,
  },
  {
    id: 3,
    value: 50,
    label: 50,
  },
];

// ButtonStyle
const buttonStyle = {
  sx: {
    bgColor: "transparent",
    border: "1px solid rgba(217, 217, 217, 1)",
    color: "teal",
    borderRadius: "4px",
  },
  _active: { background: "teal.400", color: "#fff" },
  minWidth: { base: "24px", sm: "24px", md: "35px", xl: "35px" },
  height: { base: "24px", sm: "24px", md: "35px", xl: "35px" },
  fontSize: scssVariables.fonts.parag,
  p: {
    base: "5px",
    sm: "5px",
    md: "auto",
    xl: "auto",
  },
};
// SelectStyle
const selectStyle = {
  style: { border: "1px solid lightgrey" },
  w: { base: "100px", sm: "100px", md: "120px", xl: "120px" },
  h: { base: "24px", sm: "24px", md: "35px", xl: "35px" },
  _focus: { boxShadow: "none" },
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: scssVariables.fonts.parag,
};

const Pagination: FC<IPagination> = ({
  total = 50,
  pageSize = 10,
  current = 1,
  onChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const maxButtons = 5;
  const { t } = useLang();

  // page-changer
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange(newPage);
    }
  };

  // size-changer
  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    onPageSizeChange(newSize);
  };

  // middle-buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, current - Math.floor(maxButtons / 2));
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    // Add the "First" button
    buttons.push(
      <Button
        {...buttonStyle}
        isDisabled={current === 1}
        aria-disabled={current === 1}
        key={0}
        onClick={() => handlePageChange(1)}
      >
        {"<<"}
      </Button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          {...buttonStyle}
          key={i}
          isActive={current === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Add the "Last" button
    buttons.push(
      <Button
        {...buttonStyle}
        key={totalPages + 1}
        isDisabled={current === totalPages}
        aria-disabled={current === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {">>"}
      </Button>
    );

    return buttons;
  };

  return (
    <Box
      aria-label="pagination-wrapper"
      display={"flex"}
      flexWrap={"wrap"}
      alignItems={"center"}
      gap={{ base: "4px", sm: "4px", md: "8px", xl: "8px" }}
      justifyContent={"flex-end"}
      my={{ base: "12px", sm: "12px", md: "24px", xl: "24px" }}
    >
      <Text aria-readonly={true} fontSize={scssVariables.fonts.parag}>
        {current} {t("from")} {total} {t("th")}
      </Text>
      <Button
        {...buttonStyle}
        isDisabled={current === 1}
        aria-disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
      >
        <span>{"<"}</span>
      </Button>
      {renderPaginationButtons()}
      <Button
        {...buttonStyle}
        isDisabled={current === totalPages}
        aria-disabled={current === totalPages}
        onClick={() => handlePageChange(current + 1)}
      >
        <span>{">"}</span>
      </Button>
      <Select
        {...selectStyle}
        aria-label="pageSize-changer"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        {options.map((opt) => (
          <option value={opt.value} key={opt.id}>
            {opt.label} / {t("page")}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default memo(Pagination);
