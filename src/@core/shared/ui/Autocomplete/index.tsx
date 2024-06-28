"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { IOption, ISelectAutocomplelte } from "@/@core/shared/types";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

const SelectAutocomplete: FC<ISelectAutocomplelte> = ({
  options,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const optionFilter = options?.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectOption = (option: IOption) => {
    setInputValue(option.value);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Box position={"relative"} ref={ref}>
      <InputGroup>
        <InputLeftElement>
          <img src="/search-line.svg" alt="search" />
        </InputLeftElement>
        <Input
          id="search-opportunities"
          border={"none"}
          outline={"none"}
          boxShadow={"0px 15px 20px 0px #0000000D"}
          _focus={{ border: `none`, boxShadow: "none" }}
          bg={"#fff"}
          onFocus={() => setIsOpen(true)}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="search"
          fontSize={scssVariables.fonts.parag}
        />
      </InputGroup>
      {isOpen && (
        <List
          w={"100%"}
          maxH={"150px"}
          position={"absolute"}
          zIndex={99}
          overflowY={"scroll"}
          scrollBehavior={"smooth"}
          borderRadius={"8px"}
          p={"0.3em"}
          bg={"#fff"}
          fontSize={scssVariables.fonts.parag}
          border={`2px solid ${scssVariables.blockBgColor}`}
        >
          {optionFilter.length > 0 ? (
            optionFilter.map((option, index) => (
              <ListItem
                w={"100%"}
                p={"0.3em "}
                borderRadius={"4px"}
                _hover={{ bg: scssVariables.blockBgColor, cursor: "pointer" }}
                key={index}
                onClick={() => handleSelectOption(option)}
                color={"#252525"}
              >
                {option.label}
              </ListItem>
            ))
          ) : (
            <Box
              h={"100px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text color={"#252525"}>No item found!</Text>
            </Box>
          )}
        </List>
      )}
    </Box>
  );
};

export default SelectAutocomplete;
