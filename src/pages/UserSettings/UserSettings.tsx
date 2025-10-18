import { useState } from "react";
import Header from "../../components/Headers/Header/Header";
import UserTabs, { Tab } from "./components/UserTabs";
import PreferencesTab from "./components/tabs/PreferencesTab";
import RedefinePassword from "./components/tabs/RedefinePasswordTab";
import SettingsTab from "./components/tabs/SettingsTab";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("settings");

  return (
    <main className="relative">
      <Header />

      <div
        className="flex flex-col lg:flex-row items-center lg:items-start lg:px-4 
          xl:px-36 gap-5 lg:gap-10 w-full mt-10"
      >
        <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div
          className="bg-white p-8 shadow-md rounded mx-auto w-[350px] lg:mx-0 sm:w-[500px] 
            md:w-[600px] lg:w-[700px] xl:w-[800px] mb-5"
        >
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "redefinePassword" && <RedefinePassword />}
          {activeTab === "preferences" && <PreferencesTab />}
        </div>
      </div>
    </main>
  );
}
