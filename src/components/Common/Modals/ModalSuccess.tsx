import { Button, Modal, Text, Title } from "@mantine/core";

import successImage from "../../../assets/images/success.webp";

export interface ModalSuccessProps {
  opened: boolean;
  title: string;
  subtitle?: React.ReactElement;
  buttonText: string;
  onClickButton: () => void;
  onClose: () => void;
}

export default function ModalSuccess({
  opened,
  title,
  subtitle,
  buttonText,
  onClose,
  onClickButton,
}: Readonly<ModalSuccessProps>) {
  return (
    <Modal opened={opened} onClose={onClose} centered size="lg">
      <div className="flex flex-col items-center gap-5 justify-center px-5">
        <img src={successImage} alt="Imagem de sucesso" className="w-44" />
        <Title order={2}>{title}</Title>
        <Text className="text-center">{subtitle}</Text>
        <Button type="button" onClick={onClickButton} className="uppercase tracking-widest mb-2">
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
}
