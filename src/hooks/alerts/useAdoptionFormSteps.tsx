import { IconNotes, IconPaw } from "@tabler/icons-react";
import { Step } from "../../components/Common/FormStepper/FormStepper";

export default function useAdoptionFormSteps(): Step[] {
  return [
    {
      label: "Animal",
      description: "Dados referentes ao animal",
      icon: <IconPaw size={32} />,
    },
    {
      label: "Adoção",
      description: "Dados referentes a adoção",
      icon: <IconNotes size={32} />,
    },
  ];
}
