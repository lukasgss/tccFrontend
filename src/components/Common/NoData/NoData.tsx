import { Text, Title } from "@mantine/core";
import { ProjectorScreen } from "@phosphor-icons/react";

interface NoDataProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function NoData({ title, message, className }: Readonly<NoDataProps>) {
  const defaultMessage = "Ooh não! Nenhum item foi encontrado...";

  return (
    <div className={`flex flex-col items-center gap-y-2 justify-center w-full ${className}`}>
      {title && (
        <Title order={2} className="mb-1 text-[24px] md:text-[28px]">
          {title}
        </Title>
      )}
      <Text className="text-base md:text-lg font-bold">{message ?? defaultMessage}</Text>
      <ProjectorScreen size={120} weight="duotone" />
    </div>
  );
}
