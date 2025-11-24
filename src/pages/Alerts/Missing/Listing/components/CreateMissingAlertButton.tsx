import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";

export default function CreateMissingAlertButton() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (isAuthenticated) {
      return navigate("/perdidos/novo");
    }

    return navigate("/login");
  };

  return (
    <Button
      leftSection={<IconPlus size={16} />}
      onClick={handleOnClick}
      className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-hover)]"
    >
      Criar Alerta
    </Button>
  );
}
