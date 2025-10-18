import { CheckIcon, Combobox, Group, Text } from "@mantine/core";
import { ColorResponse } from "../../../../../services/requests/Pets/types";

interface ColorOptionProps {
  item: ColorResponse;
  value: string[];
}

export default function ColorOption({ item, value }: Readonly<ColorOptionProps>) {
  const isSelected = Array.isArray(value) && value.includes(item.id.toString());

  return (
    <Combobox.Option value={item.id.toString()} key={item.id} active={isSelected}>
      <Group gap="sm">
        {isSelected ? <CheckIcon size={12} /> : null}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full border border-gray-500" style={{ backgroundColor: item.hexCode }} />
          <Text>{item.name}</Text>
        </div>
      </Group>
    </Combobox.Option>
  );
}
