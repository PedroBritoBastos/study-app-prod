// styles
import { styles } from "@/styles/form/input.styles";

// components
import { Input as ChakraInput } from "@chakra-ui/react";

type Props = {
   name?: string;
   type?: string;
   placeholder?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ name, type, placeholder, value, onChange }: Props) {
   return <ChakraInput {...styles.input} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
}