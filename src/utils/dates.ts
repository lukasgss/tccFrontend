export function formatTextDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 1) {
    return `${years} anos atrás`;
  }
  if (years === 1) {
    return "1 ano atrás";
  }
  if (months > 1) {
    return `${months} meses atrás`;
  }
  if (months === 1) {
    return "1 mês atrás";
  }
  if (days > 1) {
    return `${days} dias atrás`;
  }
  if (days === 1) {
    return "ontem";
  }
  if (hours > 1) {
    return `${hours} horas atrás`;
  }
  if (hours === 1) {
    return "1 hora atrás";
  }
  if (minutes > 1) {
    return `${minutes} minutos atrás`;
  }
  return "agora";
}

export const formatDateOnly = (date?: string | null) => {
  const months = {
    1: "janeiro",
    2: "fevereiro",
    3: "março",
    4: "abril",
    5: "maio",
    6: "junho",
    7: "julho",
    8: "agosto",
    9: "setembro",
    10: "outubro",
    11: "novembro",
    12: "dezembro",
  };

  if (!date) {
    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = String(todaysDate.getMonth() + 1).padStart(2, "0");
    const day = String(todaysDate.getDate()).padStart(2, "0");
    const formedDate = `${year}-${month}-${day}`;

    const splitDate = formedDate.split("-");
    return `${splitDate[2]} de ${months[parseInt(splitDate[1], 10) as keyof typeof months]}`;
  }

  const splitDate = date.split("-");
  return `${splitDate[2]} de ${months[parseInt(splitDate[1], 10) as keyof typeof months]}`;
};

export const addMinutes = (date: Date, minutes: number) => {
  const amountOfMsInMinutes = 60000;
  return new Date(date.getTime() + minutes * amountOfMsInMinutes);
};

export const formatToHoursAndMinutes = (dateStr: string) => {
  const dateObj = new Date(dateStr);

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatISODate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long" }).format(date);
};
