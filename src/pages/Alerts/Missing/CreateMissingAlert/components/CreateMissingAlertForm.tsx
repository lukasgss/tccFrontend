import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MissingDataFormStep from "./MissingDataFormStep";
import ConversationsSidebar from "../../../../../components/Chat/components/ConversationSidebar";
import FormErrorMessage from "../../../../../components/Common/Errors/FormErrorMessage";
import { ApiError } from "../../../../../components/Common/Errors/types";
import ModalLocationNotFound from "../../../../../components/Common/Modals/ModalLocationNotFound";
import ModalSuccess from "../../../../../components/Common/Modals/ModalSuccess";
import PetDataFormStep from "./PetDataFormStep";
import { CreateMissingAlert } from "../../../../../services/requests/Alerts/Missing/missingAlertsService";
import { MissingAlertSchemaFormData, missingAlertDataSchema } from "../types";

type CreateAlert = {
  alertData: MissingAlertSchemaFormData;
  forceCreation: boolean;
};

interface MissingAlertFormProps {
  currentStep: number;
  changeCurrentStep: (step: number) => void;
}

export default function CreateMissingAlertForm({ currentStep, changeCurrentStep }: Readonly<MissingAlertFormProps>) {
  const [createdAlertId, setCreatedAlertId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedToLocateAddress, setFailedToLocateAddress] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    register,
    watch,
    trigger,
    setValue,
    resetField,
    handleSubmit,
    getValues,
  } = useForm<MissingAlertSchemaFormData>({
    resolver: zodResolver(missingAlertDataSchema),
    mode: "onChange",
  });

  const getGenericOptionsValues = (value: string | null) => {
    const values = {
      "-1": null,
      "0": "false",
      "1": "true",
    };

    return values[value as keyof typeof values] ?? null;
  };

  const assignPetValues = (values: MissingAlertSchemaFormData, formData: FormData) => {
    formData.append("pet.name", values.name);
    formData.append("pet.gender", values.gender);
    formData.append("pet.age", values.age);
    values.images?.forEach((image) => formData.append("pet.images", image));
    formData.append("pet.breedId", values.breed);
    formData.append("pet.speciesId", values.species);
    formData.append("pet.size", values.size);
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

  const assignMissingAlertValues = (values: MissingAlertSchemaFormData, formData: FormData) => {
    formData.append("neighborhood", values.neighborhood);
    formData.append("state", values.state);
    formData.append("city", values.city);

    formData.append("description", values.missingDescription || "");
  };

  const createAlert = async (values: MissingAlertSchemaFormData, forceCreation: boolean) => {
    const formData = new FormData();
    assignPetValues(values, formData);
    assignMissingAlertValues(values, formData);

    if (forceCreation) {
      formData.append("forceCreationWithNotFoundCoordinates", "true");
    }

    const alertResponse = await CreateMissingAlert(formData);
    if (alertResponse.status.toString().startsWith("2")) {
      return alertResponse.data;
    }

    return null;
  };

  const { mutateAsync: createMissingAlertAsync, isPending: isLoadingMissingAlerts } = useMutation({
    mutationFn: ({ alertData, forceCreation }: CreateAlert) => createAlert(alertData, forceCreation),
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

  const registerAlert = async (values: MissingAlertSchemaFormData, forceCreation: boolean) => {
    const createdAlert = await createMissingAlertAsync({ alertData: values, forceCreation });
    if (createdAlert) {
      setCreatedAlertId(createdAlert.id);
      setConfirmedRegistration(false);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    await registerAlert(values, confirmedRegistration);
  });

  const onIncreaseStep = () => {
    changeCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const onDecreaseStep = () => {
    changeCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSuccessModalButtonClick = () => {
    if (createdAlertId) {
      navigate(`/perdidos/${createdAlertId}`);
    } else {
      navigate("/perdidos");
    }
  };

  useEffect(() => {
    if (confirmedRegistration) {
      onSubmit();
    }
  }, [confirmedRegistration]);

  return (
    <section className="relative">
      <div>
        {errorMessage !== null ? (
          <div className="min-w-[300px] mx-auto w-fit my-6">
            <FormErrorMessage message={errorMessage} closeErrorMessage={() => setErrorMessage(null)} />
          </div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className={currentStep !== 0 ? "hidden" : ""}>
            <PetDataFormStep
              resetField={resetField}
              register={register}
              trigger={trigger}
              setValue={setValue}
              control={control}
              errors={errors}
              increaseStep={onIncreaseStep}
              watch={watch}
            />
          </div>

          <div className={currentStep !== 1 ? "hidden" : ""}>
            <MissingDataFormStep
              decreaseStep={onDecreaseStep}
              isLoading={isSubmitting}
              control={control}
              errors={errors}
              register={register}
              watch={watch}
              setValue={setValue}
            />
          </div>
        </form>
      </div>
      <ModalSuccess
        opened={isSubmitSuccessful}
        title="Alerta criado com sucesso!"
        buttonText="Visualizar alerta criado"
        subtitle={
          <>
            Você poderá visualizar todos os alertas criados e seus detalhes na página de
            <strong> Listagem de alertas de desaparecimento.</strong>
          </>
        }
        onClickButton={() => handleSuccessModalButtonClick()}
        onClose={() => navigate("/desaparecidos")}
      />

      <ModalLocationNotFound
        opened={failedToLocateAddress}
        title="Não foi possível obter os dados da localização"
        buttonText="Cadastrar mesmo assim"
        loading={isLoadingMissingAlerts}
        secondaryButtonText="Voltar"
        subtitle={
          <Text className="text-center">
            Não foi possível obter o bairro &quot;{getValues("neighborhood")}&quot; no estado e cidade inseridos. Nesse
            caso, não será exibido a localização no mapa da página de visualização do desaparecimento, gostaria de
            continuar mesmo assim?
          </Text>
        }
        onClickButton={() => setConfirmedRegistration(true)}
        onClickSecondaryButton={() => setFailedToLocateAddress(false)}
        onClose={() => setFailedToLocateAddress(false)}
      />

      <ConversationsSidebar />
    </section>
  );
}
