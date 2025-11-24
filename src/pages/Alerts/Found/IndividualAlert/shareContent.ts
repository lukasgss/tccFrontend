/* eslint-disable no-nested-ternary */
export function getFoundAnimalAlertWhatsappMessage(gender: string, name: string, alertUrl: string): string {
  const article = gender.toLowerCase() === "macho" ? "um" : gender.toLowerCase() === "fêmea" ? "uma" : "um";
  const pronoun = gender.toLowerCase() === "macho" ? "ele" : gender.toLowerCase() === "fêmea" ? "ela" : "este animal";

  const animalDescription =
    name && name !== "Animal sem nome"
      ? `${article} ${gender.toLowerCase()} chamado ${name}`
      : `${article} ${gender.toLowerCase()}`;

  return `Olá! Encontrei ${animalDescription}. Se ${pronoun} for seu, ou se você conhece o dono, entre em contato! Veja mais detalhes: ${alertUrl}`;
}

export function getShareFoundAnimalAlertMessage(gender: string, name: string): string {
  const article = gender.toLowerCase() === "macho" ? "um" : gender.toLowerCase() === "fêmea" ? "uma" : "um";

  const animalDescription =
    name && name !== "Animal sem nome"
      ? `${article} ${gender.toLowerCase()} chamado ${name}`
      : `${article} ${gender.toLowerCase()}`;

  return `Encontrei ${animalDescription}! Se for seu pet ou você conhece o dono, entre em contato. #AcheMeuPet #AnimalEncontrado #PetPerdido`;
}
