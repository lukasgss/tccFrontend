import { Gender } from "../services/requests/Pets/types";

export const getShareAdoptionAlertMessage = (gender: Gender["name"], name: string) => {
  return `Olá! Dê uma olhada na adoção ${gender === "Macho" ? "do" : "da"} ${name}, acho que você vai gostar!\n`;
};

export const getAdoptionAlertWhatsappMessage = (gender: Gender["name"], name: string, alertUrl: string) => {
  return `${getShareAdoptionAlertMessage(gender, name)} ${alertUrl}`;
};
