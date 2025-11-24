import { Button, Title } from "@mantine/core";
import { useEffect } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import InputSelect from "../../../../../components/Common/Inputs/InputSelect";
import InputText from "../../../../../components/Common/Inputs/InputText";
import InputTextArea from "../../../../../components/Common/Inputs/InputTextarea";
import useAllStatesQuery from "../../../../../queries/useAllStatesQuery";
import useCitiesFromStateQuery from "../../../../../queries/useCitiesFromStateQuery";
import { MissingAlertSchemaFormData } from "../types";

export interface MissingDataFormStepProps {
  control: Control<MissingAlertSchemaFormData>;
  errors: FieldErrors<MissingAlertSchemaFormData>;
  isLoading: boolean;
  isEditing?: boolean;
  decreaseStep: () => void;
  register: UseFormRegister<MissingAlertSchemaFormData>;
  watch: UseFormWatch<MissingAlertSchemaFormData>;
  setValue: UseFormSetValue<MissingAlertSchemaFormData>;
}

export default function MissingDataFormStep({
  control,
  errors,
  isLoading,
  isEditing = false,
  decreaseStep,
  register,
  watch,
  setValue,
}: Readonly<MissingDataFormStepProps>) {
  const { data: states } = useAllStatesQuery();
  const state: string | null = watch("state");
  const { data: cities } = useCitiesFromStateQuery(state as string);

  let shouldShowCityInput = false;
  if (state || isEditing) {
    shouldShowCityInput = true;
  }

  const missingDescription = `Forneça detalhes sobre o desaparecimento: quando foi visto pela última vez, horário aproximado, se estava usando coleira ou algum acessório, circunstâncias do desaparecimento, e qualquer outra informação relevante que possa ajudar na busca.`;

  useEffect(() => {
    if (!isEditing) {
      setValue("city", "");
    }
  }, [state, setValue, isEditing]);

  return (
    <section className="mt-8 w-[85%] max-w-[700px] flex mx-auto justify-center">
      <div className="flex-1">
        <Title order={2} className="text-center mb-7">
          Dados do desaparecimento
        </Title>
        <div className="flex flex-col gap-3 mb-4">
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
        <div className="my-4">
          <InputTextArea
            control={control}
            label="Descrição do desaparecimento"
            placeholder={missingDescription}
            error={errors.missingDescription}
            name="missingDescription"
            autosize
            minRows={7}
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
