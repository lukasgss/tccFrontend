import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Tooltip } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormMessage, { FormNotification } from "../../../components/Common/Errors/FormMessage";
import InputCheckbox from "../../../components/Common/Inputs/InputCheckbox";
import InputPhone from "../../../components/Common/Inputs/InputPhone";
import InputText from "../../../components/Common/Inputs/InputText";
import Loading from "../../../components/Common/Loading/Loading";
import { UserData } from "../../../services/requests/User/types";
import { UpdateUserData } from "../../../services/requests/User/UserService";
import getErrorMessage from "../../../utils/errorHandler";
import EditImageButton from "./EditImageButton";
import { editSettingsFormSchema, EditSettingsFormValues } from "./formSchema";

interface EditSettingsFormPageProps {
  userData: UserData;
  isLoading: boolean;
}

export default function EditSettingsFormPage({ userData, isLoading }: Readonly<EditSettingsFormPageProps>) {
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<EditSettingsFormValues>({
    mode: "onBlur",
    defaultValues: {
      onlyWhatsAppMessages: false,
    },
    resolver: zodResolver(editSettingsFormSchema),
  });

  const [submissionMessage, setSubmissionForm] = useState<FormNotification | null>(null);

  const { mutateAsync: editUserAsync, isPending } = useMutation({
    mutationFn: (formData: FormData) => UpdateUserData(userData.id, formData),
    onSuccess: () => {
      setSubmissionForm({ type: "success", message: "Dados atualizados com sucesso!" });
    },
    onError: (e) => {
      const errorMessage = getErrorMessage(e) ?? "Não foi possível atualizar os dados da conta.";
      setSubmissionForm({ type: "error", message: errorMessage });
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("fullName", values.fullName);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("onlyWhatsAppMessages", values.onlyWhatsAppMessages.toString());
    formData.append("existingImage", values.existingImage ?? "");

    if (values.image && values.image instanceof FileList) {
      formData.append("image", values.image[0]);
    }

    await editUserAsync(formData);
  });

  const imageValue = watch("image");

  useEffect(() => {
    reset({
      fullName: userData?.fullName,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      onlyWhatsAppMessages: userData?.onlyWhatsAppMessages,
      existingImage: userData?.image,
    });
  }, [
    userData?.fullName,
    userData?.email,
    userData?.phoneNumber,
    userData?.onlyWhatsAppMessages,
    userData?.image,
    reset,
  ]);

  useEffect(() => {
    if (imageValue?.[0]) {
      setImage(URL.createObjectURL(imageValue[0]));
    }
  }, [imageValue]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {isLoading ? (
        <Loading title="Carregando dados da conta..." className="mt-8" />
      ) : (
        <>
          {submissionMessage && (
            <div className="mt-5">
              <FormMessage
                message={submissionMessage.message}
                closeMessage={() => setSubmissionForm(null)}
                type={submissionMessage.type}
              />
            </div>
          )}

          <div className="relative w-fit mx-auto">
            <Image
              src={image ?? userData.image}
              alt="Imagem de perfil"
              className="rounded-full mt-2 w-40 h-40 mx-auto [clip-path:circle()]"
            />
            <EditImageButton register={register} />
          </div>

          <InputText
            register={register}
            placeholder="Seu nome"
            label="Nome"
            name="fullName"
            required
            error={errors.fullName}
          />

          <InputPhone control={control} name="phoneNumber" error={errors.phoneNumber} label="Celular" required />

          <InputCheckbox
            control={control}
            name="onlyWhatsAppMessages"
            infoText="Será exibido na plataforma que deseja receber apenas mensagens via WhatsApp de outros usuários."
            label="Desejo receber apenas mensagens via WhatsApp de outros usuários"
          />

          <Tooltip label="Não é possível editar o e-mail da sua conta" position="top-start">
            <div>
              <InputText
                register={register}
                placeholder="email@email.com"
                label="E-mail"
                name="email"
                required
                disabled
                error={errors.email}
              />
            </div>
          </Tooltip>

          <div className="flex flex-col-reverse gap-2.5 md:flex-row md:gap-5 justify-end w-full">
            <Button variant="outline" onClick={() => navigate("/")}>
              Voltar
            </Button>
            <Button type="submit" loading={isPending}>
              Salvar
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
