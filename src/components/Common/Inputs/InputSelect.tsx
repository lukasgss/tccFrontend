import { ComboboxData, Select } from "@mantine/core";
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface DropdownSelectProps {
  data?: ComboboxData;
  label: string;
  placeholder: string;
  control: Control<any>;
  name: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required: boolean;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  title?: string;
}

export default function InputSelect({
  data,
  control,
  label,
  placeholder,
  name,
  error,
  required,
  size = "md",
  searchable = true,
  clearable = true,
  disabled,
  title,
}: Readonly<DropdownSelectProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <Select
          size={size}
          error={error ? (error.message as string) : null}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          searchable={searchable}
          clearable={clearable}
          withAsterisk={required}
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          data={data}
          title={title}
          comboboxProps={{ shadow: "md" }}
        />
      )}
    />
  );
}
