import { useState } from "react";
import FormStepper from "../../../../components/Common/FormStepper/FormStepper";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import MetaTags from "../../../../components/Utils/MetaTags";
import CreateFoundAnimalAlertForm from "./components/CreateFoundAnimalAlertForm";
import useFoundAnimalFormSteps from "./components/useFoundAnimalFormSteps";

export default function CreateFoundAnimalAlert() {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const steps = useFoundAnimalFormSteps();

  return (
    <>
      <main>
        <MetaTags
          title="Criar alerta de animal encontrado | AcheMeuPet"
          description="Encontrou um animal perdido? Crie um alerta e ajude a reunir o pet com seu dono."
          keywords="animal encontrado, pet perdido, resgate animal, AcheMeuPet, encontrei um cachorro"
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
          <CreateFoundAnimalAlertForm currentStep={currentFormStep} changeCurrentStep={setCurrentFormStep} />
        </div>
      </main>
      <Footer />
    </>
  );
}
