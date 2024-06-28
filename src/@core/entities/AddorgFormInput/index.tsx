import { scssVariables } from "@/@core/application/utils/vars";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  value: string;
  label: string;
  placeholder: string;
  errortext?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const AddorgFormInput: FC<Props> = (props) => {
  const {
    register,
    errors,
    errortext,
    value,
    label,
    placeholder,
    required,
    minLength,
    maxLength,
  } = props;

  return (
    <FormControl
      isInvalid={!!errors[`${value}`]}
      mt={{ base: "0", sm: "10px", md: "10px", xl: "10px" }}
      mb={{ base: "1em", sm: "1em", md: "1em", xl: "1em" }}
    >
      <FormLabel
        htmlFor={`${value}`}
        fontSize={{ base: "13px", sm: "13px", md: "16px", xl: "16px" }}
        mb={{ base: "2px", sm: "2px", md: "8px", xl: "8px" }}
        fontWeight={500}
      >
        {label}
      </FormLabel>
      <Input
        {...register(`${value}`, { required, minLength, maxLength })}
        id={`${value}`}
        placeholder={placeholder}
        fontSize={{ base: "13px", sm: "13px", md: "14px", xl: "14px" }}
        bg={"white"}
        border={"1px solid rgba(0, 0, 0, 0.10)"}
        _focus={{
          boxShadow: `0 0 2px ${scssVariables.blockBgColor}`,
          border: "1px solid teal",
        }}
        boxShadow={scssVariables.boxShadow}
        padding={{
          base: "5px 10px",
          sm: "5px 10px",
          md: "12px 16px",
          xl: "12px 16px",
        }}
        h={{ base: "30px", sm: "30px", md: "45px", xl: "45px" }}
      />
      <FormErrorMessage
        fontSize={{ base: "12px", sm: "12px", md: "14px", xl: "14px" }}
      >
        {errortext}
      </FormErrorMessage>
    </FormControl>
  );
};
