import { useState } from "react";
import FormStepper from "../../../../components/Common/FormStepper/FormStepper";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import MetaTags from "../../../../components/Utils/MetaTags";
import useAdoptionFormSteps from "../../../../hooks/alerts/useAdoptionFormSteps";
import CreateAdoptionAlertForm from "./components/CreateAdoptionAlertForm";

export default function CreateAdoptionAlert() {
  const [currentFormStep, setCurrentFormStep] = useState(0);

  const steps = useAdoptionFormSteps();

  return (
    <>
      <main>
        <MetaTags
          title="Criação de alerta de adoção | AcheMeuPet"
          description="Crie um alerta de adoção e aumente as chances de encontrar o lar ideal para o animal com o AcheMeuPet."
          keywords="adoção de animais, listagem de adoções, pets para adotar, AcheMeuPet, resgate animal, animais perdidos"
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
          <CreateAdoptionAlertForm currentStep={currentFormStep} changeCurrentStep={setCurrentFormStep} />
        </div>
      </main>

      <Footer />
    </>
  );
}
