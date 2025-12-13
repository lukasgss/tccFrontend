import { AlertTypes } from "../pages/Home/components/AlertCard";

export const getShareAlertMessage = (
  type: AlertTypes,
  gender: string | undefined | null,
  name: string | undefined | null,
) => {
  const article = gender === "Macho" ? "do" : gender === "Fêmea" ? "da" : "de";

  if (type === "adoption") {
    if (!name) {
      return `Olá! Dê uma olhada nesta adoção, acho que você vai gostar!\n`;
    }
    return `Olá! Dê uma olhada na adoção ${article} ${name}, acho que você vai gostar!\n`;
  }

  if (type === "found") {
    if (!name) {
      return `Olá! Encontrei este animal e estou tentando localizar o dono. Você conhece?\n`;
    }
    return `Olá! Encontrei ${article === "de" ? "um animal chamado" : article === "do" ? "o" : "a"} ${name} e estou tentando localizar o dono. Você conhece?\n`;
  }

  if (type === "missing") {
    if (!name) {
      return `Olá! Estou procurando meu animal que está desaparecido. Você viu?\n`;
    }
    return `Olá! Estou procurando ${article === "de" ? "" : article === "do" ? "o " : "a "}${name} que está desaparecido${gender === "Fêmea" ? "a" : ""}. Você viu?\n`;
  }

  return `Olá! Dê uma olhada neste alerta!\n`;
};

export const getAlertWhatsappMessage = (
  type: AlertTypes,
  gender: string | null | undefined,
  name: string | null | undefined,
  alertUrl: string,
) => {
  return `${getShareAlertMessage(type, gender, name)} ${alertUrl}`;
};
