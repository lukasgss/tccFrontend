import { Button } from "@mantine/core";
import { IconFingerprint, IconPaw, IconUserCog } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

export type Tab = "settings" | "redefinePassword" | "preferences";

interface SettingsTabsProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

export default function UserTabs({ activeTab, setActiveTab }: Readonly<SettingsTabsProps>) {
  return (
    <div
      className="flex flex-col justify-center gap-2.5 w-full max-w-48 bg-white px-4 pt-3 pb-3 
        lg:py-5 rounded shadow"
    >
      <Button
        type="button"
        leftSection={<IconUserCog size={22} />}
        variant={activeTab === "settings" ? "filled" : "outline"}
        onClick={() => setActiveTab("settings")}
      >
        Configurações
      </Button>
      <Button
        type="button"
        leftSection={<IconFingerprint size={22} />}
        variant={activeTab === "redefinePassword" ? "filled" : "outline"}
        onClick={() => setActiveTab("redefinePassword")}
      >
        Segurança
      </Button>
      <Button
        type="button"
        leftSection={<IconPaw size={22} />}
        variant={activeTab === "preferences" ? "filled" : "outline"}
        onClick={() => setActiveTab("preferences")}
      >
        Preferências
      </Button>
    </div>
  );
}
