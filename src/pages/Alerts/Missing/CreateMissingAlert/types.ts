import { z } from "zod";

export const MAX_FILE_SIZE = 5000000; // 5MB

export const missingAlertDataSchema = z.object({
	name: z.string({ message: "Nome é obrigatório" }).min(1, "Nome é obrigatório"),
	gender: z.string({ message: "Sexo é obrigatório" }).min(1, "Sexo é obrigatório"),
	age: z.string({ message: "Idade é obrigatória" }).min(1, "Idade é obrigatória"),
	colors: z.array(z.string({ message: "Cor é obrigatória" })).min(1, "Selecione pelo menos uma cor"),
	size: z.string({ message: "Porte é obrigatório" }).min(1, "Porte é obrigatório"),
	species: z.string({ message: "Espécie é obrigatória" }).min(1, "Espécie é obrigatória"),
	breed: z.string({ message: "Raça é obrigatória" }).min(1, "Raça é obrigatória"),
	missingDescription: z
		.string({ message: "Descrição inválida" })
		.max(2000, { message: "Máximo de 2000 caracteres permitidos." })
		.optional()
		.nullable(),
	images: z.array(z.instanceof(File, { message: "Arquivo inválido" })).min(1, "Adicione pelo menos uma imagem"),
	isCastrated: z.string({ message: "Campo inválido" }).nullable(),
	isVaccinated: z.string({ message: "Campo inválido" }).nullable(),
	isNegativeToFivFelv: z.string({ message: "Campo inválido" }).nullable(),
	isNegativeToLeishmaniasis: z.string({ message: "Campo inválido" }).nullable(),
	state: z.string({ message: "Estado é obrigatório" }).min(1, "Estado é obrigatório"),
	city: z.string({ message: "Cidade é obrigatória" }).min(1, "Cidade é obrigatória"),
	neighborhood: z.string({ message: "Bairro é obrigatório" }).min(1, "Bairro é obrigatório"),
});

export type MissingAlertSchemaFormData = z.infer<typeof missingAlertDataSchema>;
