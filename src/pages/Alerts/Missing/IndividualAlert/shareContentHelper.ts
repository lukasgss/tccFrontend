export const getShareMissingAlertMessage = (petGender: string, petName: string): string => {
  const pronoun = petGender === "Macho" ? "o" : "a";
  return `Ajude a encontrar ${pronoun} ${petName}! Compartilhe este alerta para ajudar a reunir esta família.`;
};

export const getMissingAlertWhatsappMessage = (petGender: string, petName: string, alertUrl: string): string => {
  const pronoun = petGender === "Macho" ? "o" : "a";
  return `Olá! Vi este alerta sobre ${pronoun} ${petName} que está desaparecido${petGender === "Macho" ? "" : "a"}. Confira: ${alertUrl}`;
};
