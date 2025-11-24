import { useMemo } from "react";

export default function useFoundAnimalFormSteps() {
  const steps = useMemo(
    () => [
      {
        label: "Dados do animal",
        description: "Informações sobre o animal encontrado",
      },
      {
        label: "Localização",
        description: "Onde o animal foi encontrado",
      },
    ],
    [],
  );

  return steps;
}
