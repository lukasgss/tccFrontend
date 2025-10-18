import { NumberInput } from "@mantine/core";
import { Control, Controller, FieldError } from "react-hook-form";

export interface InputNumberProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
  label: string;
  placeholder: string;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  suffix?: string;
  allowNegative?: boolean;
  min?: number;
}

export default function InputNumber({
  name,
  control,
  error,
  label,
  placeholder,
  size = "md",
  suffix,
  allowNegative = false,
  min = 1,
}: Readonly<InputNumberProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <NumberInput
          className="w-full"
          name={name}
          error={error ? error.message : null}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          placeholder={placeholder}
          size={size}
          suffix={suffix}
          allowNegative={allowNegative}
          min={min}
        />
      )}
    />
  );
}
