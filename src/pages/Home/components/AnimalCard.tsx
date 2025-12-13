import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, ComboboxItem, Title } from "@mantine/core";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import InputSelect from "../../../components/Common/Inputs/InputSelect";
import InputText from "../../../components/Common/Inputs/InputText";
import WorkInProgress from "../../../components/InProgress/WorkInProgress";
import { requiredFormFieldErrorMessage } from "../../../constants/applicationConstants";
import { AnimalCardType } from "../types";

interface NavigationData {
  city: string;
  speciesId: number | null;
}

interface AnimalCardProps {
  animalCard: AnimalCardType;
  setAnimalCard: React.Dispatch<React.SetStateAction<AnimalCardType>>;
}

const searchAlertSchema = z.object({
  alertType: z.enum(["adoption", "missing", "found"], {
    message: requiredFormFieldErrorMessage,
  }),
  city: z.string({ message: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
});

type SearchAlertForm = z.infer<typeof searchAlertSchema>;

export default function AnimalCard({ animalCard, setAnimalCard }: Readonly<AnimalCardProps>) {
  const navigate = useNavigate();

  const alertTypesData: ComboboxItem[] = [
    {
      label: "Animais para adoção",
      value: "adoption",
    },
    {
      label: "Animais perdidos",
      value: "missing",
    },
    {
      label: "Animais encontrados",
      value: "found",
    },
  ] as const;

  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<SearchAlertForm>({
    defaultValues: {
      alertType: alertTypesData[0].value as "adoption" | "missing" | "found",
    },
    resolver: zodResolver(searchAlertSchema),
  });

  const generateNavigationUrl = (navigationData: NavigationData) => {
    const alertType = getValues("alertType");
    if (alertType === "adoption") {
      return `/adocoes?city=${navigationData.city}&speciesId=${navigationData.speciesId}`;
    }
    if (alertType === "found") {
      return `/encontrados?city=${navigationData.city}&speciesId=${navigationData.speciesId}`;
    }

    return `/perdidos?city=${navigationData.city}&speciesId=${navigationData.speciesId}`;
  };

  const onSubmit = handleSubmit(() => {
    const navigationUrl = generateNavigationUrl({
      speciesId: animalCard.speciesId,
      city: getValues("city"),
    });
    navigate(navigationUrl);
  });

  return (
    <div className="w-full relative bg-white shadow rounded max-w-[700px] mx-auto pt-10 mt-[-35px] pb-4">
      <ActionIcon
        aria-label="Voltar à seleção"
        size="lg"
        variant="filled"
        className="absolute top-6 left-5"
        onClick={() => setAnimalCard({ isOpen: false, animal: null, icon: null, speciesId: null })}
      >
        <IconChevronLeft className="top-5 left-3 w-6 h-6" />
      </ActionIcon>

      <ActionIcon
        variant="transparent"
        aria-label="Voltar à seleção"
        size="lg"
        className="absolute top-6 right-5 text-[var(--primary-text-color)] hover:text-[var(--mantine-color-red-6)]"
        onClick={() => setAnimalCard({ isOpen: false, animal: null, icon: null, speciesId: null })}
      >
        <IconX className="top-5 right-3 w-6 h-6" />
      </ActionIcon>

      {animalCard.animal === "other" ? (
        <WorkInProgress
          title="Estamos trabalhando para você e seus pets!"
          description="Estamos preparando novas funcionalidades para suportar a divulgação de outras espécies de animais.
          Logo você poderá utilizar a plataforma para encontrar seu melhor amigo, independente da espécie!"
        />
      ) : (
        <>
          <div>{animalCard.icon}</div>
          <Title className="text-3xl text-center mt-6">Onde gostaria de buscar?</Title>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-5 px-8 mt-8">
              <InputSelect
                name="alertType"
                control={control}
                error={errors.alertType}
                required={false}
                clearable={false}
                label="Tipo de alerta"
                placeholder="Escolha uma opção..."
                size="lg"
                data={alertTypesData}
              />
              <InputText
                name="city"
                register={register}
                error={errors.city}
                label="Cidade"
                placeholder="Belo Horizonte"
                size="lg"
              />
            </div>
            <div className="w-full max-w-52 mt-5 mx-auto">
              <Button fullWidth variant="filled" type="submit" size="md" radius="xl" className="tracking-wider mt-6">
                Buscar
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
