import { z } from "zod";
import { requiredFormFieldErrorMessage } from "../../../../constants/applicationConstants";

export const MAX_FILE_SIZE = 5 * 1024 ** 2;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.spreadsheet",
];

export const alertDataSchema = z.object({
  name: z.string().min(1, requiredFormFieldErrorMessage),
  images: z
    .custom<File[] | undefined>()
    .refine((file) => file !== null && file !== undefined, requiredFormFieldErrorMessage)
    .refine((file) => file?.every((f) => f.size <= MAX_FILE_SIZE), `Tamanho máximo de arquivo é de 5MB.`)
    .refine(
      (files) => files?.every((file) => typeof file !== "string" && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas arquivos jpg, png e webp são aceitos.",
    ),
  existingImages: z.array(z.string().url()).optional(),
  gender: z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  age: z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  colors: z.string({ required_error: requiredFormFieldErrorMessage }).array().nonempty({
    message: requiredFormFieldErrorMessage,
  }),
  isCastrated: z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  isVaccinated: z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  isNegativeToFivFelv: z.union([
    z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
    z.null(),
  ]),
  isNegativeToLeishmaniasis: z.union([
    z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
    z.null(),
  ]),
  breed: z
    .string({ required_error: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  species: z
    .string({ required_error: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  size: z
    .string({ required_error: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  description: z.string().max(1000, { message: "Máximo de 1000 caracteres permitidos." }).optional(),
  state: z
    .string({ required_error: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  neighborhood: z.string({ required_error: requiredFormFieldErrorMessage }).min(1, requiredFormFieldErrorMessage),
  city: z
    .string({ required_error: requiredFormFieldErrorMessage, invalid_type_error: requiredFormFieldErrorMessage })
    .min(1, requiredFormFieldErrorMessage),
  restrictions: z.array(z.string()).optional(),
  adoptionForm: z
    .custom<File | undefined>()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Tamanho máximo de arquivo é de 5MB.`)
    .refine(
      (file) => !file || (typeof file !== "string" && ACCEPTED_FILE_TYPES.includes(file.type)),
      "Apenas arquivos pdf e excel são aceitos.",
    ),
  existingAdoptionFormUrl: z.string().url().optional(),
  existingAdoptionFormFileName: z.string().optional(),
});

export type AlertSchemaFormData = z.infer<typeof alertDataSchema>;
