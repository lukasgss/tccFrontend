import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ConversationsSidebar from "../../../../../components/Chat/components/ConversationSidebar";
import FormErrorMessage from "../../../../../components/Common/Errors/FormErrorMessage";
import { ApiError } from "../../../../../components/Common/Errors/types";
import ModalSuccess from "../../../../../components/Common/Modals/ModalSuccess";
import { FoundAnimalAlertSchemaFormData, foundAnimalAlertSchema } from "../types";
import { CreateFoundAnimalAlert } from "../../../../../services/requests/Alerts/Found/foundAlertsService";
import AnimalDataFormStep from "./AnimalDataFormStep";
import LocationDataFormStep from "./LocationDataFormStep";

type CreateAlert = {
  alertData: FoundAnimalAlertSchemaFormData;
};

interface FoundAnimalAlertFormProps {
  currentStep: number;
  changeCurrentStep: (step: number) => void;
}

export default function CreateFoundAnimalAlertForm({
  currentStep,
  changeCurrentStep,
}: Readonly<FoundAnimalAlertFormProps>) {
  const [createdAlertId, setCreatedAlertId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  } = useForm<FoundAnimalAlertSchemaFormData>({
    resolver: zodResolver(foundAnimalAlertSchema),
    mode: "onChange",
  });

  const assignFormValues = (values: FoundAnimalAlertSchemaFormData, formData: FormData) => {
    if (values.name) {
      formData.append("name", values.name);
    }
    formData.append("description", values.description ?? "");

    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("neighborhood", values.neighborhood);

    formData.append("age", values.age);
    formData.append("size", values.size);
    formData.append("speciesId", values.species);

    if (values.breed) {
      formData.append("breedId", values.breed);
    }

    if (values.gender) {
      formData.append("gender", values.gender);
    }

    values.colors.forEach((color) => formData.append("colorIds", color));
    values.images?.forEach((image) => formData.append("images", image));
  };

  const createAlert = async (values: FoundAnimalAlertSchemaFormData) => {
    const formData = new FormData();
    assignFormValues(values, formData);

    const alertResponse = await CreateFoundAnimalAlert(formData);

    return alertResponse;
  };

  const { mutateAsync: createFoundAnimalAlertAsync } = useMutation({
    mutationFn: ({ alertData }: CreateAlert) => createAlert(alertData),
    onSuccess: () => {
      setErrorMessage(null);
    },
    onError: (err: AxiosError<ApiError>) => {
      setErrorMessage(err.response?.data.message as string);
    },
  });

  const registerAlert = async (values: FoundAnimalAlertSchemaFormData) => {
    const createdAlert = await createFoundAnimalAlertAsync({ alertData: values });
    if (createdAlert) {
      setCreatedAlertId(createdAlert.id);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    await registerAlert(values);
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
      navigate(`/encontrados/${createdAlertId}`);
    } else {
      navigate("/encontrados");
    }
  };

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
            <AnimalDataFormStep
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
            <LocationDataFormStep
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
            Você poderá visualizar todos os alertas criados na página de
            <strong> Listagem de animais encontrados.</strong>
          </>
        }
        onClickButton={() => handleSuccessModalButtonClick()}
        onClose={() => navigate("/encontrados")}
      />

      <ConversationsSidebar />
    </section>
  );
}
