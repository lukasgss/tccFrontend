import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import FormMessage, { FormNotification } from "../../components/Common/Errors/FormMessage";
import InputPassword from "../../components/Common/Inputs/InputPassword";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";
import { requiredFormFieldErrorMessage } from "../../constants/applicationConstants";
import { RedefineUserPassword } from "../../services/requests/User/UserService";
import { ResetPasswordRequest } from "../../services/requests/User/types";

const redefinePasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: requiredFormFieldErrorMessage })
      .min(6, "Senha deve possuir no mínimo 6 caracteres.")
      .max(255, `Confirmar senha deve ter no máximo 255 caracteres.`),
    confirmNewPassword: z.string({ required_error: requiredFormFieldErrorMessage }),
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

type RedefinePasswordSchemaData = z.infer<typeof redefinePasswordSchema>;

export default function RedefinePassword() {
  const [redefiningPasswordMessage, setRedefiningPasswordMessage] = useState<FormNotification | null>(null);

  const [searchParams] = useSearchParams();
  const resetCode = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  if (!resetCode || !email) {
    navigate("/");
  }

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<RedefinePasswordSchemaData>({
    mode: "onBlur",
    resolver: zodResolver(redefinePasswordSchema),
  });

  const { mutateAsync: resetUserPassword, isPending } = useMutation({
    mutationFn: (resetPasswordData: ResetPasswordRequest) => RedefineUserPassword(resetPasswordData),
    onSuccess: () => {
      setRedefiningPasswordMessage({ type: "success", message: "Senha redefinida com sucesso!" });
      reset();
    },
    onError: () =>
      setRedefiningPasswordMessage({
        type: "error",
        message: "Não foi possível redefinir a senha, tente novamente mais tarde.",
      }),
  });

  const formatToken = (token: string) => token.replaceAll(" ", "+");

  const onSubmit = handleSubmit(async (values) => {
    await resetUserPassword({
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
      email: email!,
      resetCode: formatToken(resetCode!),
    });
  });

  return (
    <>
      <MetaTags
        title="Redefinir senha | AcheMeuPet"
        description="Recupere o acesso à sua conta AcheMeuPet de forma rápida e segura. Sua conta está a apenas alguns cliques de distância!"
        keywords="redefinir senha, redefinir minha senha, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />
      <main>
        <div className="flex flex-col gap-3 bg-white rounded shadow w-4/5 xl:w-1/2 mx-auto p-8 mt-20">
          <Title>Criar nova senha</Title>
          <Text>Estabeleça a nova senha pra sua conta</Text>

          {redefiningPasswordMessage && (
            <FormMessage
              type={redefiningPasswordMessage.type}
              message={redefiningPasswordMessage.message}
              closeMessage={() => setRedefiningPasswordMessage(null)}
            />
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <InputPassword
              name="newPassword"
              required
              register={register}
              placeholder="Sua senha"
              label="Nova senha"
              error={errors.newPassword}
            />
            <InputPassword
              name="confirmNewPassword"
              required
              register={register}
              placeholder="Sua senha"
              label="Nova senha"
              error={errors.confirmNewPassword}
            />

            <div className="flex justify-end">
              <Button type="submit" loading={isPending}>
                Redefinir senha
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
