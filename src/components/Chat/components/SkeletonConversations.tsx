import { Skeleton } from "@mantine/core";

export default function SkeletonConversations() {
  const generateLength = () => {
    const min = 50;
    const max = 70;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="mt-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="flex items-center gap-5 mb-3.5" key={idx}>
          <Skeleton height={50} circle />
          <Skeleton height={8} mt={6} width={`${generateLength()}%`} radius="xl" />
        </div>
      ))}
    </div>
  );
}
