import { Image, Text, Title } from "@mantine/core";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";

import abandonedDogImage from "../../assets/images/abandoned-dog.webp";
import GoBack from "../../components/Common/GoBack/GoBack";
import MetaTags from "../../components/Utils/MetaTags";

export default function ResponsibleAdoption() {
  return (
    <>
      <MetaTags
        title="Adoção Responsável | AcheMeuPet"
        description="Saiba como adotar um animal de forma responsável, considerando aspectos como a estrutura da casa, presença de crianças, segurança e condições financeiras. Garanta uma adoção consciente e o bem-estar do seu novo pet."
        keywords="adoção responsável, adoção de animais, pets para adotar, resgate animal, animais perdidos, cuidados com animais, adoção consciente"
      />

      <Header />

      <main className="bg-white w-[90%] md:w-4/5 xl:w-3/5 mx-auto mt-10 p-5 md:p-8 rounded shadow mb-10 relative">
        <GoBack />

        <Title className="text-[25px] mt-8 text-center lg:text-[42px]">Adoção responsável de animais</Title>

        <Image
          className="mx-auto rounded mt-4 w-[250px] sm:w-[450px]"
          src={abandonedDogImage}
          alt="Cachorro abandonado"
        />

        <Text className="mt-5">
          A adoção de um animal é um ato de amor e responsabilidade que vai muito além de simplesmente acolher um pet em
          sua casa. Ela implica em um compromisso de longo prazo, que deve considerar o bem-estar do animal e as
          condições da família que o receberá. Antes de tomar essa decisão, é fundamental refletir sobre aspectos como o
          ambiente em que o animal viverá, a presença de crianças, a segurança da casa, e até a situação financeira.
          Aqui, abordaremos os principais pontos que devem ser avaliados para garantir uma adoção responsável.
        </Text>

        <Title order={5} className="mt-5">
          Condições da casa
        </Title>
        <Text>
          O primeiro passo para uma adoção responsável é avaliar o ambiente em que o animal viverá. Para cães, espaços
          maiores ou com quintal podem ser mais adequados, especialmente para raças de grande porte que necessitam de
          atividade física regular. Já para gatos, é importante garantir que a casa seja segura e, preferencialmente,
          tenha telas em janelas e sacadas para evitar acidentes.
        </Text>
        <Text>
          A falta de telas pode representar um grande perigo para os felinos, que podem cair ou escapar, se perdendo na
          rua. Além disso, alguns animais têm mais necessidades de interação e brincadeiras, enquanto outros podem ser
          mais independentes. Entender o perfil do animal e as características do seu lar é fundamental para garantir a
          qualidade de vida dele.
        </Text>

        <Title order={5} className="mt-5">
          Presença de crianças
        </Title>
        <Text>
          Outro aspecto essencial é avaliar a dinâmica familiar, principalmente se houver crianças em casa. Alguns
          animais são mais dóceis e pacientes, enquanto outros podem ser mais ariscos ou precisar de mais espaço e
          tranquilidade. Cachorros de raças mais tranquilas costumam se adaptar bem a lares com crianças, enquanto
          gatos, dependendo de sua personalidade, podem preferir locais mais calmos.
        </Text>
        <Text>
          É importante ensinar as crianças desde cedo a respeitar o espaço do animal, evitando movimentos bruscos ou
          brincadeiras agressivas, que podem causar desconforto ou até mesmo agressões por parte do pet, em uma
          tentativa de se proteger.
        </Text>

        <Title order={5} className="mt-5">
          Situação financeira
        </Title>
        <Text>
          Adotar um animal envolve custos que vão além da alimentação. É necessário garantir cuidados veterinários
          regulares, vacinas, medicamentos, além de possíveis emergências de saúde. Raças específicas podem ter
          predisposições genéticas a certas condições médicas, o que pode resultar em despesas adicionais.
        </Text>
        <Text>
          Além disso, gastos com higiene, acessórios como coleiras, brinquedos, caminhas e até mesmo adestramento devem
          ser considerados. A situação financeira da família deve estar preparada para garantir o cuidado adequado ao
          animal por toda a sua vida.
        </Text>

        <Title order={5} className="mt-5">
          Disponibilidade de Tempo
        </Title>
        <Text>
          Animais, principalmente cachorros, necessitam de atenção e companhia. Alguns cães sofrem de ansiedade de
          separação se ficarem sozinhos por longos períodos, o que pode levar a comportamentos destrutivos. Passeios
          diários e momentos de interação são fundamentais para o bem-estar de cães e gatos, além de contribuir para o
          fortalecimento do vínculo entre o tutor e o animal.
        </Text>
        <Text>
          Se a rotina da família for muito corrida e não houver disponibilidade de tempo para cuidar e interagir com o
          animal, pode ser mais responsável esperar até que as condições mudem para adotar um pet.
        </Text>

        <Title order={5} className="mt-5">
          Planejamento de Longo Prazo
        </Title>
        <Text>
          A adoção de um animal não é uma decisão temporária. Cães e gatos podem viver por mais de 15 anos, e é
          necessário garantir que, durante todo esse tempo, eles receberão os cuidados necessários. Antes de adotar,
          considere se há planos de mudança de cidade ou país, chegada de novos membros na família, ou qualquer outra
          alteração de vida que possa impactar a capacidade de cuidar do pet.
        </Text>

        <Title order={5} className="mt-5">
          Filhotes vs. Animais Adultos
        </Title>
        <Text>
          Embora muitas pessoas prefiram adotar filhotes, animais adultos também são ótimas opções e, muitas vezes,
          podem estar mais preparados para viver em uma casa, pois já passaram pela fase de aprendizado básico de
          comportamento e higiene. Além disso, adotar um animal adulto, especialmente de abrigos, pode significar salvar
          uma vida e proporcionar uma nova chance a um ser que muitas vezes é esquecido.
        </Text>

        <Title order={5} className="mt-5">
          Conclusão
        </Title>
        <Text>
          A adoção responsável de animais exige planejamento, reflexão e preparação. Cada detalhe, desde a estrutura da
          casa até a condição financeira e a dinâmica familiar, deve ser cuidadosamente considerado para garantir que o
          novo membro da família tenha uma vida feliz e saudável. Adotar um animal é, acima de tudo, assumir um
          compromisso de amor, respeito e cuidado por toda a vida do pet. Ao refletir sobre essas questões antes de
          adotar, você estará contribuindo para uma sociedade mais consciente e para o bem-estar dos animais.
        </Text>
      </main>

      <ConversationsSidebar />
      <Footer />
    </>
  );
}
