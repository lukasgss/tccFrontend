import { Button, Divider, Image, Title } from "@mantine/core";
import { Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import ContactWhatsApp from "../../../../../components/Common/Contact/ContactWhatsApp";
import OnlyWhatsAppMessagesAlert from "../../../../../components/Common/Contact/OnlyWhatsAppMessagesAlert";
import { UserDataOnlyResponse } from "../../../../../services/requests/User/types";
import { formatWhatsappPhoneNumber } from "../../../../../utils/formatters";

interface OwnerDataProps {
  owner: UserDataOnlyResponse;
  petName: string;
}

export default function OwnerData({ owner, petName }: Readonly<OwnerDataProps>) {
  return (
    <div className="relative bg-white shadow-md rounded-md mt-12">
      <div className="absolute top-[-50px] left-[calc(50%-58px)] rounded-full w-fit">
        <Link to={`/perfil/${owner.id}`}>
          <Image src={owner.image} alt="Imagem do usuário" className="w-24 rounded-full h-24" />
        </Link>
      </div>
      <div className="mt-12 py-2 px-5">
        <Title order={2} className="text-center">
          {owner.fullName}
        </Title>
        <Divider my="sm" />
        <div className="pb-3">
          <div className="flex gap-2.5 items-center mb-1.5">
            <Phone size={32} />
            <span>{owner.phoneNumber}</span>
          </div>
          {owner.onlyWhatsAppMessages && <OnlyWhatsAppMessagesAlert fullName={owner.fullName} />}
          <div className="flex flex-col gap-2.5">
            <ContactWhatsApp
              url={`https://api.whatsapp.com/send?phone=${formatWhatsappPhoneNumber(owner.phoneNumber)}&message=Olá! Gostaria de conversar sobre a adoção do ${petName}!`}
            />

            <Link to={`/perfil/${owner.id}`}>
              <Button className="w-full">Visitar perfil</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
