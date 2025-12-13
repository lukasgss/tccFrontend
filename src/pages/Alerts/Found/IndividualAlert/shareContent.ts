/* eslint-disable no-nested-ternary */
export function getFoundAnimalAlertWhatsappMessage(gender: string | null, name: string, alertUrl: string): string {
  const genderLower = gender?.toLowerCase() || "";
  const article = genderLower === "macho" ? "um" : genderLower === "fêmea" ? "uma" : "um";
  const pronoun = genderLower === "macho" ? "ele" : genderLower === "fêmea" ? "ela" : "este animal";
  const genderText = gender ? genderLower : "animal";

  const animalDescription =
    name && name !== "Animal sem nome"
      ? `${article} ${genderText} chamado ${name}`
      : `${article} ${genderText}`;

  return `Olá! Encontrei ${animalDescription}. Se ${pronoun} for seu, ou se você conhece o dono, entre em contato! Veja mais detalhes: ${alertUrl}`;
}

export function getShareFoundAnimalAlertMessage(gender: string | null, name: string): string {
  const genderLower = gender?.toLowerCase() || "";
  const article = genderLower === "macho" ? "um" : genderLower === "fêmea" ? "uma" : "um";
  const genderText = gender ? genderLower : "animal";

  const animalDescription =
    name && name !== "Animal sem nome"
      ? `${article} ${genderText} chamado ${name}`
      : `${article} ${genderText}`;

  return `Encontrei ${animalDescription}! Se for seu pet ou você conhece o dono, entre em contato. #AcheMeuPet #AnimalEncontrado #PetPerdido`;
}
