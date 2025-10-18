import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormErrorMessage from "../../../../../components/Common/Errors/FormErrorMessage";
import { ApiError } from "../../../../../components/Common/Errors/types";
import ModalLocationNotFound from "../../../../../components/Common/Modals/ModalLocationNotFound";
import ModalSuccess from "../../../../../components/Common/Modals/ModalSuccess";
import { UpdateAdoptionAlert } from "../../../../../services/requests/Alerts/Adoption/adoptionAlertService";
import AdoptionDataFormStep from "../../CreateAdoptionAlert/components/AdoptionDataFormStep";
import PetDataFormStep from "../../CreateAdoptionAlert/components/PetDataFormStep";
import { alertDataSchema, AlertSchemaFormData } from "../../CreateAdoptionAlert/types";

type EditAlert = {
  alertData: AlertSchemaFormData;
  forceCreation: boolean;
};

interface AdoptionAlertFormProps {
  currentStep: number;
  changeCurrentStep: (step: number) => void;
  defaultValues: AlertSchemaFormData;
  petId: string;
}

export default function EditAdoptionAlertForm({
  currentStep,
  changeCurrentStep,
  defaultValues,
  petId,
}: Readonly<AdoptionAlertFormProps>) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedToLocateAddress, setFailedToLocateAddress] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState(false);

  const [existingAdoptionFormUrl, setExistingAdoptionFormUrl] = useState<string | undefined>(
    defaultValues?.existingAdoptionFormUrl,
  );

  const { alertId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    watch,
    trigger,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
    resetField,
    getValues,
  } = useForm<AlertSchemaFormData>({
    resolver: zodResolver(alertDataSchema),
    mode: "onChange",
    defaultValues,
  });

  if (!alertId) {
    navigate("/adocoes");
  }

  const getGenericOptionsValues = (value: string | null) => {
    const values = {
      "-1": null,
      "0": "false",
      "1": "true",
    };

    return values[value as keyof typeof values] ?? null;
  };

  const assignPetValues = (values: AlertSchemaFormData, formData: FormData) => {
    formData.append("pet.id", petId);
    formData.append("pet.name", values.name);
    formData.append("pet.gender", values.gender);
    formData.append("pet.age", values.age);
    values.images?.forEach((image) => formData.append("pet.images", image));
    formData.append("pet.breedId", values.breed);
    formData.append("pet.speciesId", values.species);
    formData.append("pet.size", values.size);
    values.existingImages?.forEach((image) => formData.append("pet.existingImages", image));
    values.colors.forEach((color) => formData.append("pet.colorIds", color));

    const isVaccinated = getGenericOptionsValues(values.isVaccinated);
    if (isVaccinated) {
      formData.append("pet.isVaccinated", isVaccinated);
    }

    const isCastrated = getGenericOptionsValues(values.isCastrated);
    if (isCastrated) {
      formData.append("pet.isCastrated", isCastrated);
    }

    const isNegativeToFivFelv = getGenericOptionsValues(values.isNegativeToFivFelv);
    if (isNegativeToFivFelv) {
      formData.append("pet.isNegativeToFivFelv", isNegativeToFivFelv);
    }

    const isNegativeToLeishmaniasis = getGenericOptionsValues(values.isNegativeToLeishmaniasis);
    if (isNegativeToLeishmaniasis) {
      formData.append("pet.isNegativeToLeishmaniasis", isNegativeToLeishmaniasis);
    }
  };

  const assignAlertValues = (values: AlertSchemaFormData, formData: FormData) => {
    formData.append("id", alertId!);
    formData.append("neighborhood", values.neighborhood);
    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("description", values.description ?? "");
    values.restrictions?.forEach((restriction) => formData.append("adoptionRestrictions", restriction));
    formData.append("adoptionForm", values.adoptionForm ?? "");

    if (!values.adoptionForm) {
      formData.append("existingAdoptionFormUrl", values.existingAdoptionFormUrl ?? "");
    }
  };

  const editAlert = async (values: AlertSchemaFormData, forceCreation: boolean) => {
    const formData = new FormData();
    assignPetValues(values, formData);
    assignAlertValues(values, formData);

    if (forceCreation) {
      formData.append("forceCreationWithNotFoundCoordinates", "true");
    }

    return UpdateAdoptionAlert(formData, alertId!);
  };

  const { mutateAsync: editAdoptionAlertAsync, isPending: isLoadingEditingAdoptionAlerts } = useMutation({
    mutationFn: ({ alertData, forceCreation }: EditAlert) => editAlert(alertData, forceCreation),
    onSuccess: () => {
      setFailedToLocateAddress(false);
      setErrorMessage(null);
    },
    onError: (err: AxiosError<ApiError>) => {
      if (err.response?.status === 404) {
        setFailedToLocateAddress(true);
      } else {
        setErrorMessage(err.response?.data.message as string);
      }
    },
  });

  const updateAlert = async (values: AlertSchemaFormData, forceCreation: boolean) => {
    const editedAlert = await editAdoptionAlertAsync({ alertData: values, forceCreation });
    if (editedAlert) {
      setConfirmedRegistration(false);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    await updateAlert(values, confirmedRegistration);
  });

  const handleSucessModalButtonClick = () => {
    navigate(`/adocoes/${alertId}`);
  };

  const onIncreaseStep = () => {
    changeCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const onDecreaseStep = () => {
    changeCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (confirmedRegistration) {
      onSubmit();
    }
  }, [confirmedRegistration]);

  return (
    <>
      <div className="mb-8">
        {errorMessage !== null ? (
          <div className="min-w-[300px] mx-auto w-fit my-6">
            <FormErrorMessage message={errorMessage} closeErrorMessage={() => setErrorMessage(null)} />
          </div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className={currentStep !== 0 ? "hidden" : ""}>
            <PetDataFormStep
              register={register}
              trigger={trigger}
              setValue={setValue}
              control={control}
              errors={errors}
              increaseStep={onIncreaseStep}
              watch={watch}
              existingFiles={defaultValues?.existingImages}
              resetField={resetField}
            />
          </div>

          <div className={currentStep !== 1 ? "hidden" : ""}>
            <AdoptionDataFormStep
              decreaseStep={onDecreaseStep}
              isLoading={isSubmitting}
              control={control}
              errors={errors}
              existingAdoptionForm={existingAdoptionFormUrl}
              existingAdoptionFormFileName={defaultValues?.existingAdoptionFormFileName}
              setExistingAdoptionForm={setExistingAdoptionFormUrl}
              register={register}
              watch={watch}
              setValue={setValue}
              alreadyMarkedRestrictions={defaultValues?.restrictions}
              isEditing
            />
          </div>
        </form>
      </div>
      <ModalSuccess
        opened={isSubmitSuccessful}
        title="Alerta editado com sucesso!"
        buttonText="Visualizar alerta"
        subtitle={
          <>
            Você poderá visualizar todos os alertas criados e seus detalhes na página de
            <strong> Listagem de alertas de adoção.</strong>
          </>
        }
        onClickButton={() => handleSucessModalButtonClick()}
        onClose={() => navigate("/adocoes")}
      />

      <ModalLocationNotFound
        opened={failedToLocateAddress}
        title="Não foi possível obter os dados da localização"
        buttonText="Editar mesmo assim"
        loading={isLoadingEditingAdoptionAlerts}
        secondaryButtonText="Voltar"
        subtitle={
          <Text className="text-center">
            Não foi possível obter o bairro &quot;{getValues("neighborhood")}&quot; no estado e cidade inseridos. Nesse
            caso, não será exibido a localização no mapa da página de visualização da adoção, gostaria de continuar
            mesmo assim?
          </Text>
        }
        onClickButton={() => setConfirmedRegistration(true)}
        onClickSecondaryButton={() => setFailedToLocateAddress(false)}
        onClose={() => setFailedToLocateAddress(false)}
      />
    </>
  );
}
