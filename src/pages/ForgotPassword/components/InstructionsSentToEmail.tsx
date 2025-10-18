import { Button, Image, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import emailSentImage from "../../../assets/images/emailSentImage.svg";

interface InstructionsSentToEmailProps {
  loadingSendingEmailAgain: boolean;
  sendEmailAgain: () => Promise<void>;
}

const TIME_IN_SECONDS_TO_SEND_EMAIL_AGAIN = 120;

export default function InstructionsSentToEmail({
  loadingSendingEmailAgain,
  sendEmailAgain,
}: Readonly<InstructionsSentToEmailProps>) {
  const [timeInSecondsToSendEmailAgain, setTimeInSecondsToSendEmailAgain] = useState(
    TIME_IN_SECONDS_TO_SEND_EMAIL_AGAIN,
  );

  const handleSendEmailAgain = async () => {
    await sendEmailAgain();
    setTimeInSecondsToSendEmailAgain(TIME_IN_SECONDS_TO_SEND_EMAIL_AGAIN);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeInSecondsToSendEmailAgain > 0) {
        setTimeInSecondsToSendEmailAgain((prevValue) => prevValue - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeInSecondsToSendEmailAgain]);

  return (
    <div className="flex flex-col gap-5 items-center">
      <Image src={emailSentImage} alt="Imagem de e-mail enviado" className="w-[450px]" />
      <Title order={4} className="text-center">
        E-mail com as instruções para redefinição da senha foi enviado!
      </Title>

      <div className="flex flex-col gap-1 items-center">
        <Text fz="h5">E-mail não recebido?</Text>
        <Button
          disabled={timeInSecondsToSendEmailAgain > 0}
          onClick={handleSendEmailAgain}
          loading={loadingSendingEmailAgain}
        >
          Enviar novamente {timeInSecondsToSendEmailAgain > 0 ? `(${timeInSecondsToSendEmailAgain})` : null}
        </Button>
      </div>
    </div>
  );
}
