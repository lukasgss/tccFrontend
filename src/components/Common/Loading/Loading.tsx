import { Loader, Title } from "@mantine/core";

interface LoadingProps {
  title?: string;
  className?: string;
}

export default function Loading({ title, className }: Readonly<LoadingProps>) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Loader size="xl" />
      {title ? (
        <Title order={2} className="text-[20px] md:text-[22px]">
          {title}
        </Title>
      ) : null}
    </div>
  );
}
