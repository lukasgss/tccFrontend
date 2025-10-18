import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import FormErrorMessage from "../../components/Common/Errors/FormErrorMessage";
import { ApiError } from "../../components/Common/Errors/types";
import InputText from "../../components/Common/Inputs/InputText";
import Header from "../../components/Headers/Header/Header";
import { requiredFormFieldErrorMessage } from "../../constants/applicationConstants";
import { ForgotPasswordData } from "../../services/requests/User/types";
import { SendForgotPasswordInstructions } from "../../services/requests/User/UserService";
import InstructionsSentToEmail from "./components/InstructionsSentToEmail";

const forgotPasswordSchema = z.object({
  email: z.string({ required_error: requiredFormFieldErrorMessage }).email("E-mail inválido"),
});

type ForgotPasswordSchemaData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [instructionsHaveBeenSent, setInstructionsHaveBeenSent] = useState(false);
  const [sendInstructionsErrorMessage, setSendInstructionsErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutateAsync: sendForgotPasswordInstructions, isPending } = useMutation({
    mutationFn: (forgotPasswordData: ForgotPasswordData) => SendForgotPasswordInstructions(forgotPasswordData),
    onSuccess: () => {
      setInstructionsHaveBeenSent(true);
    },
    onError: (e) => {
      const err = e as AxiosError<ApiError>;
      setSendInstructionsErrorMessage(
        err.response?.data.message ?? "Não foi possível enviar as instruções, tente novamente mais tarde.",
      );
    },
  });

  const handleSendInstructionsClick = async () => {
    const data = {
      email: getValues("email"),
    };

    await sendForgotPasswordInstructions(data);
  };

  const onSubmit = handleSubmit((values: ForgotPasswordSchemaData) => {
    sendForgotPasswordInstructions(values);
  });

  return (
    <main className="min-h-[calc(100vh)]">
      <Header />
      <div className="flex flex-col gap-3 bg-white rounded shadow w-4/5 xl:w-1/2 mx-auto p-8 mt-20">
        {instructionsHaveBeenSent ? (
          <InstructionsSentToEmail sendEmailAgain={handleSendInstructionsClick} loadingSendingEmailAgain={isPending} />
        ) : (
          <>
            <Title order={2}>Redefinir senha</Title>
            <Text>
              Digite o e-mail associado com sua conta que enviaremos um e-mail com instruções para a redefinição da
              senha.
            </Text>

            {sendInstructionsErrorMessage && (
              <FormErrorMessage
                message={sendInstructionsErrorMessage}
                closeErrorMessage={() => setSendInstructionsErrorMessage(null)}
              />
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <InputText
                name="email"
                register={register}
                required
                error={errors.email}
                label="Endereço de e-mail"
                placeholder="email@email.com"
              />

              <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:gap-5 justify-end">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Voltar
                </Button>
                <Button type="submit" loading={isPending}>
                  Enviar instruções
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
