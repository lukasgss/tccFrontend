import { Title } from "@mantine/core";

interface PetCharacteristicProps {
  characteristic: string;
  value?: string;
}

export default function PetCharacteristic({ characteristic, value }: Readonly<PetCharacteristicProps>) {
  return (
    <div className="my-1.5">
      <Title order={5} className="uppercase">
        {characteristic}
      </Title>
      <span>{value ?? "Não encontrado"}</span>
    </div>
  );
}
