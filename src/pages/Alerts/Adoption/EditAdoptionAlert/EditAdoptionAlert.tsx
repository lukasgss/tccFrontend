import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConversationsSidebar from "../../../../components/Chat/components/ConversationSidebar";
import FormStepper from "../../../../components/Common/FormStepper/FormStepper";
import Loading from "../../../../components/Common/Loading/Loading";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import MetaTags from "../../../../components/Utils/MetaTags";
import useAdoptionFormSteps from "../../../../hooks/alerts/useAdoptionFormSteps";
import useAdoptionAlertByIdQuery from "../../../../queries/useAdoptionAlertByIdQuery";
import { AlertSchemaFormData } from "../CreateAdoptionAlert/types";
import EditAdoptionAlertForm from "./components/EditAdoptionAlertForm";

export default function EditAdoptionAlert() {
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [formDefaultValues, setFormDefaultValues] = useState<AlertSchemaFormData | null>(null);

  const steps = useAdoptionFormSteps();

  const { alertId } = useParams();

  const { data: adoptionAlert, isLoading } = useAdoptionAlertByIdQuery(alertId!);

  const getGeneralInfoValues = (generalInfo: boolean | undefined) => {
    if (generalInfo === null) {
      return "-1";
    }

    return generalInfo ? "1" : "0";
  };

  const fillFormDefaultValues = () => {
    const defaultValues: AlertSchemaFormData = {
      images: [],
      existingImages: adoptionAlert?.pet.images,
      name: adoptionAlert?.pet.name ?? "",
      gender: adoptionAlert?.pet.gender.id.toString() ?? "",
      age: adoptionAlert?.pet.age.id.toString() ?? "",
      colors:
        (adoptionAlert?.pet.colors.map((color) => color.id.toString()) as [string, ...string[]]) ??
        ([""] as [string, ...string[]]),
      breed: adoptionAlert?.pet.breed.id.toString() ?? "",
      species: adoptionAlert?.pet.species.id.toString() ?? "",
      isCastrated: getGeneralInfoValues(adoptionAlert?.pet.isCastrated),
      isVaccinated: getGeneralInfoValues(adoptionAlert?.pet.isVaccinated),
      isNegativeToFivFelv:
        adoptionAlert?.pet.species.name === "Cachorro"
          ? null
          : getGeneralInfoValues(adoptionAlert?.pet.isNegativeToFivFelv),
      isNegativeToLeishmaniasis:
        adoptionAlert?.pet.species.name === "Gato"
          ? null
          : getGeneralInfoValues(adoptionAlert?.pet.isNegativeToLeishmaniasis),
      size: adoptionAlert?.pet.size.id.toString() ?? "",
      description: adoptionAlert?.description ?? "",
      state: adoptionAlert?.stateId.toString() ?? "",
      neighborhood: adoptionAlert?.neighborhood ?? "",
      city: adoptionAlert?.cityId.toString() ?? "",
      restrictions: adoptionAlert?.adoptionRestrictions,
      existingAdoptionFormUrl: adoptionAlert?.adoptionForm?.fileUrl,
      existingAdoptionFormFileName: adoptionAlert?.adoptionForm?.fileName,
    };
    setFormDefaultValues(defaultValues);
  };

  useEffect(() => {
    if (adoptionAlert) {
      fillFormDefaultValues();
    }
  }, [adoptionAlert]);

  return (
    <>
      <main className="relative">
        <MetaTags
          title="Edição de alerta de adoção | AcheMeuPet"
          description="Atualize as informações do seu alerta de adoção e aumente as chances de encontrar o lar ideal para o animal com o AcheMeuPet."
          keywords="adopção animal, adoção de animais, listagem de adoções, pets para adotar, AcheMeuPet, resgate animal, animais perdidos"
        />

        <Header />
        <div className="mx-7 bg-white md:mx-20 pt-3 mt-5 rounded-md relative">
          <div className="mt-8 w-3/4 max-w-[900px] mx-auto">
            <FormStepper
              steps={steps}
              currentStep={currentFormStep}
              changeCurrentStep={(idx: number) => setCurrentFormStep(idx)}
            />
          </div>
          {!isLoading && formDefaultValues && adoptionAlert ? (
            <EditAdoptionAlertForm
              defaultValues={formDefaultValues}
              currentStep={currentFormStep}
              changeCurrentStep={setCurrentFormStep}
              petId={adoptionAlert?.pet.id}
            />
          ) : (
            <div className="flex justify-center items-center min-h-[300px] mb-8">
              <Loading title="Carregando..." />
            </div>
          )}
        </div>

        <ConversationsSidebar />
      </main>

      <Footer />
    </>
  );
}
