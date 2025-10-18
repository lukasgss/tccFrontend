import Header from "../../components/Headers/Header/Header";
import HomeContent from "./components/HomeContent";
import RecentlyViewedAlerts from "./components/RecentlyViewedAlerts";
import SuggestedAdoptionAlerts from "./components/SuggestedAdoptionAlerts";

export default function Home() {
  return (
    <div className="flex relative">
      <main className="h-screen w-full bg-[var(--base-bg-color)]">
        <Header />
        <HomeContent />
        <SuggestedAdoptionAlerts />
        <RecentlyViewedAlerts />
      </main>
    </div>
  );
}
