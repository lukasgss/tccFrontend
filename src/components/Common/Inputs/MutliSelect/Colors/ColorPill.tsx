import { Pill, Text } from "@mantine/core";
import { ColorResponse } from "../../../../../services/requests/Pets/types";

interface ColorPillProps {
  data: ColorResponse[] | undefined;
  value: string;
  onRemove: () => void;
}

export default function ColorPill({ data, value, onRemove }: Readonly<ColorPillProps>) {
  const color = data?.find((x) => x.id.toString() === value);
  if (!color) {
    return null;
  }

  return (
    <Pill withRemoveButton onRemove={onRemove}>
      <div className="flex gap-2">
        <div
          className="h-4 mt-[3px] w-4 rounded-full border border-gray-500"
          style={{ backgroundColor: color.hexCode }}
        />
        <Text>{color.name}</Text>
      </div>
    </Pill>
  );
}
