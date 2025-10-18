import { UseFormRegister } from "react-hook-form";
import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { EditSettingsFormValues } from "./formSchema";

interface EditImageButtonProps {
  register: UseFormRegister<EditSettingsFormValues>;
}

export default function EditImageButton({ register }: Readonly<EditImageButtonProps>) {
  return (
    <div className="w-fit absolute bottom-0 right-3 rounded-full">
      <ActionIcon size="lg" className="rounded-full" onClick={() => document.getElementById("file-input")?.click()}>
        <IconPencil size={22} />
      </ActionIcon>
      <input type="file" id="file-input" {...register("image")} className="hidden" />
    </div>
  );
}
