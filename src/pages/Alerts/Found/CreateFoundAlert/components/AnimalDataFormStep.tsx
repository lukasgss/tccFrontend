import { Button, Title } from "@mantine/core";
import { useEffect } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputDropzone from "../../../../../components/Common/Inputs/Dropzone/InputDropzone";
import InputSelect from "../../../../../components/Common/Inputs/InputSelect";
import InputText from "../../../../../components/Common/Inputs/InputText";
import InputTextArea from "../../../../../components/Common/Inputs/InputTextarea";
import ColorsInputMultiSelect from "../../../../../components/Common/Inputs/MutliSelect/Colors/ColorsInputMultiSelect";
import useAgesQuery from "../../../../../queries/useAgesQuery";
import useBreedsQuery from "../../../../../queries/useBreedsQuery";
import useColorsQuery from "../../../../../queries/useColorsQuery";
import useGendersQuery from "../../../../../queries/useGendersQuery";
import useSizesQuery from "../../../../../queries/useSizesQuery";
import useSpeciesQuery from "../../../../../queries/useSpeciesQuery";
import { FoundAnimalAlertSchemaFormData, MAX_FILE_SIZE } from "../types";

export interface AnimalDataFormStepProps {
  increaseStep: () => void;
  trigger: UseFormTrigger<FoundAnimalAlertSchemaFormData>;
  register: UseFormRegister<FoundAnimalAlertSchemaFormData>;
  control: Control<FoundAnimalAlertSchemaFormData>;
  setValue: UseFormSetValue<FoundAnimalAlertSchemaFormData>;
  errors: FieldErrors<FoundAnimalAlertSchemaFormData>;
  watch: UseFormWatch<FoundAnimalAlertSchemaFormData>;
  resetField: UseFormResetField<FoundAnimalAlertSchemaFormData>;
  existingFiles?: string[];
}

export default function AnimalDataFormStep({
  increaseStep,
  trigger,
  control,
  register,
  setValue,
  errors,
  watch,
  resetField,
  existingFiles,
}: Readonly<AnimalDataFormStepProps>) {
  const navigate = useNavigate();

  type FoundAnimalAlertSchemaFormDataKeys = keyof FoundAnimalAlertSchemaFormData;

  const animalFields: FoundAnimalAlertSchemaFormDataKeys[] = ["age", "colors", "size", "species", "images"];

  const { data: sizes } = useSizesQuery();
  const { data: genders } = useGendersQuery(true);
  const { data: ages } = useAgesQuery();
  const { data: colors } = useColorsQuery();
  const { data: species } = useSpeciesQuery();

  const speciesValue = watch("species");
  const { data: breeds, refetch: refetchBreeds } = useBreedsQuery(speciesValue);

  useEffect(() => {
    if (speciesValue) {
      refetchBreeds();
    }
  }, [speciesValue, refetchBreeds]);

  const animalDescription = `Encontrei este animal na rua e parece estar perdido. O animal aparenta estar em boas condições de saúde e é muito dócil. Se você reconhece este pet ou tem informações sobre o dono, entre em contato.`;

  async function handleNextStep() {
    const promises = animalFields.map(async (field) => trigger(field));
    const results = await Promise.all(promises);

    const isValid = results.every((result) => result);
    if (isValid) {
      increaseStep();
    }
  }

  useEffect(() => {
    resetField("breed");
  }, [resetField, speciesValue]);

  return (
    <section className="mt-8">
      <Title order={3} className="text-center mb-5">
        Dados do animal encontrado
      </Title>

      <div className="flex justify-center pb-5">
        <div className="w-3/4 max-w-[700px]">
          <InputDropzone
            inputName="images"
            existingFilesInputName="existingImages"
            isImage
            control={control}
            setValue={setValue}
            label="Imagens do animal"
            error={errors.images}
            description="Adicione imagens com boa qualidade para facilitar a identificação"
            title="Inserir imagens"
            maxSize={MAX_FILE_SIZE}
            required
            multiFile
            existingFiles={existingFiles}
          />

          <div className="flex flex-col mt-3 lg:justify-between gap-4 lg:gap-8 lg:flex-row">
            <div className="flex flex-col gap-5 lg:max-w-[300px]">
              <InputText
                label="Nome (se souber)"
                placeholder="Rex"
                name="name"
                register={register}
                error={errors.name}
                required={false}
              />
              <InputSelect
                name="gender"
                required={false}
                control={control}
                error={errors.gender}
                label="Sexo"
                placeholder="Macho"
                data={genders}
              />
              <InputSelect
                name="age"
                required
                control={control}
                error={errors.age}
                label="Idade aproximada"
                placeholder="Adulto"
                data={ages}
              />
              <ColorsInputMultiSelect
                name="colors"
                data={colors}
                error={errors.colors}
                required
                control={control}
                label="Cores"
                placeholder="Caramelo"
              />
            </div>
            <div className="flex flex-col gap-5">
              <InputSelect
                name="size"
                required
                control={control}
                error={errors.size}
                label="Porte"
                placeholder="Médio"
                data={sizes}
              />

              <InputSelect
                name="species"
                required
                control={control}
                error={errors.species}
                label="Espécie"
                placeholder="Cachorro"
                data={species}
              />

              <InputSelect
                name="breed"
                required={false}
                key={speciesValue}
                control={control}
                error={errors.breed}
                label="Raça (se souber)"
                placeholder="Vira-lata"
                data={breeds}
                disabled={!speciesValue}
                title={`${!speciesValue ? "Preencha o campo de espécie para preencher esse campo" : ""}`}
              />
            </div>
          </div>
          <div className="my-4">
            <InputTextArea
              control={control}
              label="Descrição (local onde encontrou, características, etc.)"
              placeholder={animalDescription}
              error={errors.description}
              name="description"
              autosize
              minRows={5}
            />
          </div>

          <div className="flex flex-col-reverse gap-2.5 min-[400px]:flex-row justify-between mt-7">
            <div className="min-[400px]:w-fit">
              <Button
                type="button"
                variant="outline"
                className="ml-auto w-full"
                onClick={() => navigate("/encontrados")}
              >
                Voltar a listagem
              </Button>
            </div>

            <div className="min-[400px]:w-fit">
              <Button type="button" variant="filled" className="ml-auto w-full" onClick={() => handleNextStep()}>
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
