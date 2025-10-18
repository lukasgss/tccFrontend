import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormMessage, { FormNotification } from "../../../../components/Common/Errors/FormMessage";
import { ApiError } from "../../../../components/Common/Errors/types";
import InputMultiSelect from "../../../../components/Common/Inputs/InputMultiSelect";
import ColorsInputMultiSelect from "../../../../components/Common/Inputs/MutliSelect/Colors/ColorsInputMultiSelect";
import Loading from "../../../../components/Common/Loading/Loading";
import useAdoptionUserPreferencesQuery from "../../../../queries/useAdoptionUserPreferencesQuery";
import useAgesQuery from "../../../../queries/useAgesQuery";
import useBreedsQuery from "../../../../queries/useBreedsQuery";
import useColorsQuery from "../../../../queries/useColorsQuery";
import useGendersQuery from "../../../../queries/useGendersQuery";
import useSizesQuery from "../../../../queries/useSizesQuery";
import useSpeciesQuery from "../../../../queries/useSpeciesQuery";
import { CreateUserPreferencesRequest } from "../../../../services/requests/User/types";
import { CreateAdoptionUserPreferences } from "../../../../services/requests/User/UserService";

const userPreferencesSchema = z
  .object({
    genders: z.string().array().optional(),
    ages: z.string().array().optional(),
    speciesIds: z.string().array().optional(),
    sizes: z.string().array().optional(),
    colorIds: z.string().array().optional(),
    dogBreeds: z.string().array().optional(),
    catBreeds: z.string().array().optional(),
  })
  .transform((data) => ({
    genders: data.genders,
    ages: data.ages,
    sizes: data.sizes,
    colorIds: data.colorIds,
    speciesIds: data.speciesIds,
    dogBreeds: data.dogBreeds,
    catBreeds: data.catBreeds,
    breedIds: [...(data.dogBreeds ?? []), ...(data.catBreeds ?? [])],
  }));

type UserPreferencesFormData = z.infer<typeof userPreferencesSchema>;

