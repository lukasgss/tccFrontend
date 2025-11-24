import { Button, Image, Text, Title, Tooltip } from "@mantine/core";
import { ArrowBendUpLeft } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import celebrationImage from "../../assets/images/celebration.webp";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";

type State = {
  fromAlertId: string;
};

export default function HowToAdoptThroughPlatform() {
  const navigate = useNavigate();
  const location = useLocation();

  const { fromAlertId } = (location.state as State) || {};

  const handleBack = () => {
    if (fromAlertId) {
      navigate(`/adocoes/${fromAlertId}`);
    } else {
      navigate("/adocoes");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags
        title="Como adotar pela plataforma | AcheMeuPet"
        description="Descubra como adotar um pet pelo AcheMeuPet. Guia passo a passo para uma adoção responsável e feliz. Encontre seu novo companheiro e mude duas vidas: a dele e a sua."
        keywords="como adotar, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />
      <main className="bg-white w-[90%] md:w-4/5 xl:w-3/5 mx-auto mt-10 p-5 md:p-8 rounded shadow mb-6 relative">
        <Tooltip label="Voltar">
          <Button
            type="button"
            variant="light"
            onClick={handleBack}
            className="w-fit p-1 absolute top-3 left-3"
            aria-label="Voltar"
          >
            <ArrowBendUpLeft size={24} />
          </Button>
        </Tooltip>

        <Title className="text-[25px] mt-8 text-center lg:text-[42px]">Como faço para adotar pela plataforma?</Title>

        <Text size="lg" className="mt-4">
          Utilizar o <strong>AcheMeuPet</strong> para adotar é super fácil e é possível em apenas 3 simples passos:
        </Text>

        <div className="flex flex-col gap-5 mt-5">
          <div>
            <Text size="lg" fw={700}>
              Passo 1:
            </Text>
            <Text>
              Encontre o animal que o interessa baseado nas condições que você tem e o que pode oferecer para ele.
            </Text>
            <Text>Lembre-se que alguns animais possuem restrições de adoção e é muito importante seguí-las!</Text>
          </div>

          <div>
            <Text size="lg" fw={700}>
              Passo 2:
            </Text>
            <Text>
              Entre em contato com o tutor pela própria plataforma ou pelo número de telefone informado para tirar
              dúvidas e marcar um encontro para conhecer o seu mais novo amigo.
            </Text>
          </div>

          <div>
            <Text size="lg" fw={700}>
              Passo 3:
            </Text>
            <Text>
              Adote o animal e certifique de que o tutor confirme sua adoção na plataforma para que todos saibam que ele
              encontrou um lar e que podemos ajudar outros animais também.
            </Text>
          </div>
          <div className="flex flex-col items-center mt-2">
            <Title className="text-center text-[20px] xl:text-[25px]" order={3}>
              E pronto, agora basta aproveitar com o seu novo melhor amigo!
            </Title>
            <Image src={celebrationImage} alt="Celebração" className="w-32 h-32" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
