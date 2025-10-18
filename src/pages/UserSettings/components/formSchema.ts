import { z } from "zod";
import { requiredFormFieldErrorMessage } from "../../../constants/applicationConstants";

export const MAX_FILE_SIZE = 5 * 1024 ** 2;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const editSettingsFormSchema = z.object({
  fullName: z
    .string({ required_error: requiredFormFieldErrorMessage })
    .min(1, { message: requiredFormFieldErrorMessage }),
  email: z.string({ required_error: requiredFormFieldErrorMessage }).min(1, { message: requiredFormFieldErrorMessage }),
  phoneNumber: z
    .string({ required_error: requiredFormFieldErrorMessage })
    .min(1, { message: requiredFormFieldErrorMessage }),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Tamanho máximo de arquivo é de 5MB.`)
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type ?? ""),
      "Apenas arquivos jpg, png e webp são aceitos.",
    )
    .optional(),
  existingImage: z.string().optional(),
  onlyWhatsAppMessages: z.boolean(),
});

export type EditSettingsFormValues = z.infer<typeof editSettingsFormSchema>;
