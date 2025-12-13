import { z } from "zod";
import { requiredFormFieldErrorMessage } from "../../../../constants/applicationConstants";

export const MAX_FILE_SIZE = 5 * 1024 ** 2;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const foundAnimalAlertSchema = z.object({
  name: z.string().optional(),
  images: z
    .custom<File[] | undefined>()
    .refine((file) => file !== null && file !== undefined, requiredFormFieldErrorMessage)
    .refine((file) => file?.every((f) => f.size <= MAX_FILE_SIZE), `Tamanho máximo de arquivo é de 5MB.`)
    .refine(
      (files) => files?.every((file) => typeof file !== "string" && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas arquivos jpg, png e webp são aceitos.",
    ),
  existingImages: z.array(z.string().url()).optional(),
  gender: z.string().nullable().optional(),
  age: z.string({ message: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  colors: z.string({ message: requiredFormFieldErrorMessage }).array().nonempty({
    message: requiredFormFieldErrorMessage,
  }),
  breed: z.string().nullable().optional(),
  species: z
    .string({ message: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  size: z
    .string({ message: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  description: z.string().max(1000, { message: "Máximo de 1000 caracteres permitidos." }).optional(),
  state: z
    .string({ message: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  neighborhood: z.string({ message: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  city: z
    .string({ message: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
});

export type FoundAnimalAlertSchemaFormData = z.infer<typeof foundAnimalAlertSchema>;
