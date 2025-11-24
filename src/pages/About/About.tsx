import { Text, Title } from "@mantine/core";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import GoBack from "../../components/Common/GoBack/GoBack";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";

export default function About() {
  return (
    <>
      <MetaTags
        title="Sobre a plataforma | AcheMeuPet"
        description="Saiba mais sobre a história do AcheMeuPet e nosso propósito de conectar animais em situação de rua com lares amorosos."
        keywords="sobre, história, propósito, adoção de animais, plataforma de adoção, resgate animal, pets para adotar, animais de rua, animais perdidos"
      />

      <Header />
      <main className="bg-white w-[90%] md:w-4/5 xl:w-3/5 mx-auto mt-10 p-5 md:p-8 rounded shadow mb-10 relative">
        <GoBack />

        <Title className="text-[25px] mt-8 text-center lg:text-[42px]">Sobre o AcheMeuPet</Title>

        <Text className="mb-3 mt-5">AcheMeuPet é uma plataforma online de adoção e resgate de animais no Brasil.</Text>

        <Text className="mb-5">
          Nossa missão é simples: acreditamos que todos os animais de rua merecem um lar amoroso. Para isso, trabalhamos
          para conectar animais que não possuem um abrigo com pessoas dispostas a oferecer um lar definitivo ao animal.
        </Text>

        <Title order={5}>Como funciona?</Title>
        <Text>
          Nós <span className="font-bold">não</span> temos abrigos próprios e também{" "}
          <span className="font-bold">não</span> fazemos resgates. Nosso trabalho é 100% online, promovendo a adoção e
          resgate de animais que necessitam de um lar. Funciona da seguinte forma:
        </Text>
        <ol className="mt-2 list-decimal px-5">
          <li>
            Pessoas, protetores independentes ou ONGs que desejam doar um animal o cadastram na plataforma na forma de
            &quot;alertas&quot;, como é chamado na plataforma, incluindo detalhes sobre o animal, como suas
            características e personalidade;
          </li>
          <li>
            Pessoas que estão à procura de um novo pet entram no site e buscam aquele que mais se encaixa no que estão
            buscando;
          </li>
          <li>
            Ao encontrar o animal ideal, o adotante entra em contato com quem criou o alerta, seja pela própria
            plataforma ou por telefone. Juntos, eles acertam os detalhes sobre como será o processo de adoção.
          </li>
        </ol>

        <Title order={5} className="mt-5">
          Gostaria de um melhor amigo?
        </Title>
        <Text>
          <a
            href="/adocoes"
            target="_blank"
            rel="noreferrer"
            aria-label="Conheça os animais disponíveis para adoção"
            className="text-[#0000EE] hover:underline"
          >
            Conheça os animais
          </a>{" "}
          que aguardam por um lar. Antes, não deixe de conferir nossas dicas sobre adoção, as restrições da adoção em
          específico e veja se está pronto para receber um novo membro na família!
        </Text>

        <Title order={5} className="mt-5">
          Quer divulgar um animal para adoção?
        </Title>
        <Text>
          Se você gostaria de divulgar um animal, faça o cadastro na plataforma e publique as informações do animal.
          Insira o máximo de detalhes e fotos para aumentar as chances de encontrar alguém que se identifique com ele,
          evitando decepções e possíveis abandonos. Seja transparente quanto à saúde e características do animal.
          Lembrando que esta é uma plataforma voltada para <span className="font-bold"> adoção e resgate</span>, e a
          venda de animais é <span className="font-bold"> proibida</span>. Usuários vendendo animais serão banidos
          permanentemente.
        </Text>

        <Title order={5} className="mt-5">
          Curtiu? Apoie nosso trabalho!
        </Title>
        <Text>
          Existem diversas formas de contribuir com a plataforma, entre em contato com a gente em
          <a
            href="mailto:contato@achemeupet.com.br?subject=Como posso contribuir com a plataforma?&body=Olá! Gostaria de mais informações sobre como contribuir com a plataforma."
            target="_blank"
            rel="noreferrer"
            className="text-[#0000EE] hover:underline"
          >
            {" "}
            contato@achemeupet.com.br
          </a>{" "}
          para mais informações.
        </Text>

        <Title order={5} className="mt-5">
          Nos siga nas redes sociais
        </Title>
        <Text>
          Fique por dentro das nossas novidades, dicas, novas funcionalidades e animais cadastrados. Siga-nos no
          <a
            href="https://www.tiktok.com/@achemeupet"
            target="_blank"
            rel="noreferrer"
            className="text-[#0000EE] hover:underline"
          >
            {" "}
            TikTok
          </a>
          ,
          <a
            href="https://www.instagram.com/achemeupet"
            target="_blank"
            rel="noreferrer"
            className="text-[#0000EE] hover:underline"
          >
            {" "}
            Instagram{" "}
          </a>
          e
          <a
            href="https://www.facebook.com/Achemeupet"
            target="_blank"
            rel="noreferrer"
            className="text-[#0000EE] hover:underline"
          >
            {" "}
            Facebook
          </a>
          .
        </Text>
      </main>

      <ConversationsSidebar />

      <Footer />
    </>
  );
}
