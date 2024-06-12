import { scssVariables } from "@/application/utils/vars";
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { FC, ReactNode, forwardRef } from "react";

type Iinput = {
  width: string | InputProps;
  button: ReactNode | null;
  rightWidth: string | "100px" | any;
};

const InputGen: FC<Partial<Iinput & InputProps>> = forwardRef(
  ({ button = null, rightWidth, width, ...props }, ref) => {
    return (
      <InputGroup width={width}>
        <Input
          {...props}
          ref={ref}
          focusBorderColor="teal.400"
          _focus={{
            boxShadow: `0 0 2px ${scssVariables.blockBgColor}`,
            border: "1px solid teal",
          }}
          sx={{ border: "1px solid lightgrey" }}
        />
        <InputRightElement width={rightWidth} h={"100%"}>
          {button}
        </InputRightElement>
      </InputGroup>
    );
  }
);

export default InputGen;
