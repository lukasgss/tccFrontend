import { Textarea } from "@mantine/core";
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputTextAreaProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  autosize: boolean;
  minRows?: number;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default function InputTextArea({
  control,
  name,
  label,
  placeholder,
  autosize = true,
  minRows = 0,
  error,
}: InputTextAreaProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange } }) => (
        <Textarea
          placeholder={placeholder}
          size="md"
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          error={error ? (error.message as string) : null}
          value={value}
          autosize={autosize}
          minRows={minRows}
        />
      )}
    />
  );
}
