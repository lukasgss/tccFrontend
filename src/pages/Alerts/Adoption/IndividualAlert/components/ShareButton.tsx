import { ActionIcon, Button, Menu, Tooltip } from "@mantine/core";
import { ShareNetwork } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import ShareDropdown from "../../../../../components/Common/Share/ShareDropdown";
import { Gender } from "../../../../../services/requests/Pets/types";
import { getAdoptionAlertWhatsappMessage, getShareAdoptionAlertMessage } from "../../../../../utils/shareContent";

interface ShareButtonProps {
  petName: string;
  petGender: Gender;
}

const { VITE_APP_BASE_URL } = import.meta.env;

export default function ShareButton({ petName, petGender }: Readonly<ShareButtonProps>) {
  const location = useLocation();

  const alertUrl = `${VITE_APP_BASE_URL}${location.pathname}`;

  const handleShareMobile = () => {
    navigator.share({
      title: "Conferir adoção",
      text: getShareAdoptionAlertMessage(petGender.name, petName),
      url: alertUrl,
    });
  };

  if (!navigator.share) {
    return (
      <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
        <Menu.Target>
          <Tooltip label="Compartilhar" className="w-fit">
            <Button variant="subtle" className="p-0.5">
              <ShareNetwork size={30} className="text-[#4d4751]" />
            </Button>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown className="shadow">
          <ShareDropdown
            whatsappMessage={getAdoptionAlertWhatsappMessage(petGender.name, petName, alertUrl)}
            twitterMessage={getShareAdoptionAlertMessage(petGender.name, petName)}
          />
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Tooltip label="Compartilhar" className="w-fit">
      <ActionIcon variant="subtle" onClick={() => handleShareMobile()}>
        <ShareNetwork size={30} className="text-[#4d4751]" />
      </ActionIcon>
    </Tooltip>
  );
}
