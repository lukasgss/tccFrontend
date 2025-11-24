import { Skeleton } from "@mantine/core";

export default function UserDataLoading() {
  return (
    <div className="h-[350px] px-8">
      <Skeleton height={150} width={150} circle mb="xl" className="mt-[-2rem] mx-auto" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="50%" radius="xl" />
    </div>
  );
}
