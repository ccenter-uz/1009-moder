import { scssVariables } from "@/application/utils/vars";
import InputGen from "@/shared/ui/Input";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormErrorMessage,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  errors?: FieldErrors<FieldValues>;
  register?: UseFormRegister<FieldValues>;
  children?: ReactNode;
  inputs?: {
    id: string | number;
    value: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    placeholder: string;
    errortext?: string;
    type?: string;
  }[];
};

export const AddorgAccordionInputs = (props: Props) => {
  const { label, errors, register, inputs, children } = props;
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Accordion
        defaultIndex={[0]}
        allowToggle
        border={"1px solid rgba(0,0,0,0.10)"}
        borderRadius={"8px"}
        mb={{ base: "1em", sm: "1em", md: "1em", xl: "1em" }}
        mt={{ base: "1.5em", sm: "1.5em", md: "2em", xl: "2em" }}
      >
        <AccordionItem
          borderTop={"none"}
          borderBottom={"none"}
          boxShadow={scssVariables.boxShadow}
        >
          <h2>
            <AccordionButton
              bg={"white"}
              color={"black"}
              _hover={{ bg: "white" }}
              borderRadius={"8px"}
              h={{ base: "30px", sm: "30px", md: "45px", xl: "45px" }}
              p={{
                base: "5px 10px",
                sm: "5px,10px",
                md: "12px 16px",
                xl: "12px 16px",
              }}
              fontSize={{ base: "13px", sm: "13px", md: "14px", xl: "14px" }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontWeight={500}
                fontSize={{ base: "13px", sm: "13px", md: "16px", xl: "16px" }}
              >
                {label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            bg={colorMode === "dark" ? "#1E1E1E" : "#fff"}
            p={{
              base: "5px 10px",
              sm: "5px,10px",
              md: "12px 16px",
              xl: "12px 16px",
            }}
          >
            {children
              ? children
              : inputs?.map((input: any) => (
                  <FormControl
                    isInvalid={errors ? !!errors[`${input.value}`] : false}
                    key={input.id}
                    my={{ base: "8px", sm: "8px", md: "10px", xl: "10px" }}
                  >
                    <InputGen
                      p={{
                        base: "5px 10px",
                        sm: "5px,10px",
                        md: "12px 16px",
                        xl: "12px 16px",
                      }}
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "14px",
                        xl: "14px",
                      }}
                      h={{ base: "30px", sm: "30px", md: "45px", xl: "45px" }}
                      border={"1px solid rgba(0,0,0,0.10)"}
                      _hover={{ bg: "#fff" }}
                      id={input.value}
                      bg={"#fff"}
                      type={input.type || "text"}
                      placeholder={input.placeholder}
                      {...(register &&
                        register(`${input.value}`, {
                          required: input.required,
                          minLength: input.minLength,
                          maxLength: input.maxLength,
                        }))}
                    />
                    <FormErrorMessage
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "14px",
                        xl: "14px",
                      }}
                    >
                      {input.errortext}
                    </FormErrorMessage>
                  </FormControl>
                ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
