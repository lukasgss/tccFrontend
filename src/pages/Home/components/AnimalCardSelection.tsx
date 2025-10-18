import { ReactElement } from "react";
import { AnimalCardType } from "../types";

type AnimalCardSelectionProps = {
  icon: ReactElement | null;
  text: string | null;
  animalType: "dog" | "cat" | "other" | null;
  speciesId: number | null;
  setAnimalCard: React.Dispatch<React.SetStateAction<AnimalCardType>>;
};

export default function AnimalCardSelection({
  icon: Icon,
  text,
  animalType,
  speciesId,
  setAnimalCard,
}: Readonly<AnimalCardSelectionProps>) {
  return (
    <button
      type="button"
      onClick={() => setAnimalCard({ icon: Icon, animal: animalType, isOpen: true, speciesId })}
      className="bg-white border border-[#d2d1d3] px-5 py-3 rounded-md shadow hover:bg-[var(--base-bg-color)]
       hover:outline outline-[var(--primary-blue)] w-40 flex flex-col justify-center"
    >
      {Icon}
      <span className="mt-2 mx-auto">{text}</span>
    </button>
  );
}
