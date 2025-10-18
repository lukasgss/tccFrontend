import { ComboboxData, MultiSelect } from "@mantine/core";
import { Control, Controller, FieldError, Merge } from "react-hook-form";

interface InputMultiSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  searchable?: boolean;
  placeholder: string;
  error?: Merge<FieldError, [(FieldError | undefined)?, ...(FieldError | undefined)[]]>;
  data?: ComboboxData;
}

export default function InputMultiSelect({
  control,
  name,
  label,
  placeholder,
  error,
  required = false,
  searchable = true,
  data,
}: Readonly<InputMultiSelectProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange } }) => (
        <MultiSelect
          label={label}
          size="md"
          placeholder={value && value.length > 0 ? "" : placeholder}
          searchable={searchable}
          value={value}
          onChange={onChange}
          required={required}
          withAsterisk={required}
          onBlur={onBlur}
          error={error ? (error.message as string) : null}
          data={data}
        />
      )}
    />
  );
}
