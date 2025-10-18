import { IconAlertCircleFilled } from "@tabler/icons-react";

interface OnlyWhatsAppMessagesAlertProps {
  fullName: string;
}

export default function OnlyWhatsAppMessagesAlert({ fullName }: Readonly<OnlyWhatsAppMessagesAlertProps>) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-full relative p-3 rounded-md mb-3 h-fit bg-[#fefce8] border border-[#f5a623]">
        <div className="flex gap-3 items-center">
          <div className="mb-1">
            <IconAlertCircleFilled size={24} className="text-[#facc15]" />
          </div>
          <span className="text-sm mr-7 inline-block font-bold" style={{ color: "rgb(202, 138, 4)" }}>
            {fullName} gostaria de receber apenas mensagens via WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}
