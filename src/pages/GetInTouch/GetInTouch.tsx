import { Text, Title } from "@mantine/core";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import GoBack from "../../components/Common/GoBack/GoBack";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";

export default function GetInTouch() {
  return (
    <>
      <MetaTags
        title="Contato | AcheMeuPet"
        description="Entre em contato com a gente tire suas dúvidas."
        keywords="perguntas frequentes, faq, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />

      <main className="bg-white w-[90%] md:w-4/5 xl:w-3/5 mx-auto p-5 md:p-8 rounded shadow my-16 relative">
        <GoBack />

        <Title className="text-[25px] mt-6 text-center lg:text-[42px]">Contato</Title>

        <Text className="mt-5">
          Para esclarecer suas dúvidas, confira se ela já foi respondida em nossas{" "}
          <a
            href="/faq"
            target="_blank"
            rel="noreferrer"
            aria-label="Perguntas frequentes"
            className="text-[#0000EE] hover:underline"
          >
            Perguntas Frequentes.
          </a>
        </Text>

        <Text className="mt-4">
          Caso ainda tenha alguma pergunta, queira enviar sugestões ou comentar algo do site, mande um e-mail para
          <a
            href="mailto:contato@achemeupet.com.br?subject=Mensagem de contato&body=Olá! Gostaria de entrar em contato com vocês."
            target="_blank"
            rel="noreferrer"
            aria-label="E-mail de contato"
            className="text-[#0000EE] hover:underline break-words sm:break-normal"
          >
            {" "}
            contato@achemeupet.com.br
          </a>
          .
        </Text>

        <Text className="mt-4">Responderemos o mais rápido possível!</Text>

        <ConversationsSidebar />
      </main>

      <Footer />
    </>
  );
}
