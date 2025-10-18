import { Button, TextInput, Title, UnstyledButton } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { ReportAdoptionAlert } from "../../../services/requests/Alerts/Adoption/adoptionAlertService";
import getErrorMessage from "../../../utils/errorHandler";
import { FormNotification } from "../Errors/FormMessage";

function ReportIcon() {
  return (
    <svg
      className="h-6 w-6 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

interface ReasonButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ReasonButton({ selected, onClick, children }: Readonly<ReasonButtonProps>) {
  return (
    <Button
      variant="default"
      className={`relative w-full ${selected ? "bg-[var(--primary-purple)] !text-white hover:bg-[#a84df3]" : undefined}`}
      onClick={onClick}
    >
      {selected && <IconCheck size={24} className="absolute top-[5px] left-3 text-white" />}
      {children}
    </Button>
  );
}

export type ReportTypes = "violence" | "spam" | "sexual content" | "hate" | "other";

interface ReportContentProps {
  alertId: string;
  setReportMessage: Dispatch<SetStateAction<FormNotification | null>>;
  closeModal: () => void;
}

export default function ReportContent({ alertId, setReportMessage, closeModal }: Readonly<ReportContentProps>) {
  const [selected, setSelected] = useState<ReportTypes | null>(null);
  const [otherReason, setOtherReason] = useState<string>();

  const reportOptions = [
    {
      label: "Violência",
      value: "violence",
    },
    {
      label: "Spam",
      value: "spam",
    },
    {
      label: "Conteúdo sexual",
      value: "sexual content",
    },
    {
      label: "Discurso de ódio",
      value: "hate",
    },
    {
      label: "Venda de animais",
      value: "animal sale",
    },
    {
      label: "Outro",
      value: "other",
    },
  ];

  const reportAlert = async () => {
    const reason = reportOptions.find((option) => option.value === selected);
    if (!reason) {
      return;
    }

    if (reason.value === "other" && otherReason) {
      await ReportAdoptionAlert(alertId, otherReason);
    } else {
      await ReportAdoptionAlert(alertId, reason.label);
    }
  };

  const { mutateAsync: report, isPending: isLoadingReportSubmission } = useMutation({
    mutationFn: reportAlert,
    onSuccess: () => {
      closeModal();
      setReportMessage({ type: "success", message: "Denúncia enviada com sucesso!" });
    },
    onError: (e) => {
      closeModal();
      const errorMsg = getErrorMessage(e);
      setReportMessage({ type: "error", message: errorMsg });
    },
  });

  return (
    <div className="relative transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg pt-4">
      <div className="p-2 pb-4">
        <div className="relative flex items-center justify-start">
          <div
            className="mx-auto absolute p-1 flex flex-shrink-0 items-center justify-center 
          rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <ReportIcon />
          </div>
          <div className="flex-1 flex justify-center text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Title order={4} className="font-semibold leading-6 text-gray-900" id="modal-title">
              Denunciar adoção
            </Title>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <UnstyledButton type="button" aria-label="Fechar modal de denúncia">
          <IconX size={24} onClick={closeModal} className="hover:text-red-500" />
        </UnstyledButton>
      </div>
      <div className="px-4 py-3 flex flex-col gap-3">
        {reportOptions.map((option) => (
          <div key={option.value}>
            <ReasonButton
              selected={selected === option.value}
              onClick={() =>
                setSelected((prevValue) => (prevValue === option.value ? null : (option.value as ReportTypes)))
              }
            >
              {option.label}
            </ReasonButton>
            {option.value === "other" && selected === "other" && (
              <TextInput
                label="Qual?"
                placeholder="Motivo da denúncia"
                className="mt-1"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="ml-auto mt-5 flex gap-2.5 justify-end">
          <Button variant="light" onClick={closeModal}>
            Cancelar
          </Button>
          <Button loading={isLoadingReportSubmission} onClick={() => report()}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
