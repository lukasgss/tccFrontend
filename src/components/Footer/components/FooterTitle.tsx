import { Text } from "@mantine/core";

interface FooterTitleProps {
  title: string;
}

export default function FooterTitle({ title }: Readonly<FooterTitleProps>) {
  return (
    <Text c="white" className="font-bold tracking-wide">
      {title}
    </Text>
  );
}
