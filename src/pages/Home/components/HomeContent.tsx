import { ActionIcon, BackgroundImage, Box, em, Image, Select, TextInput, Tooltip, UnstyledButton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconCat from "../../../assets/icons/animals/iconCat.svg";
import iconDog from "../../../assets/icons/animals/iconDog.webp";
import dogAndCat from "../../../assets/images/main-dog-and-cat.webp";
import dogAndCatMobile from "../../../assets/images/mobile-main-dog-and-cat.webp";
import useBreedsQuery from "../../../queries/useBreedsQuery";
import useSpeciesQuery from "../../../queries/useSpeciesQuery";
import { AnimalCardData, AnimalCardType } from "../types";
import AnimalCard from "./AnimalCard";
import AnimalCardSelection from "./AnimalCardSelection";

const iconClasses = "w-20 h-20 text-[var(--primary-blue)] mx-auto";

const animalCards: AnimalCardData[] = [
  {
    type: "dog",
    text: "Cachorros",
    speciesId: 1,
    icon: <Image src={iconDog} alt="Ícone de gatos" className={`${iconClasses} w-30`} />,
  },
  {
    type: "cat",
    text: "Gatos",
    speciesId: 2,
    icon: <Image src={iconCat} alt="Ícone de gatos" className={`${iconClasses} object-contain`} />,
  },
];

export default function HomeContent() {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>("");
  const [selectedBreed, setSelectedBreed] = useState<string | null>("");
  const [showSearchInputsMobile, setShowSearchInputsMobile] = useState(false);

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  const [animalCard, setAnimalCard] = useState<AnimalCardType>({
    isOpen: false,
    icon: null,
    speciesId: null,
    animal: null,
  });

  const navigate = useNavigate();

  const { data: species } = useSpeciesQuery();
  const { data: breeds } = useBreedsQuery(selectedSpecies);

  const handleSearch = () => {
    let queryString = `/adocoes?speciesId=${selectedSpecies}`;
    if (selectedBreed) {
      queryString += `&breedIds=${selectedBreed}`;
    }

    navigate(queryString);
  };

  const isSearchButtonDisabled = !selectedSpecies;

  return (
    <>
      <Box>
        <div className="h-1 w-full bg-[var(--primary-blue)]" />
        <BackgroundImage src={isMobile ? dogAndCatMobile : dogAndCat}>
          <div className="flex flex-col h-[400px] md:h-[400px] pt-4 brightness-100">
            <div
              className="flex flex-col md:flex-row justify-center items-center gap-3 px-5 py-4 
            rounded-xl bg-white w-full max-w-[90%] md:max-w-[800px] mx-auto"
            >
              {isMobile && !showSearchInputsMobile ? (
                <UnstyledButton
                  type="button"
                  aria-label="Buscar animais"
                  onClick={() => setShowSearchInputsMobile((prevValue) => !prevValue)}
                  className="w-full"
                >
                  <TextInput placeholder="Buscar animais" className="w-full" size="lg" />
                </UnstyledButton>
              ) : (
                <>
                  <Select
                    aria-label="Escolha da espécie"
                    placeholder="Escolha a espécie"
                    data={species}
                    value={selectedSpecies}
                    onChange={(value) => setSelectedSpecies(value)}
                    size="lg"
                    className="w-full"
                    clearable
                  />
                  <Tooltip label={!selectedSpecies ? "Escolha a espécie para selecionar a raça" : "Selecione a raça"}>
                    <Select
                      aria-label="Escolha de raça"
                      placeholder="Escolha a raça"
                      searchable
                      data={breeds}
                      value={selectedBreed}
                      disabled={!selectedSpecies}
                      onChange={(value) => setSelectedBreed(value)}
                      size="lg"
                      className="w-full"
                      clearable
                    />
                  </Tooltip>
                  <Tooltip label={isSearchButtonDisabled ? "Preencha os campos de espécie e raça" : "Pesquisar"}>
                    <ActionIcon
                      variant="filled"
                      aria-label="Buscar"
                      size="xl"
                      radius="sm"
                      className="bg-[var(--primary-blue)] disabled:bg-[var(--primary-blue-disabled)]"
                      onClick={handleSearch}
                      disabled={isSearchButtonDisabled}
                    >
                      <IconSearch stroke={1.5} className={isSearchButtonDisabled ? "text-gray-200" : ""} />
                    </ActionIcon>
                  </Tooltip>
                </>
              )}
            </div>
            <div className="flex flex-col items-center mx-auto mt-20">
              <h2 className="text-white text-4xl tracking-wider font-bold text-center">Encontre o seu amigo</h2>
              <span className="hidden md:inline-block text-2xl text-white text-center px-1">
                Busque os animais cadastrados na plataforma no Brasil inteiro.
              </span>
            </div>
          </div>
        </BackgroundImage>
        <div className="hidden md:block h-1 w-full bg-[var(--primary-blue)]" />
      </Box>
      {animalCard.isOpen ? (
        <AnimalCard animalCard={animalCard} setAnimalCard={setAnimalCard} />
      ) : (
        <>
          <div className="md:hidden bg-[var(--primary-blue)] pt-3 px-5 pb-6 text-center">
            <span className="w-full bg-[var(--primary-blue)] text-white text-center">
              Busque os animais cadastrados na plataforma no Brasil inteiro.
            </span>
          </div>
          <div className="flex justify-center bg-[var(--base-bg-color)]">
            <div className="mt-[-12px] md:mt-[-35px] flex flex-row flex-wrap justify-center gap-5 mx-auto px-8">
              {animalCards.map((card) => (
                <AnimalCardSelection
                  animalType={card.type}
                  setAnimalCard={setAnimalCard}
                  speciesId={card.speciesId}
                  key={card.text}
                  icon={card.icon}
                  text={card.text}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