export default function PreferencesTab() {
  const [preferencesSavedMessage, setPreferencesSavedMessage] = useState<FormNotification | null>(null);

  const { control, watch, reset, handleSubmit, setValue } = useForm<UserPreferencesFormData>({
    resolver: zodResolver(userPreferencesSchema),
  });

  const {
    data: userPreferences,
    isPending: loadingUserPreferences,
    refetch: refetchPreferences,
  } = useAdoptionUserPreferencesQuery();

  const insertedSpecies = watch("speciesIds");

  const { data: genders } = useGendersQuery();
  const { data: ages } = useAgesQuery();
  const { data: species } = useSpeciesQuery();
  const { data: sizes } = useSizesQuery();
  const { data: colors } = useColorsQuery();

  const dogSpeciesId = species?.find((s) => s.label === "Cachorro")?.value;
  const catSpeciesId = species?.find((s) => s.label === "Gato")?.value;
  const dogFilter = insertedSpecies?.find((s) => s === dogSpeciesId) ?? null;
  const catFilter = insertedSpecies?.find((s) => s === catSpeciesId) ?? null;

  const { data: dogBreeds } = useBreedsQuery(dogFilter);
  const { data: catBreeds } = useBreedsQuery(catFilter);

  const { mutateAsync: createPreferences, isPending } = useMutation({
    mutationFn: (preferences: CreateUserPreferencesRequest) => CreateAdoptionUserPreferences(preferences),
    onSuccess: () => {
      setPreferencesSavedMessage({ message: "Preferências salvas com sucesso!", type: "success" });
      refetchPreferences();
    },
    onError: (e) => {
      const err = e as AxiosError<ApiError>;
      setPreferencesSavedMessage({
        message: err.response?.data.message ?? "Não foi possível salvar as preferências, tente novamente mais tarde.",
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const body: CreateUserPreferencesRequest = {
      ages: values.ages?.map((age) => parseInt(age, 10)),
      colorIds: values.colorIds?.map((color) => parseInt(color, 10)),
      genders: values.genders?.map((gender) => parseInt(gender, 10)),
      sizes: values.sizes?.map((size) => parseInt(size, 10)),
      breedIds: values.breedIds?.map((s) => parseInt(s, 10)),
      speciesIds: values.speciesIds?.map((s) => parseInt(s, 10)),
    };

    await createPreferences(body);
  });

  const isFormEmpty = Object.values(watch()).every((value) => !value || value.length === 0);

  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    if (userPreferences && !initialDataLoaded) {
      reset({
        ages: userPreferences.ages.map((age) => age.id.toString()),
        colorIds: userPreferences.colors.map((color) => color.id.toString()),
        genders: userPreferences.genders.map((gender) => gender.id.toString()),
        sizes: userPreferences.sizes.map((size) => size.id.toString()),
        speciesIds: userPreferences.species.map((s) => s.id.toString()),
      });

      setInitialDataLoaded(true);
    }
  }, [userPreferences, dogBreeds, catBreeds, initialDataLoaded]);

  useEffect(() => {
    if (userPreferences && (dogBreeds || catBreeds)) {
      const breedsDog = userPreferences.breeds
        .filter((breed) => dogBreeds?.find((b) => b.value === breed.id.toString()) !== undefined)
        .map((breed) => breed.id.toString());
      const breedsCat = userPreferences.breeds
        .filter((breed) => catBreeds?.find((b) => b.value === breed.id.toString()) !== undefined)
        .map((breed) => breed.id.toString());

      setValue(
        "dogBreeds",
        breedsDog.map((breed) => breed.toString()),
      );
      setValue(
        "catBreeds",
        breedsCat.map((breed) => breed.toString()),
      );
    }
  }, [userPreferences, dogBreeds, catBreeds]);

  return (
    <>
      <Title order={2}>Preferências</Title>
      <Text className="mt-3">
        Estabeleça preferências de características de animais que deseja adotar para receber notificações da plataforma
        caso um animal com as características desejadas seja cadastrado.
      </Text>

      {preferencesSavedMessage && (
        <div className="mt-4">
          <FormMessage
            message={preferencesSavedMessage.message}
            closeMessage={() => setPreferencesSavedMessage(null)}
            type={preferencesSavedMessage.type}
          />
        </div>
      )}

      {loadingUserPreferences ? (
        <Loading title="Carregando preferências..." className="mt-8" />
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-3">
          <InputMultiSelect control={control} name="speciesIds" data={species} label="Espécie" placeholder="Cachorro" />

          {dogBreeds && (
            <InputMultiSelect
              control={control}
              name="dogBreeds"
              data={dogBreeds}
              label="Raças de cachorro"
              placeholder="Border Collie"
            />
          )}

          {catBreeds && (
            <InputMultiSelect
              control={control}
              name="catBreeds"
              data={catBreeds}
              label="Raças de gato"
              placeholder="Siamês"
            />
          )}

          <div className="flex flex-col xl:flex-row gap-5">
            <div className="w-full">
              <InputMultiSelect
                control={control}
                name="genders"
                data={genders?.filter((gender) => gender.label !== "Desconhecido")}
                label="Sexo"
                placeholder="Macho"
              />
            </div>

            <div className="w-full">
              <InputMultiSelect control={control} name="ages" data={ages} label="Idades" placeholder="Jovem" />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-5">
            <div className="w-full">
              <InputMultiSelect control={control} name="sizes" data={sizes} label="Porte" placeholder="Médio" />
            </div>

            <div className="w-full">
              <ColorsInputMultiSelect
                control={control}
                name="colorIds"
                data={colors}
                label="Cores"
                placeholder="Caramelo"
              />
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <Button type="submit" loading={isPending} disabled={isFormEmpty}>
              Salvar
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
