import { Button, Modal, Title } from "@mantine/core";

import alertImage from "../../../assets/images/alert.svg";

export interface ModalLocationNotFoundProps {
  opened: boolean;
  title: string;
  subtitle?: React.ReactElement;
  buttonText: string;
  secondaryButtonText?: string;
  loading: boolean;
  onClickButton: () => void;
  onClickSecondaryButton?: () => void;
  onClose: () => void;
}

export default function ModalLocationNotFound({
  opened,
  title,
  subtitle,
  buttonText,
  secondaryButtonText,
  loading,
  onClose,
  onClickSecondaryButton,
  onClickButton,
}: Readonly<ModalLocationNotFoundProps>) {
  return (
    <Modal opened={opened} onClose={onClose} centered size="lg" zIndex={999999999}>
      <div className="flex flex-col items-center gap-5 justify-center px-5">
        <img src={alertImage} alt="Imagem de alerta" className="w-24 md:w-36" />
        <Title order={2} className="text-center text-[24px] md:text-[26px]">
          {title}
        </Title>
        {subtitle}
        <div className="flex flex-col gap-1">
          <Button type="button" onClick={onClickButton} className="uppercase tracking-widest mb-2" loading={loading}>
            {buttonText}
          </Button>
          {secondaryButtonText ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => onClickSecondaryButton?.()}
              className="uppercase tracking-widest mb-2"
            >
              {secondaryButtonText}
            </Button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
