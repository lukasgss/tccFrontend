import { Menu, useMantineTheme } from "@mantine/core";
import { IconBrandFacebook, IconBrandWhatsapp, IconBrandX } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

interface ShareDropdownProps {
  whatsappMessage: string;
  twitterMessage: string;
}

const { VITE_APP_BASE_URL } = import.meta.env;

export default function ShareDropdown({ whatsappMessage, twitterMessage }: Readonly<ShareDropdownProps>) {
  const theme = useMantineTheme();
  const location = useLocation();

  const alertUrl = `${VITE_APP_BASE_URL}${location.pathname}`;

  return (
    <div>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}&app_absent=1`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <Menu.Item leftSection={<IconBrandWhatsapp size={28} color={theme.colors.green[6]} />}>
          Compartilhar no WhatsApp
        </Menu.Item>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(alertUrl)}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <Menu.Item leftSection={<IconBrandFacebook size={28} color="#1877F2" />}>
          Compartilhar no Facebook
        </Menu.Item>
      </a>
      <a
        href={`http://twitter.com/share?text=${encodeURIComponent(twitterMessage)}&url=${alertUrl}&hashtags=acheMeuPet`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <Menu.Item leftSection={<IconBrandX size={28} color={theme.colors.gray[9]} />}>Compartilhar no X</Menu.Item>
      </a>
    </div>
  );
}
