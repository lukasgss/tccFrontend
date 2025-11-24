import { useState } from "react";
import CreateMissingAlertForm from "./components/CreateMissingAlertForm";
import FormStepper from "../../../../components/Common/FormStepper/FormStepper";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import MetaTags from "../../../../components/Utils/MetaTags";
import useMissingFormSteps from "./useMissingFormSteps";

export default function CreateMissingAlert() {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const steps = useMissingFormSteps();

  return (
    <>
      <main>
        <MetaTags
          title="Criação de alerta de desaparecimento | AcheMeuPet"
          description="Crie um alerta de desaparecimento e aumente as chances de encontrar seu pet com o AcheMeuPet."
          keywords="pet desaparecido, animal perdido, busca de animais, AcheMeuPet, localizar pet, alerta desaparecimento"
        />
        <Header />
        <div className="bg-white my-7 md:mx-20 py-3 mt-5 border shadow rounded-md relative">
          <div className="mt-8 w-3/4 max-w-[900px] mx-auto">
            <FormStepper
              steps={steps}
              currentStep={currentFormStep}
              changeCurrentStep={(idx: number) => setCurrentFormStep(idx)}
            />
          </div>
          <CreateMissingAlertForm currentStep={currentFormStep} changeCurrentStep={setCurrentFormStep} />
        </div>
      </main>
      <Footer />
    </>
  );
}
