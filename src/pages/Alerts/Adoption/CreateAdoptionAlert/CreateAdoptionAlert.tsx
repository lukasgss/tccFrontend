import { useState } from "react";
import FormStepper from "../../../../components/Common/FormStepper/FormStepper";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import useAdoptionFormSteps from "../../../../hooks/alerts/useAdoptionFormSteps";
import CreateAdoptionAlertForm from "./components/CreateAdoptionAlertForm";

export default function CreateAdoptionAlert() {
  const [currentFormStep, setCurrentFormStep] = useState(0);

  const steps = useAdoptionFormSteps();

  return (
    <>
      <main>
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
