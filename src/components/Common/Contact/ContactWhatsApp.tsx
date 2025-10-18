import { IconBrandWhatsapp } from "@tabler/icons-react";

interface ContactWhatsAppProps {
  url: string;
}

export default function ContactWhatsApp({ url }: Readonly<ContactWhatsAppProps>) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 justify-center rounded-md px-2 py-1.5 bg-[var(--whatsapp-bg-color)]
             text-white hover:bg-[var(--whatsapp-bg-color-hover)] hover:no-underline"
    >
      <IconBrandWhatsapp stroke={2} size={20} />
      <span>Entrar em contato</span>
    </a>
  );
}
