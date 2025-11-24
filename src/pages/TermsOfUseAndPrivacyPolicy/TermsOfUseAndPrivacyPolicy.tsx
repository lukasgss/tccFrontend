import { Text, Title } from "@mantine/core";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import GoBack from "../../components/Common/GoBack/GoBack";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";

export default function TermsOfUseAndPrivacyPolicy() {
  return (
    <>
      <MetaTags
        title="Termos de Uso e Política de Privacidade | AcheMeuPet"
        description="Leia os termos de uso da plataforma AcheMeuPet e entenda as regras para utilização do site."
        keywords="termos de uso, adoção animal, adoção de animais, regras de uso, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />
      <main className="bg-white w-[90%] md:w-4/5 xl:w-3/5 mx-auto mt-10 p-5 md:p-8 rounded shadow mb-10 relative">
        <GoBack />

        <Title className="text-[25px] mt-8 text-center lg:text-[42px]">Termos de Uso e Política de Privacidade</Title>

        <div className="flex flex-col gap-8 mt-8">
          <div>
            <Title order={5}>Aceitação dos Termos</Title>
            <Text>
              A aceitação, por parte do usuário, dos termos e condições do regulamento de uso do site Ache Meu Pet é uma
              condição essencial para acessar e utilizar a plataforma.
            </Text>
            <Text>
              Ao aceitar os termos, o <span className="font-bold">usuário</span> concorda com todas as condições
              estabelecidas no regulamento de uso do site Ache Meu Pet, sem restrições ou ressalvas de qualquer
              natureza.
            </Text>
          </div>

          <div>
            <Title order={5}>Objetivo da plataforma</Title>
            <Text>
              O objetivo do <span className="font-bold">Ache Meu Pet</span> é conectar pessoas interessadas em adotar ou
              resgatar animais com indivíduos ou organizações que desejam doar esses animais, promovendo o resgate ou
              adoção responsável e contribuindo para a redução do número de animais abandonados.
            </Text>
            <Text className="mt-2">
              O <span className="font-bold">Ache Meu Pet</span> atua como uma plataforma de comunicação entre seus
              usuários, permitindo:
            </Text>
            <ul className="list-disc pl-5">
              <li>Divulgação de animais para adoção ou resgate;</li>
              <li>Disponibilização dos dados do doador para que o interessado possa entrar em contato.</li>
            </ul>
          </div>

          <div>
            <Title order={5}>Responsabilidades do usuário</Title>
            <Text>
              O <span className="font-bold">Ache Meu Pet</span> é destinado a pessoas físicas, empresas ou ONGs que
              desejam divulgar animais para adoção, adotar ou resgatar um animal.
            </Text>
            <Text className="mt-2">
              As entidades jurídicas são responsáveis pelas atividades de seus usuários vinculados ao site. Ao se
              cadastrar, o <span className="font-bold">usuário</span> aceita que suas informações poderão ser acessadas
              por terceiros navegando na internet. O <span className="font-bold"> usuário</span> deve, portanto,{" "}
              <span className="font-bold"> evitar</span> a publicação de dados que não deseja tornar públicos.
            </Text>
          </div>

          <div>
            <Title order={5}>Uso da plataforma</Title>
            <Text>
              A plataforma destina-se exclusivamente a pessoas interessadas em adotar, doar ou resgatar animais, sendo
              proibido o uso para outros fins que não estejam de acordo com este regulamento.
            </Text>
            <Text className="mt-2">
              Para utilizar a plataforma, é necessário que os usuários interessados em divulgar animais para adoção
              preencham integralmente o cadastro de usuário, cujos dados serão tratados conforme a{" "}
              <span className="font-bold"> Política de Privacidade</span> abaixo.
            </Text>
          </div>

          <div>
            <Title order={5}>Cadastro de usuário e Política de Privacidade</Title>
            <Text>
              O usuário deve fornecer informações precisas ao se cadastrar e manter seus dados atualizados. O{" "}
              <span className="font-bold"> Ache Meu Pet</span> utilizará esses dados apenas para o desenvolvimento e
              aprimoramento dos serviços oferecidos pela plataforma.
            </Text>
            <Text className="mt-2">
              A plataforma não divulgará ou comercializará os dados pessoais dos usuários, mas poderá compartilhar as
              informações dos animais para aumentar as chances de adoção ou resgate.
            </Text>
            <Text className="mt-2">
              Em cumprimento a determinações legais, o <span className="font-bold"> Ache Meu Pet</span> fornecerá
              informações dos <span className="font-bold">usuários</span> às autoridades, conforme requerido. O usuário
              também consente que seus dados sejam utilizados para compilar estatísticas anônimas para a divulgação da
              plataforma, bem como para o envio de atualizações sobre o trabalho do{" "}
              <span className="font-bold"> Ache Meu Pet</span>.
            </Text>
          </div>

          <div>
            <Title order={5}>Responsabilidade</Title>
            <Text>
              O <span className="font-bold">usuário</span> concorda em isentar o site e seus responsáveis de qualquer
              responsabilidade por danos ou prejuízos decorrentes de sua utilização da plataforma.
            </Text>
          </div>

          <div>
            <Title order={5}>Desligamento do usuário</Title>
            <Text>
              O <span className="font-bold">Ache Meu Pet</span> pode cancelar o acesso do usuário a qualquer momento,
              sem aviso prévio ou justificativa. O usuário pode solicitar reconsideração do desligamento, mas a
              readmissão dependerá exclusivamente da decisão da plataforma.
            </Text>
          </div>

          <div>
            <Title order={5}>Normas de Conduta</Title>
            <Text>
              O <span className="font-bold"> usuário</span> está proibido de utilizar o site para atividades que
              conflitem com as normas de uso da plataforma, incluindo, mas não se limitando a:
            </Text>
            <ul className="list-disc pl-5">
              <li>Compra ou venda de animais, ou cobrança de taxas de adoção;</li>
              <li>Oferecimento de bens e serviços, gratuitos ou pagos;</li>
              <li>Uso de linguagem ofensiva;</li>
              <li>Prática de atividades ilegais;</li>
              <li>Invasão de privacidade de outros usuários;</li>
              <li>Uso de identidade falsa;</li>
            </ul>
            <Text className="mt-2">
              O <span className="font-bold"> usuário</span> também não deve compartilhar seus dados de acesso com
              terceiros. Caso tome conhecimento de uso indevido de seus dados, deverá alterar sua senha imediatamente.
            </Text>
          </div>

          <div>
            <Title order={5}>Propriedade Intelectual</Title>
            <Text>
              Todo o conteúdo do site, como nomes, marcas, fotos, e softwares, é de propriedade do{" "}
              <span className="font-bold"> Ache Meu Pet</span> ou de terceiros, sendo protegido pela legislação
              brasileira de propriedade intelectual. O uso de tais conteúdos sem a devida autorização será considerado
              uma violação de direitos de propriedade intelectual.
            </Text>
          </div>

          <div>
            <Title order={5}>Como usamos as informações coletadas</Title>
            <Text>
              As informações dos usuários são tratadas de acordo com a Lei Geral de Proteção de Dados (LGPD) e usadas
              para:
            </Text>
            <ul className="pl-5 list-disc">
              <li>Permitir o acesso e a comunicação entre usuários da plataforma;</li>
              <li>Realizar análises e pesquisas;</li>
              <li>Fornecer suporte ao cliente e enviar notificações;</li>
              <li>Personalizar a experiência com base nas interações e preferências do usuário.</li>
            </ul>
            <Text className="mt-3">Além disso, as informações são utilizadas para:</Text>

            <ul className="pl-5 list-disc">
              <li>Detectar e prevenir fraudes e outras atividades ilícitas;</li>
              <li>Realizar verificações de segurança e risco;</li>
              <li>Cumprir obrigações legais e proteger a saúde e o bem-estar dos adotantes e tutores cadastrados</li>
            </ul>
          </div>

          <div>
            <Title order={5}>Encerramento das atividades</Title>
            <Text>
              O encerramento do site, seja definitivo ou temporário, não implicará qualquer obrigação de compensação,
              indenização ou comunicação prévia aos usuários.
            </Text>
          </div>
        </div>
      </main>

      <ConversationsSidebar />
      <Footer />
    </>
  );
}
