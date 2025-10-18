import { Divider, Image, Text } from "@mantine/core";
import { IconBrandInstagram, IconBrandTiktok, IconBrandX } from "@tabler/icons-react";
import logoImage from "../../assets/images/white-ache-meu-pet-logo.webp";
import FooterLink from "./components/FooterLink";
import FooterTitle from "./components/FooterTitle";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111618] pt-8 pb-24 md:pb-14 px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6 px-8">
        <div className="flex flex-col gap-3 justify-center">
          <Image src={logoImage} alt="Logo" className="w-36" />
          <Text c="white" className="md:max-w-[50%] text-sm">
            Conectamos corações e patas em todo o Brasil
          </Text>
        </div>

        <div className="flex flex-col gap-3">
          <FooterTitle title="Páginas" />
          <FooterLink to="/" label="Início" />
          <FooterLink to="/adocoes" label="Animais para adoção" />
          <FooterLink to="/perdidos" label="Animais perdidos" />
          <FooterLink to="/encontrados" label="Animais encontrados" />
        </div>

        <div className="flex flex-col gap-3">
          <FooterTitle title="Sobre a plataforma" />
          <FooterLink to="/sobre" label="Sobre o AcheMeuPet" />
          <FooterLink to="/adocao-responsavel" label="Adoção responsável" />
          <FooterLink to="/adocoes/como-adotar" label="Como adotar pela plataforma" />
          <FooterLink to="/termos-de-uso-e-politica-de-privacidade" label="Termos de uso e política de privacidade" />
        </div>

        <div className="flex flex-col gap-3">
          <FooterTitle title="Contato" />
          <FooterLink to="/faq" label="Perguntas frequentes" />
          <FooterLink to="/contato" label="Entre em contato" />
        </div>
      </div>

      <Divider my="xl" color="#565656" />

      <div className="w-fit mx-auto grid grid-cols-3 gap-4 justify-items-center">
        <a
          href="https://www.instagram.com/achemeupet.com.br"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center"
          aria-label="AcheMeuPet no Instagram"
        >
          <div className="p-1.5 border border-white rounded-full group hover:bg-white">
            <IconBrandInstagram className="text-white group-hover:text-black w-6 h-6" />
          </div>
        </a>
        <a
          href="https://www.tiktok.com/@achemeupet"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center"
          aria-label="AcheMeuPet no TikTok"
        >
          <div className="p-1.5 border border-white rounded-full group hover:bg-white">
            <IconBrandTiktok className="text-white group-hover:text-black w-6 h-6" />
          </div>
        </a>
        <a
          href="https://x.com/Achemeupet"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center"
          aria-label="AcheMeuPet no X"
        >
          <div className="p-1.5 border border-white rounded-full group hover:bg-white">
            <IconBrandX className="text-white group-hover:text-black w-6 h-6" />
          </div>
        </a>
      </div>

      <div className="flex justify-center mt-5">
        <Text c="white" className="text-center">
          Copyright &copy; AcheMeuPet {new Date().getFullYear()}. Todos os direitos reservados.
        </Text>
      </div>
    </footer>
  );
}
