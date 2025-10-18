import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormMessage, { FormNotification } from "../../../../components/Common/Errors/FormMessage";
import { ApiError } from "../../../../components/Common/Errors/types";
import InputPassword from "../../../../components/Common/Inputs/InputPassword";
import { requiredFormFieldErrorMessage } from "../../../../constants/applicationConstants";
import { ChangeUserPassword } from "../../../../services/requests/User/UserService";
import { UpdateUserPassword } from "../../../../services/requests/User/types";

const redefinePasswordSchema = z
  .object({
    currentPassword: z.string({ required_error: requiredFormFieldErrorMessage }),
    newPassword: z
      .string({ required_error: requiredFormFieldErrorMessage })
      .min(6, "Senha deve possuir no mínimo 6 caracteres.")
      .max(255, `Senha deve ter no máximo 255 caracteres.`),
    confirmNewPassword: z
      .string({ required_error: requiredFormFieldErrorMessage })
      .min(6, "Senha deve possuir no mínimo 6 caracteres.")
      .max(255, `Confirmar senha deve ter no máximo 255 caracteres.`),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Senhas não coincidem.",
        path: ["confirmNewPassword"],
      });
    }
  });

type RedefinePasswordFormData = z.infer<typeof redefinePasswordSchema>;

export default function SecurityTab() {
  const [changePasswordMessage, setChangePasswordMessage] = useState<FormNotification | null>(null);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<RedefinePasswordFormData>({
    resolver: zodResolver(redefinePasswordSchema),
  });

  const { mutateAsync: changePassword, isPending } = useMutation({
    mutationFn: (values: UpdateUserPassword) => ChangeUserPassword(values),
    onSuccess: () => {
      setChangePasswordMessage({ message: "Senha alterada com sucesso!", type: "success" });
      reset();
    },
    onError: (e) => {
      const err = e as AxiosError<ApiError>;
      setChangePasswordMessage({
        message: err.response?.data.message ?? "Não foi possível alterar a senha, tente novamente mais tarde.",
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await changePassword(values);
  });

  return (
    <>
      <Title order={2}>Redefinir senha</Title>
      <Text className="mt-3">
        Digite sua senha atual juntamente com a nova senha que deseja utilizar para alterar a senha.
      </Text>

      {changePasswordMessage && (
        <div className="mt-4">
          <FormMessage
            message={changePasswordMessage.message}
            closeMessage={() => setChangePasswordMessage(null)}
            type={changePasswordMessage.type}
          />
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-3">
        <InputPassword
          register={register}
          name="currentPassword"
          error={errors.currentPassword}
          required
          label="Senha atual"
          placeholder="Sua senha atual"
        />

        <InputPassword
          register={register}
          name="newPassword"
          error={errors.newPassword}
          required
          label="Nova senha"
          placeholder="Sua nova senha"
        />
        <InputPassword
          register={register}
          name="confirmNewPassword"
          error={errors.confirmNewPassword}
          required
          label="Confirmar nova senha"
          placeholder="Confirmar nova senha"
        />

        <div className="flex justify-end">
          <Button type="submit" loading={isPending} className="mt-2">
            Alterar senha
          </Button>
        </div>
      </form>
    </>
  );
}
