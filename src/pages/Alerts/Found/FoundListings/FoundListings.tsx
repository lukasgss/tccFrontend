import { Button, Tooltip } from "@mantine/core";
import { ArrowBendUpLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import WorkInProgressPage from "../../../../components/InProgress/WorkInProgressPage";

export default function FoundListings() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <main className="min-h-screen">
        <Header />

        <div className="relative mx-auto w-fit">
          <WorkInProgressPage
            title="Estamos trabalhando para você e seus pets!"
            description="Estamos preparando novas funcionalidades para ajudar você a divulgar animais encontrados. 
          Logo você poderá utilizar a plataforma para encontrar o dono do animal perdido!"
          />
          <Tooltip label="Voltar">
            <Button type="button" variant="light" onClick={handleBack} className="w-fit p-1 absolute top-3 left-3">
              <ArrowBendUpLeft size={24} />
            </Button>
          </Tooltip>
        </div>
      </main>

      <Footer />
    </>
  );
}
