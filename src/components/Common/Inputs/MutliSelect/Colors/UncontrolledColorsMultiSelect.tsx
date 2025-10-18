import { Combobox, Input, Pill, PillsInput, ScrollArea, useCombobox } from "@mantine/core";
import { useState } from "react";
import { ColorResponse } from "../../../../../services/requests/Pets/types";
import ColorOption from "./ColorOption";
import ColorPill from "./ColorPill";

interface ColorsInputMultiSelectProps {
  label: string;
  required?: boolean;
  placeholder: string;
  error?: string;
  data?: ColorResponse[];
  onChange?: (value: string[]) => void;
}

export default function UncontrolledColorsMultiSelect({
  label,
  placeholder,
  error,
  required = false,
  data,
  onChange,
}: Readonly<ColorsInputMultiSelectProps>) {
  const [value, setValue] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleValueSelect = (val: string) => {
    const newValues = value.includes(val) ? value.filter((v: string) => v !== val) : [...value, val];
    setValue(newValues);
    onChange?.(newValues);
  };

  const handleValueRemove = (val: string) => {
    const newValues = value.filter((v: string) => v !== val);
    setValue(newValues);
    onChange?.(newValues);
  };

  const values = value.map((item: string) => (
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
          error={error}
          onClick={() => combobox.toggleDropdown()}
        >
          <Pill.Group>
            {values.length > 0 ? values : <Input.Placeholder className="text-[1rem]">{placeholder}</Input.Placeholder>}
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
}
