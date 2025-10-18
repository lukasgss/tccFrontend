import { Text, Image, Title } from "@mantine/core";

import sadAnimals from "../../../assets/images/sadAnimals.webp";

interface ListCardsFallbackProps {
  title?: string;
  message: string;
  subMessage?: string;
}

export default function ListCardsFallback({ title, message, subMessage }: ListCardsFallbackProps) {
  return (
    <div className="bg-white rounded-md border-2 border-gray-300 px-6 py-5">
      {title && (
        <Title order={2} className="text-center">
          {title}
        </Title>
      )}
      <Image src={sadAnimals} alt="Cachorro e gato tristes" />
      <Title order={2} className="text-center" fw="bolder">
        {message}
      </Title>
      {subMessage && <Text className="text-gray-600 mt-2 px-6 text-center">{subMessage}</Text>}
    </div>
  );
}
