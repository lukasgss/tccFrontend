export type AnimalCardType = {
  isOpen: boolean;
  icon: JSX.Element | null;
  speciesId: number | null;
  animal: "dog" | "cat" | "other" | null;
};

export type AnimalCardData = {
  type: "dog" | "cat" | "other";
  icon: JSX.Element | null;
  speciesId: number | null;
  text: string | null;
};
