import { Button, Title } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";

interface ConsideringAdoptionProps {
  alertId: string;
  petName: string;
  ownerPhoneNumber: string;
}

export default function ConsideringAdoption({ alertId, petName }: Readonly<ConsideringAdoptionProps>) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChatWithOwner = () => {
    if (isAuthenticated) {
      // TODO: chat
    } else {
      navigate("/login");
    }
  };

  const handleLearnToAdoptThroughPlatform = () => {
    navigate("/adocoes/como-adotar", { state: { fromAlertId: alertId } });
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md">
        <div className="p-6">
          <Title order={2}>Considerando a adoção de {petName}?</Title>
          <Button variant="filled" className="rounded-full w-full mt-5 mb-3 h-12" onClick={handleChatWithOwner}>
            Entrar em contato com o dono
          </Button>
          <Button variant="outline" className="rounded-full w-full h-12" onClick={handleLearnToAdoptThroughPlatform}>
            Aprenda a adotar pela plataforma
          </Button>
        </div>
      </div>
    </>
  );
}
