import { Text, Title } from "@mantine/core";
import { ProjectorScreen } from "@phosphor-icons/react";

interface NoDataProps {
  title?: string;
  message?: string;
  className?: string;
  centerText?: boolean;
}

export default function NoData({ title, message, className, centerText = false }: Readonly<NoDataProps>) {
  const defaultMessage = "Ooh não! Nenhum item foi encontrado...";

  return (
    <div className={`flex flex-col items-center gap-y-2 justify-center w-full ${className}`}>
      {title && (
        <Title order={2} className="mb-1 text-[24px] md:text-[28px]">
          {title}
        </Title>
      )}
      <Text className={`text-base md:text-lg font-bold ${centerText ? "text-center" : ""}`}>
        {message ?? defaultMessage}
      </Text>
      <ProjectorScreen size={120} weight="duotone" />
    </div>
  );
}
