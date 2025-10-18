import { Combobox, Input, Pill, PillsInput, ScrollArea, useCombobox } from "@mantine/core";
import { Control, Controller, FieldError, Merge } from "react-hook-form";
import { ColorResponse } from "../../../../../services/requests/Pets/types";
import ColorOption from "./ColorOption";
import ColorPill from "./ColorPill";

interface ColorsInputMultiSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
  error?: Merge<FieldError, [(FieldError | undefined)?, ...(FieldError | undefined)[]]>;
  data?: ColorResponse[];
}

export default function ColorsInputMultiSelect({
  control,
  name,
  label,
  placeholder,
  error,
  required = false,
  data,
}: Readonly<ColorsInputMultiSelectProps>) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleValueSelect = (val: string) => {
          if (!Array.isArray(value)) {
            onChange([val]);
          } else {
            const newValues = value.includes(val) ? value.filter((v: string) => v !== val) : [...value, val];
            onChange(newValues);
          }
        };

        const handleValueRemove = (val: string) => onChange(value.filter((v: string) => v !== val));

        const values = value?.map((item: string) => (
          <ColorPill key={item} data={data} value={item.toString()} onRemove={() => handleValueRemove(item)} />
        ));

        return (
          <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
              <PillsInput
                label={label}
                size="md"
                required={required}
                withAsterisk={required}
                error={error ? (error.message as string) : null}
                onClick={() => combobox.toggleDropdown()}
              >
                <Pill.Group>
                  {values?.length > 0 ? (
                    values
                  ) : (
                    <Input.Placeholder className="text-[1rem]">{placeholder}</Input.Placeholder>
                  )}
                  <Combobox.EventsTarget>
                    <PillsInput.Field
                      type="hidden"
                      onBlur={() => combobox.closeDropdown()}
                      onKeyDown={(event) => {
                        if (event.key === "Backspace" && value.length > 0) {
                          event.preventDefault();
                          handleValueRemove(value[value.length - 1]);
                        }
                      }}
                    />
                  </Combobox.EventsTarget>
                </Pill.Group>
              </PillsInput>
            </Combobox.DropdownTarget>
            <Combobox.Dropdown mah="300">
              <Combobox.Options>
                <ScrollArea.Autosize type="scroll" mah={250}>
                  {data?.map((item) => <ColorOption key={item.id} item={item} value={value} />)}
                </ScrollArea.Autosize>
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        );
      }}
    />
  );
}
