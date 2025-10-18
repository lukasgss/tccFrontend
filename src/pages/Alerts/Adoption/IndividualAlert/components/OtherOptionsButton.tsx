import { Button, Menu } from "@mantine/core";
import { DotsThreeVertical } from "@phosphor-icons/react";

interface Item {
  leftSection: React.ReactNode;
  text: string;
  onClick: () => void;
}

interface OtherOptionsButtonProps {
  items: Item[];
  loading: boolean;
}

export default function OtherOptionsButton({ items, loading }: Readonly<OtherOptionsButtonProps>) {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button variant="subtle" className="px-0" loading={loading}>
          <DotsThreeVertical size={32} className="text-[#4d4751]" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Opções</Menu.Label>
        {items.map((item) => (
          <Menu.Item key={item.text} leftSection={item.leftSection} onClick={item.onClick}>
            {item.text}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
