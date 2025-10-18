import { Button, Checkbox, Text, TextInput, Tooltip, useMantineTheme } from "@mantine/core";
import { X } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CheckboxOption } from "./types";

interface InputCheckboxGroupProps {
  control: Control<any>;
  name: string;
  defaultValue?: string[];
  checkboxOptions: CheckboxOption[];
  label: string;
  description?: string;
  required: boolean;
  hasOtherField?: boolean;
  otherFieldPlaceholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  multiLine?: boolean;
  alreadyMarkedOptionLabels?: string[];
}

export default function InputCheckboxGroup({
  defaultValue,
  checkboxOptions,
  control,
  name,
  label,
  description,
  required,
  hasOtherField = false,
  size = "md",
  otherFieldPlaceholder = "Outro",
  multiLine = false,
  alreadyMarkedOptionLabels,
}: Readonly<InputCheckboxGroupProps>) {
  const [showOtherField, setShowOtherField] = useState(false);
  const [otherFieldValue, setOtherFieldValue] = useState<string>("");
  const [customAddedFields, setCustomAddedFields] = useState<string[]>([]);
  const [alreadyExistingFieldErrorMsg, setAlreadyExistingFieldErrorMsg] = useState<string | null>(null);

  const theme = useMantineTheme();

  const handleOtherFieldClick = () => {
    setShowOtherField((value) => !value);
  };

  const handleAddOtherRestriction = (value: string[], onChange: (values: string[]) => void) => {
    if (customAddedFields.some((otherValue) => otherValue.toLowerCase() === otherFieldValue.toLowerCase())) {
      setAlreadyExistingFieldErrorMsg("Restrição já adicionada.");
      return;
    }

    const newValue = [...value, otherFieldValue];
    onChange(newValue);
    setCustomAddedFields((prevValue) => [...prevValue, otherFieldValue]);
    setOtherFieldValue("");
    setAlreadyExistingFieldErrorMsg(null);
  };

  const handleRemoveCustomRestriction = (
    restrictionToRemove: string,
    value: string[],
    onChange: (values: string[]) => void,
  ) => {
    const updatedFormValues = value.filter((val) => val !== restrictionToRemove);
    onChange(updatedFormValues);

    const updatedRestrictions = customAddedFields.filter((restriction) => restriction !== restrictionToRemove);
    setCustomAddedFields(updatedRestrictions);
  };

  const defaultExistingCheckboxOptions = useMemo(() => {
    return checkboxOptions
      .filter((option) => alreadyMarkedOptionLabels?.includes(option.label))
      .map((option) => option.value);
  }, [checkboxOptions, alreadyMarkedOptionLabels]);

  const getCheckboxDefaultExistingOptions = () => {
    if (alreadyMarkedOptionLabels) {
      const labelsForNonExistentOptions = alreadyMarkedOptionLabels?.filter(
        (option) => !defaultExistingCheckboxOptions.includes(option),
      );
      if (labelsForNonExistentOptions.length > 0) {
        return [...defaultExistingCheckboxOptions, "other"];
      }

      return defaultExistingCheckboxOptions;
    }

    if (defaultValue) {
      return defaultValue;
    }

    return undefined;
  };

  const checkboxDefaultValuesForNonExistentOptions = useMemo(() => {
    return alreadyMarkedOptionLabels?.filter((option) => !defaultExistingCheckboxOptions.includes(option));
  }, [alreadyMarkedOptionLabels, defaultExistingCheckboxOptions]);

  useEffect(() => {
    if (checkboxDefaultValuesForNonExistentOptions?.length) {
      setCustomAddedFields(checkboxDefaultValuesForNonExistentOptions);
      setShowOtherField(true);
    }
  }, [checkboxDefaultValuesForNonExistentOptions]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange } }) => (
        <Checkbox.Group
          defaultValue={getCheckboxDefaultExistingOptions()}
          onBlur={onBlur}
          onChange={(e) => {
            const values = e.filter((v) => v !== "other");
            onChange(values);
          }}
          label={label}
          description={description}
          withAsterisk={required}
          size={size}
          required={required}
        >
          <div className="flex mt-2 gap-3" style={{ flexDirection: multiLine ? "column" : "row" }}>
            {checkboxOptions.map((option) => (
              <Checkbox key={option.value} value={option.value} label={option.label} />
            ))}

            {customAddedFields.map((customField) => (
              <div key={customField} className="flex items-center gap-1.5">
                <Text>- {customField}</Text>
                <Tooltip label="Remover restrição">
                  <Button
                    size="compact-xs"
                    variant="outline"
                    onClick={() => handleRemoveCustomRestriction(customField, value, onChange)}
                  >
                    <X size={16} color={theme.colors.red[8]} />
                  </Button>
                </Tooltip>
              </div>
            ))}

            {hasOtherField && (
              <div>
                <Checkbox value="other" label="Outro" onChange={() => handleOtherFieldClick()} />
                {showOtherField && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2.5">
                      <TextInput
                        name="qual"
                        label="Qual?"
                        value={otherFieldValue}
                        onChange={(e) => setOtherFieldValue(e.target.value)}
                        placeholder={otherFieldPlaceholder}
                      />
                      <Button variant="light" type="button" onClick={() => handleAddOtherRestriction(value, onChange)}>
                        Adicionar
                      </Button>
                    </div>
                    {alreadyExistingFieldErrorMsg ? (
                      <Text className="!text-[#FA5252]">{alreadyExistingFieldErrorMsg}</Text>
                    ) : null}
                  </>
                )}
              </div>
            )}
          </div>
        </Checkbox.Group>
      )}
    />
  );
}
