import { zodResolver } from "@hookform/resolvers/zod";
import { Anchor, Button, Divider, Paper, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import FormErrorMessage from "../../components/Common/Errors/FormErrorMessage";
import { ApiError } from "../../components/Common/Errors/types";
import InputCheckbox from "../../components/Common/Inputs/InputCheckbox";
import InputPassword from "../../components/Common/Inputs/InputPassword";
import InputPhone from "../../components/Common/Inputs/InputPhone";
import InputText from "../../components/Common/Inputs/InputText";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";
import { AuthContext } from "../../contexts/AuthContext";
import { RegisterFormData } from "../../services/requests/User/types";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { handleRegistration } = useContext(AuthContext);

  const schema = z
    .object({
      fullName: z
        .string({ required_error: "Obrigatório." })
        .min(1, "Obrigatório.")
        .max(255, `Nome deve ter no máximo 255 caracteres.`),
      email: z
        .string({ required_error: "Obrigatório." })
        .email({ message: "E-mail inválido." })
        .min(1, "Obrigatório.")
        .max(255, `E-mail deve ter no máximo 255 caracteres.`),
      phoneNumber: z.string({ required_error: "Obrigatório." }).min(10, "Obrigatório.").max(15),
      onlyWhatsAppMessages: z.boolean(),
      password: z
        .string({ required_error: "Obrigatório." })
        .min(6, "Senha deve possuir no mínimo 6 caracteres.")
        .max(255, `Senha deve ter no máximo 255 caracteres.`),
      confirmPassword: z
        .string({ required_error: "Obrigatório." })
        .min(6, "Senha deve possuir no mínimo 6 caracteres.")
        .max(255, `Confirmar senha deve ter no máximo 255 caracteres.`),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Senhas não coincidem.",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      onlyWhatsAppMessages: false,
    },
  });

  const mutation = useMutation({
    mutationFn: handleRegistration,
    onError: (err: AxiosError) => {
      const errorData = err.response?.data as ApiError;
      setErrorMessage(errorData.message);
      reset({ password: "", confirmPassword: "" });
    },
  });

  const onSubmit = handleSubmit(async (registerData: RegisterFormData) => {
    await mutation.mutateAsync(registerData);
  });

  return (
    <>
      <MetaTags
        title="Cadastro | AcheMeuPet"
        description="Junte-se à comunidade AcheMeuPet! Crie sua conta e comece a fazer a diferença hoje. Adote, doe, ou ajude animais perdidos. Cada cadastro é um passo para um mundo melhor para os animais."
        keywords="cadastro, cadastro achemeupet, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />
      <div
        className="min-h-[calc(100vh-70px)] md:h-[calc(100vh-60px)] py-6 flex justify-center 
          items-center bg-[var(--base-bg-color)] mb-8"
      >
        <main className="w-full mx-3 sm:mx-8 max-w-[500px] border-2 border-gray-200 rounded-lg">
          <Paper radius="md" p="xl" shadow="xl">
            <Text size="lg" fw={500}>
              Bem-vindo ao <span className="font-semibold">AcheMeuPet</span>
              {/* , faça cadastro com: */}
            </Text>

            {/* <div className="flex flex-col md:flex-row gap-3 justify-center mt-3">
              <GoogleButton setErrorMessage={setErrorMessage} />
              <FacebookButton setErrorMessage={setErrorMessage} />
            </div>

            <Divider label="Ou continue com seu e-mail" labelPosition="center" my="lg" /> */}
            <Divider my="md" />

            {errorMessage !== null && (
              <FormErrorMessage message={errorMessage} closeErrorMessage={() => setErrorMessage(null)} />
            )}

            <form onSubmit={onSubmit} className="mt-2">
              <Stack>
                <InputText
                  register={register}
                  name="fullName"
                  error={errors.fullName}
                  label="Nome"
                  placeholder="Seu nome"
                  required
                />

                <div className="flex flex-col sm:flex-row gap-5">
                  <InputText
                    register={register}
                    name="email"
                    error={errors.email}
                    required
                    label="E-mail"
                    placeholder="email@email.com"
                  />
                  <InputPhone
                    control={control}
                    name="phoneNumber"
                    error={errors.phoneNumber}
                    label="Celular"
                    required
                  />
                </div>

                <InputCheckbox
                  control={control}
                  name="onlyWhatsAppMessages"
                  infoText="Marque a opção caso não deseje receber ligações ou SMS de outros usuários."
                  label="Desejo receber apenas mensagens via WhatsApp de outros usuários"
                />

                <InputPassword
                  register={register}
                  name="password"
                  error={errors.password}
                  required
                  label="Senha"
                  placeholder="Sua senha"
                />
                <InputPassword
                  register={register}
                  name="confirmPassword"
                  error={errors.confirmPassword}
                  required
                  label="Confirmar senha"
                  placeholder="Confirmar senha"
                />
              </Stack>
              <div className="flex flex-col my-5 gap-4 justify-between md:flex-row">
                <Link to="/login" className="h-fit">
                  <Anchor component="span" c="dimmed" size="sm">
                    Já possui uma conta? Fazer login
                  </Anchor>
                </Link>
                <Button
                  loading={mutation.isPending}
                  type="submit"
                  radius="xl"
                  variant="filled"
                  className={`md:w-fit w-full px-6 ${mutation.isPending ? "cursor-wait" : ""}`}
                >
                  Registrar
                </Button>
              </div>
            </form>
          </Paper>
        </main>
      </div>

      <Footer />
    </>
  );
}
