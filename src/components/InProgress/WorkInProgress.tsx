import { Image, Text, Title } from "@mantine/core";
import inProgressImage from "../../assets/images/in-progress.webp";
import { WorkInProgressProps } from "./types";

export default function WorkInProgress({ title, description }: Readonly<WorkInProgressProps>) {
  return (
    <div className="flex flex-col gap-5 items-center bg-white mx-auto w-fit py-8 px-12">
      <Title order={3} className="text-center">
        {title}
      </Title>
      <Image src={inProgressImage} alt="Em construção" w={125} />
      <Text className="text-lg leading-6 text-center">{description}</Text>
    </div>
  );
}
