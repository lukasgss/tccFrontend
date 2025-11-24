import { Button, Title, Text } from "@mantine/core";
import { useEffect } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import InputSelect from "../../../../../components/Common/Inputs/InputSelect";
import InputText from "../../../../../components/Common/Inputs/InputText";
import useAllStatesQuery from "../../../../../queries/useAllStatesQuery";
import useCitiesFromStateQuery from "../../../../../queries/useCitiesFromStateQuery";
import { FoundAnimalAlertSchemaFormData } from "../types";

export interface LocationDataFormStepProps {
  control: Control<FoundAnimalAlertSchemaFormData>;
  errors: FieldErrors<FoundAnimalAlertSchemaFormData>;
  isLoading: boolean;
  isEditing?: boolean;
  decreaseStep: () => void;
  register: UseFormRegister<FoundAnimalAlertSchemaFormData>;
  watch: UseFormWatch<FoundAnimalAlertSchemaFormData>;
  setValue: UseFormSetValue<FoundAnimalAlertSchemaFormData>;
}

export default function LocationDataFormStep({
  control,
  errors,
  isLoading,
  isEditing = false,
  decreaseStep,
  register,
  watch,
  setValue,
}: Readonly<LocationDataFormStepProps>) {
  const { data: states } = useAllStatesQuery();

  const state: string | null = watch("state");
  const { data: cities } = useCitiesFromStateQuery(state);

  let shouldShowCityInput = false;
  if (state || isEditing) {
    shouldShowCityInput = true;
  }

  useEffect(() => {
    if (!isEditing) {
      setValue("city", "");
    }
  }, [state, setValue, isEditing]);

  return (
    <section className="mt-8 w-[85%] max-w-[700px] flex mx-auto justify-center">
      <div className="flex-1">
        <Title order={2} className="text-center mb-4">
          Localização onde o animal foi encontrado
        </Title>

        <Text size="sm" c="dimmed" className="text-center mb-6">
          Informe o local onde você encontrou o animal para ajudar o dono a localizá-lo.
        </Text>

        <div className="flex flex-col gap-3 mt-7 mb-4">
          <InputSelect
            control={control}
            name="state"
            label="Estado"
            error={errors.state}
            searchable
            placeholder="Minas Gerais"
            clearable={false}
            data={states}
            required
          />

          {shouldShowCityInput && (
            <InputSelect
              key={state}
              control={control}
              name="city"
              label="Cidade"
              searchable
              error={errors.city}
              placeholder="Belo Horizonte"
              clearable={false}
              data={cities}
              required
            />
          )}

          <InputText
            register={register}
            label="Bairro"
            name="neighborhood"
            placeholder="Savassi"
            error={errors.neighborhood}
            required
          />
        </div>

        <div className="flex mt-7 mb-4 justify-between">
          <Button type="button" variant="outline" onClick={decreaseStep}>
            Voltar
          </Button>
          <Button type="submit" loading={isLoading}>
            {!isEditing ? "Cadastrar" : "Editar"}
          </Button>
        </div>
      </div>
    </section>
  );
}
