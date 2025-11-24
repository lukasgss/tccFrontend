import { Skeleton } from "@mantine/core";

export default function LoadingChat() {
  return (
    <div className="px-4 mt-14 md:mt-0">
      <div>
        <Skeleton height={50} circle mb="sm" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>

      <div className="flex flex-col items-end my-5">
        <Skeleton height={50} circle mb="sm" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} width="30%" radius="xl" />
      </div>

      <div>
        <Skeleton height={50} circle mb="sm" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>
    </div>
  );
}
