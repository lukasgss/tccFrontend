import { Button, Title } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import InputDropzone from "../../../../../components/Common/Inputs/Dropzone/InputDropzone";
import InputCheckboxGroup from "../../../../../components/Common/Inputs/InputCheckboxGroup";
import InputSelect from "../../../../../components/Common/Inputs/InputSelect";
import InputText from "../../../../../components/Common/Inputs/InputText";
import { CheckboxOption } from "../../../../../components/Common/Inputs/types";
import useAllStatesQuery from "../../../../../queries/useAllStatesQuery";
import useCitiesFromStateQuery from "../../../../../queries/useCitiesFromStateQuery";
import { AlertSchemaFormData, MAX_FILE_SIZE } from "../types";

export interface AdoptionDataFormStepProps {
  control: Control<AlertSchemaFormData>;
  errors: FieldErrors<AlertSchemaFormData>;
  isLoading: boolean;
  isEditing?: boolean;
  existingAdoptionForm?: string;
  existingAdoptionFormFileName?: string;
  alreadyMarkedRestrictions?: string[];
  setExistingAdoptionForm?: Dispatch<SetStateAction<string | undefined>>;
  decreaseStep: () => void;
  register: UseFormRegister<AlertSchemaFormData>;
  watch: UseFormWatch<AlertSchemaFormData>;
  setValue: UseFormSetValue<AlertSchemaFormData>;
}

export default function AdoptionDataFormStep({
  control,
  errors,
  isLoading,
  isEditing = false,
  existingAdoptionForm,
  existingAdoptionFormFileName,
  alreadyMarkedRestrictions,
  setExistingAdoptionForm,
  decreaseStep,
  register,
  watch,
  setValue,
}: Readonly<AdoptionDataFormStepProps>) {
  const { data: states } = useAllStatesQuery();

  const state: string | null = watch("state");
  const { data: cities } = useCitiesFromStateQuery(state);

  let shouldShowCityInput = false;
  if (state || isEditing) {
    shouldShowCityInput = true;
  }

  const checkboxOptions: CheckboxOption[] = [
    {
      label: "Apenas imóveis telados",
      value: "Apenas imóveis telados",
    },
    {
      label: "Espaço adequado",
      value: "Espaço adequado",
    },
    {
      label: "Acompanhamento após a adoção",
      value: "Acompanhamento após a adoção",
    },
    {
      label: "Ausência de outros animais",
      value: "Ausência de outros animais",
    },
  ];

  useEffect(() => {
    if (!isEditing) {
      setValue("city", "");
    }
  }, [state, setValue, isEditing]);

  return (
    <section className="mt-8 w-[85%] max-w-[700px] flex mx-auto justify-center">
      <div className="flex-1">
        <Title order={2} className="text-center">
          Dados da adoção
        </Title>

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
            required={false}
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
              required={false}
            />
          )}

          <InputText
            register={register}
            label="Bairro"
            name="neighborhood"
            placeholder="Savassi"
            error={errors.neighborhood}
          />
        </div>

        <InputCheckboxGroup
          control={control}
          multiLine
          name="restrictions"
          label="Há alguma restrição em relação a adoção?"
          required={false}
          hasOtherField
          otherFieldPlaceholder="Outra restrição"
          checkboxOptions={checkboxOptions}
          alreadyMarkedOptionLabels={alreadyMarkedRestrictions}
        />

        <div className="mt-6">
          <InputDropzone
            inputName="adoptionForm"
            existingFilesInputName="existingAdoptionForm"
            existingFiles={existingAdoptionForm ? [existingAdoptionForm] : undefined}
            existingFileName={existingAdoptionFormFileName}
            setExistingFilesValue={setExistingAdoptionForm}
            isImage={false}
            control={control}
            setValue={setValue}
            label="Formulário de adoção"
            error={errors.adoptionForm}
            description="Possui um formulário de adoção? Insira-o aqui."
            title="Inserir formulário de adoção"
            maxSize={MAX_FILE_SIZE}
            required={false}
            multiFile={false}
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
