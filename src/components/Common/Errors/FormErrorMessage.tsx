import { Tooltip } from "@mantine/core";
import { XCircle } from "@phosphor-icons/react";
import { IconX } from "@tabler/icons-react";
import { defaultFormErrorMessage } from "../../../constants/applicationConstants";

type FormErrorMessageProps = {
  message?: string;
  closeErrorMessage: () => void;
};

export default function FormErrorMessage({ message, closeErrorMessage }: Readonly<FormErrorMessageProps>) {
  return (
    <div className="relative bg-[#fef2f2] p-3 rounded-md border border-[rgba(255,129,130,0.9)] mb-4">
      <div className="flex gap-3 items-center">
        <div className="mb-1">
          <XCircle size={20} weight="fill" className="text-[#f87171]" />
        </div>
        <span className="text-sm font-bold text-[#991B1B] mr-7 inline-block">{message || defaultFormErrorMessage}</span>
      </div>
      <button type="button" onClick={closeErrorMessage} className="absolute right-3 top-4">
        <Tooltip label="Fechar mensagem" position="top">
          <IconX className="w-4 h-4 text-[var(--mantine-color-red-9)] hover:opacity-80" />
        </Tooltip>
      </button>
    </div>
  );
}
