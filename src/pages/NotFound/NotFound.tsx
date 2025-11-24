import { Button, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import notFoundImage from "../../assets/images/not-found.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";

export default function NotFound() {
  return (
    <>
      <MetaTags
        title="Página não encontrada | AcheMeuPet"
        description="Página não encontrada."
        keywords="adoção responsável, adoção de animais, pets para adotar, resgate animal, animais perdidos, cuidados com animais, adoção consciente"
      />

      <Header />

      <main className="h-[calc(100vh-60px)] flex items-center justify-center">
        <div className="p-8 md:p-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 font-sans">Algo está errado...</h1>
              <p className="text-gray-600 text-lg mb-4">
                A página que tentou abrir não existe. Você pode ter digitado o endereço errado ou a página foi movida
                para outro lugar. Se você acha que isso é um erro, entre em contato com a gente.
              </p>
              <Button type="button" variant="outline" className="font-bold tracking-wider mb-10">
                <Link to="/">Voltar para a página de início</Link>
              </Button>
            </div>
            <Image
              src={notFoundImage}
              alt="Not Found"
              width={500}
              height={500}
              className="w-full sm:block order-first sm:order-last"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
