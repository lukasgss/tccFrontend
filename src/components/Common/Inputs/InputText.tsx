import { TextInput } from "@mantine/core";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required?: boolean;
  disabled?: boolean;
  label: string;
  placeholder: string;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  radius?: "lg" | "md" | "sm" | "xl" | "xs";
  rightSection?: JSX.Element;
};

export default function InputText({
  name,
  register,
  error,
  required,
  disabled = false,
  label,
  placeholder,
  rightSection,
  size = "md",
  radius = "sm",
}: Readonly<TextInputProps>) {
  return (
    <TextInput
      {...register(name)}
      error={error ? (error.message as string) : null}
      id={name}
      required={required}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      radius={radius}
      rightSection={rightSection}
    />
  );
}
