import { Image, Text, Title } from "@mantine/core";
import inProgressImage from "../../assets/images/in-progress.webp";
import { WorkInProgressProps } from "./types";

export default function WorkInProgressPage({ title, description }: Readonly<WorkInProgressProps>) {
  return (
    <div className="flex flex-col gap-5 max-w-[100%] lg:max-w-[600px] items-center bg-white mt-12 mx-auto w-fit py-8 px-12 rounded shadow">
      <Title order={3} className="text-center mt-6 md:mt-0">
        {title}
      </Title>
      <Image src={inProgressImage} alt="Em construção" w={250} />
      <Text className="text-lg leading-6 text-center">{description}</Text>
    </div>
  );
}
