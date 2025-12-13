export const getShareMissingAlertMessage = (petGender: string | null, petName: string): string => {
  const pronoun = petGender === "Macho" ? "o" : petGender === "Fêmea" ? "a" : "";
  const article = pronoun ? `${pronoun} ` : "";
  return `Ajude a encontrar ${article}${petName}! Compartilhe este alerta para ajudar a reunir esta família.`;
};

export const getMissingAlertWhatsappMessage = (petGender: string | null, petName: string, alertUrl: string): string => {
  const pronoun = petGender === "Macho" ? "o" : petGender === "Fêmea" ? "a" : "";
  const article = pronoun ? `${pronoun} ` : "";
  const missingGenderSuffix = petGender === "Macho" ? "" : petGender === "Fêmea" ? "a" : "";
  return `Olá! Vi este alerta sobre ${article}${petName} que está desaparecido${missingGenderSuffix}. Confira: ${alertUrl}`;
};
