import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";
import HomeContent from "./components/HomeContent";
import RecentlyViewedAlerts from "./components/RecentlyViewedAlerts";
import SuggestedAdoptionAlerts from "./components/SuggestedAdoptionAlerts";

export default function Home() {
  return (
    <div className="flex relative">
      <MetaTags
        title="Início | AcheMeuPet"
        description="Plataforma completa para ajudar na adoção de animais, busca por pets perdidos e resgate de animais de rua. Conectamos corações e patas em todo o Brasil."
        keywords="adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <main className="h-screen w-full bg-[var(--base-bg-color)]">
        <Header />
        <HomeContent />
        <SuggestedAdoptionAlerts />
        <RecentlyViewedAlerts />
        <Footer />
      </main>

      <ConversationsSidebar />
    </div>
  );
}
