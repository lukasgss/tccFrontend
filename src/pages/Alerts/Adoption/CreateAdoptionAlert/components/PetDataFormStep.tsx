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
import { AlertSchemaFormData, MAX_FILE_SIZE } from "../types";

export interface PetDataFormStepProps {
  increaseStep: () => void;
  trigger: UseFormTrigger<AlertSchemaFormData>;
  register: UseFormRegister<AlertSchemaFormData>;
  control: Control<AlertSchemaFormData>;
  setValue: UseFormSetValue<AlertSchemaFormData>;
  errors: FieldErrors<AlertSchemaFormData>;
  watch: UseFormWatch<AlertSchemaFormData>;
  resetField: UseFormResetField<AlertSchemaFormData>;
  existingFiles?: string[];
}

export default function PetDataFormStep({
  increaseStep,
  trigger,
  control,
  register,
  setValue,
  errors,
  watch,
  resetField,
  existingFiles,
}: Readonly<PetDataFormStepProps>) {
  const navigate = useNavigate();

  type AlertSchemaFormDataKeys = keyof AlertSchemaFormData;

  const petFields: AlertSchemaFormDataKeys[] = [
    "name",
    "gender",
    "age",
    "colors",
    "size",
    "species",
    "breed",
    "description",
    "images",
    "isCastrated",
    "isVaccinated",
    "isNegativeToFivFelv",
    "isNegativeToLeishmaniasis",
  ];

  const { data: sizes } = useSizesQuery();
  const { data: genders } = useGendersQuery();
  const { data: ages } = useAgesQuery();
  const { data: colors } = useColorsQuery();
  const { data: species } = useSpeciesQuery();

  const speciesValue = watch("species");
  const breed = watch("breed");
  const { data: breeds, refetch: refetchBreeds } = useBreedsQuery(speciesValue);

  useEffect(() => {
    if (speciesValue) {
      refetchBreeds();
    }
  }, [speciesValue]);

  const animalDescription = `Poli é uma adorável cachorra da raça Dachshund, conhecida por sua personalidade carinhosa e lealdade incomparável. Sua paixão por viagens para a roça são evidentes, sempre animada e entusiasmada para explorar novos lugares e experiências ao lado de seus humanos queridos.

Como companheira, Poli é insubstituível. Está sempre ao lado de seus donos, pronta para oferecer conforto nos momentos difíceis e compartilhar alegria nos momentos felizes.

Seu amor incondicional e devoção são evidentes em cada olhar afetuoso e cauda abanando. Poli com certeza deixará uma marca no coração daqueles que tiverem a sorte de cruzar seu caminho, tornando-se verdadeiramente a melhor amiga que alguém poderia desejar.`;

  const dogId = "1";
  const catId = "2";

  async function handleNextStep() {
    const promises = petFields.map(async (field) => {
      if (field === "isNegativeToFivFelv" && speciesValue && speciesValue !== catId) {
        return true;
      }

      if (field === "isNegativeToLeishmaniasis" && speciesValue && speciesValue !== dogId) {
        return true;
      }

      return trigger(field);
    });
    const results = await Promise.all(promises);

    const isValid = results.every((result) => result);
    if (isValid) {
      increaseStep();
    }
  }

  const genericFieldData = [
    {
      value: "1",
      label: "Sim",
    },
    {
      value: "0",
      label: "Não",
    },
    {
      value: "-1",
      label: "Desconhecido",
    },
  ];

  useEffect(() => {
    if (speciesValue === catId) {
      resetField("isNegativeToFivFelv");
      setValue("isNegativeToLeishmaniasis", null);
    } else {
      resetField("isNegativeToLeishmaniasis");
      setValue("isNegativeToFivFelv", null);
    }
  }, [resetField, setValue, speciesValue]);

  useEffect(() => {
    resetField("breed");
  }, [resetField, speciesValue]);

  return (
    <section className="mt-8">
      <Title order={3} className="text-center mb-5">
        Dados do animal
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
            description="Adicione imagens com boa qualidade para a visualização do animal"
            title="Inserir imagens"
            maxSize={MAX_FILE_SIZE}
            required
            multiFile
            existingFiles={existingFiles}
          />

          <div className="flex flex-col mt-3 lg:justify-between gap-4 lg:gap-8 lg:flex-row">
            <div className="flex flex-col gap-5 lg:max-w-[300px]">
              <InputText label="Nome" placeholder="Poli" name="name" register={register} error={errors.name} required />
              <InputSelect
                name="gender"
                required
                control={control}
                error={errors.gender}
                label="Sexo"
                placeholder="Fêmea"
                data={genders}
              />
              <InputSelect
                name="age"
                required
                control={control}
                error={errors.age}
                label="Idade"
                placeholder="Filhote"
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

              <InputSelect
                name="isCastrated"
                required
                control={control}
                error={errors.isCastrated}
                label="Castrado?"
                placeholder="Sim"
                data={genericFieldData}
              />
            </div>
            <div className="flex flex-col gap-5">
              <InputSelect
                name="size"
                required
                control={control}
                error={errors.size}
                label="Porte"
                placeholder="Pequeno"
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
                required
                key={speciesValue}
                control={control}
                error={errors.breed}
                label="Raça"
                placeholder={breed === catId ? "Persa" : "Dachshund"}
                data={breeds}
                disabled={!speciesValue}
                title={`${!speciesValue ? "Preencha o campo de espécie para preencher esse campo" : null}`}
              />

              <InputSelect
                name="isVaccinated"
                required
                control={control}
                error={errors.isVaccinated}
                label="Vacinado?"
                placeholder="Sim"
                data={genericFieldData}
              />

              {speciesValue === "1" && (
                <InputSelect
                  name="isNegativeToLeishmaniasis"
                  required
                  control={control}
                  error={errors.isNegativeToLeishmaniasis}
                  label="Negativo para leishmaniose?"
                  placeholder="Sim"
                  data={genericFieldData}
                />
              )}

              {speciesValue === "2" && (
                <InputSelect
                  name="isNegativeToFivFelv"
                  required
                  control={control}
                  error={errors.isNegativeToFivFelv}
                  label="Negativo para FIV e FeLV?"
                  placeholder="Sim"
                  data={genericFieldData}
                />
              )}
            </div>
          </div>
          <div className="my-4">
            <InputTextArea
              control={control}
              label="Descrição do animal"
              placeholder={animalDescription}
              error={errors.description}
              name="description"
              autosize
              minRows={7}
            />
          </div>

          <div className="flex flex-col-reverse gap-2.5 min-[400px]:flex-row justify-between mt-7">
            <div className="min-[400px]:w-fit">
              <Button type="button" variant="outline" className="ml-auto w-full" onClick={() => navigate("/adocoes")}>
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
