import { zodResolver } from "@hookform/resolvers/zod";
import { Anchor, Button, Divider, Paper, PaperProps, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import FormErrorMessage from "../../components/Common/Errors/FormErrorMessage";
import InputPassword from "../../components/Common/Inputs/InputPassword";
import InputText from "../../components/Common/Inputs/InputText";
import Header from "../../components/Headers/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginFormData } from "../../services/requests/User/types";

export default function Login(props: PaperProps) {
  const { handleLogin } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().email("E-mail inválido.").min(1, "Obrigatório"),
    password: z.string().min(1, "Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: handleLogin,
    onError: (err) => {
      setErrorMessage(err.message ?? "Erro interno no sistema, tente novamente mais tarde.");
      reset({ password: "" });
    },
  });

  const onSubmit = handleSubmit(async (loginData: LoginFormData) => {
    await mutation.mutateAsync(loginData);
  });

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-70px)] md:h-[calc(100vh-60px)] flex justify-center items-center bg-[var(--base-bg-color)] mb-8">
        <main className="w-full mx-3 sm:mx-8 max-w-[500px] border-2 border-gray-200 rounded-lg">
          <Paper radius="md" p="xl" {...props} shadow="xl">
            <Text size="lg" fw={500}>
              Bem-vindo de volta ao <span className="font-semibold">AcheMeuPet</span>
              {/* , faça login com: */}
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
                  name="email"
                  register={register}
                  error={errors.email}
                  required
                  label="E-mail"
                  placeholder="email@email.com"
                />

                <InputPassword
                  name="password"
                  register={register}
                  error={errors.password}
                  required
                  label="Senha"
                  placeholder="Sua senha"
                  showForgotPassword
                />
              </Stack>

              <div className="flex flex-col my-5 gap-4 justify-between md:flex-row">
                <Link to="/registrar" className="h-fit">
                  <Anchor component="span" c="dimmed" size="sm">
                    Não possui uma conta? Registrar
                  </Anchor>
                </Link>
                <Button
                  type="submit"
                  loading={mutation.isPending}
                  radius="xl"
                  variant="filled"
                  className={`md:w-fit w-full px-6 ${mutation.isPending ? "cursor-wait" : ""}`}
                >
                  Login
                </Button>
              </div>
            </form>
          </Paper>
        </main>
      </div>
    </>
  );
}
