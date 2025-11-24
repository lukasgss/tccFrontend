import { Text, Title } from "@mantine/core";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import GoBack from "../../components/Common/GoBack/GoBack";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";

export default function FAQ() {
  return (
    <>
      <MetaTags
        title="Perguntas frequentes | AcheMeuPet"
        description="Veja as perguntas frequentes sobre a plataforma e tire suas dúvidas sobre o funcionamento."
        keywords="perguntas frequentes, faq, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />
      <main className="bg-white w-[90%] md:w-4/5 xl:w-3/5 mx-auto mt-10 p-5 md:p-8 rounded shadow mb-10 relative">
        <GoBack />

        <Title className="text-[25px] mt-8 text-center lg:text-[42px]">Perguntas frequentes</Title>

        <div className="flex flex-col gap-8 mt-8">
          <div>
            <Title order={5}>O que é e como funciona o AcheMeuPet?</Title>
            <Text>
              AcheMeuPet é uma plataforma onde pessoas, ONGs e protetores de animais podem anunciar animais para adoção
              ou resgate, onde interessados em adotar um novo pet podem utilizar a plataforma para encontrar um novo
              companheiro.
            </Text>
          </div>

          <div>
            <Title order={5}>O site cobra alguma taxa?</Title>
            <Text>
              Não, o site é totalmente gratuito. Tanto quem divulga os animais quanto quem os adota não pagam nada.
            </Text>
          </div>

          <div>
            <Title order={5}>Quero adotar um animal. O que devo fazer?</Title>
            <Text>
              Ficamos muito felizes com sua decisão! Acesse a plataforma para ver os animais disponíveis para adoção.
              Antes, confira nossas dicas e as restrições da adoção e veja se está pronto para adicionar um novo membro
              na família.
            </Text>
          </div>

          <div>
            <Title order={5}>Como informar que o animal que anunciei foi adotado?</Title>
            <Text>
              Ótima notícia! Faça login, visite a página do anúncio da adoção e clique em &quot;Confirmar adoção&quot;.
              Com isso, o animal será marcado como adotado na plataforma.
            </Text>
          </div>

          <div>
            <Title order={5}>Posso anunciar cães ou gatos para venda?</Title>
            <Text>
              De jeito nenhum! O site é exclusivo para adoção e resgate de animais. Tentativas de venda resultam no
              banimento permanente do usuário.
            </Text>
          </div>

          <div>
            <Title order={5}>Perdi meu animal de estimação. Posso anunciar aqui?</Title>
            <Text>
              No momento, o site não possui uma seção específica para esses anúncios, mas já estamos trabalhando nisso!
              Recomendamos que publique fotos do seu pet no Facebook, Instagram e outras redes sociais, informando a
              data e local do desaparecimento. Compartilhe amplamente e avise quando ele for encontrado. Você também
              pode imprimir cartazes e distribuí-los na região.
            </Text>
          </div>

          <div>
            <Title order={5}>Esqueci minha senha, o que faço?</Title>
            <Text>
              Clique em &quot;Esqueci Minha Senha&quot; na página de login e insira o e-mail usado no cadastro.
              Enviaremos um e-mail com as instruções de redefinição de senha. Caso não receba a mensagem na sua caixa de
              entrada, verifique o spam.
            </Text>
          </div>
        </div>

        <ConversationsSidebar />
      </main>

      <Footer />
    </>
  );
}
