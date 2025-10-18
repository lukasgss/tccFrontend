import { Input } from "@mantine/core";
import type { MaskedDynamic, MaskedPattern } from "imask";
import { Control, Controller, FieldError } from "react-hook-form";
import { IMaskInput } from "react-imask";

type CustomIMaskInputProps = React.ComponentProps<typeof IMaskInput> & {
  dispatch?: (appended: string, dynamicMasked: MaskedDynamic) => MaskedPattern;
};

interface InputPhoneProps {
  control: Control<any>;
  name: string;
  error?: FieldError;
  label: string;
  required: boolean;
}

export default function InputPhone({ control, name, error, label, required }: InputPhoneProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <Input.Wrapper label={label} withAsterisk={required} error={error ? error.message : null}>
          <Input
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            error={error ? error.message : null}
            component={IMaskInput as React.FC<CustomIMaskInputProps>}
            mask={[
              { mask: "(00) 0000-0000", lazy: true },
              { mask: "(00) 00000-0000", lazy: true },
            ]}
            dispatch={(appended: string, dynamicMasked: MaskedDynamic) => {
              const number = (dynamicMasked.value + appended).replace(/\D/g, "");
              return number.length > 10
                ? (dynamicMasked.compiledMasks[1] as MaskedPattern)
                : (dynamicMasked.compiledMasks[0] as MaskedPattern);
            }}
            placeholder="(31) 98765-4321"
            required={required}
          />
        </Input.Wrapper>
      )}
    />
  );
}
