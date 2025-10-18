import { Text } from "@mantine/core";
import { SmileyMeh } from "@phosphor-icons/react";

interface DefaultErrorProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

export default function DefaultError({ size = "md", className }: Readonly<DefaultErrorProps>) {
  const sizes = {
    sm: 20,
    md: 32,
    lg: 48,
    xl: 56,
    "2xl": 70,
    "3xl": 90,
  } as const;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <SmileyMeh size={sizes[size]} weight="duotone" />
      <Text className="mt-2 font-bold text-center">Não foi possível obter os dados, tente novamente mais tarde.</Text>
    </div>
  );
}
