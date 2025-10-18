import { Button, Tooltip } from "@mantine/core";
import { ArrowBendUpLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Tooltip label="Voltar">
      <Button
        type="button"
        variant="light"
        onClick={handleBack}
        className="w-fit p-1 absolute top-3 left-3"
        aria-label="Voltar à pagina de ínicio"
      >
        <ArrowBendUpLeft size={24} />
      </Button>
    </Tooltip>
  );
}
