import { Title, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CreateAlertButton from "./CreateAlertButton";

export default function ListingHeading() {
  const isDesktop = useMediaQuery(`(min-width: ${em(767)})`);

  return (
    <div
      className="flex flex-col gap-y-5 items-center min-[767px]:flex-row 
    min-[767px]:items-start min-[767px]:justify-between px-8 mt-5"
    >
      <Title order={3}>Listagem de adoções</Title>

      {isDesktop && <CreateAlertButton />}
    </div>
  );
}
