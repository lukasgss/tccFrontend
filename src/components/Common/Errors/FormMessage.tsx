import { Tooltip } from "@mantine/core";
import { CheckCircle, Warning, XCircle } from "@phosphor-icons/react";
import { IconX } from "@tabler/icons-react";
import { defaultFormErrorMessage } from "../../../constants/applicationConstants";
import { customClassNameFormatter } from "../../../utils/formatters";

export interface FormNotification {
  message: string;
  type: "error" | "success";
}

interface FormMessageProps {
  type: "success" | "error" | "warning";
  message: string | React.ReactNode;
  className?: string;
  icon?: boolean;
  closeMessage?: () => void;
}

const colors = {
  error: {
    background: "#fef2f2",
    border: "rgba(255,129,130,0.9)",
    textColor: "rgb(153 27 27)",
    icon: <XCircle size={24} weight="fill" className="text-[#f87171]" />,
  },
  success: {
    textColor: "rgb(22 101 52)",
    background: "#f0fdf4",
    border: "#67c067",
    icon: <CheckCircle size={24} weight="fill" className="text-[#4ade80]" />,
  },
  warning: {
    background: "#fefce8",
    border: "#f5a623",
    textColor: "rgb(202 138 4)",
    icon: <Warning size={24} weight="fill" className="text-[#facc15]" />,
  },
} as const;

export default function FormMessage({
  type,
  message,
  className,
  icon = true,
  closeMessage,
}: Readonly<FormMessageProps>) {
  return (
    <div
      className={`relative p-3 rounded-md border mb-4 h-fit ${customClassNameFormatter(className)}`}
      style={{ borderColor: colors[type].border, backgroundColor: colors[type].background }}
    >
      <div className="flex gap-3 items-center">
        {icon && <div className="mb-1">{colors[type].icon}</div>}
        <span className="text-sm mr-7 inline-block font-bold" style={{ color: colors[type].textColor }}>
          {message || defaultFormErrorMessage}
        </span>
      </div>
      {closeMessage && (
        <button type="button" onClick={closeMessage} className="absolute right-3 top-4">
          <Tooltip label="Fechar mensagem" position="top">
            <IconX className={`w-4 h-4 `} style={{ color: colors[type].textColor }} />
          </Tooltip>
        </button>
      )}
    </div>
  );
}
