import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";

export default function CreateAlertButton() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Link to={isAuthenticated ? "/adocoes/novo" : "/login"}>
      <Button variant="filled" className="uppercase tracking-wide max-[360px]:w-full">
        Cadastrar adoção &nbsp; <IconPlus size={16} />
      </Button>
    </Link>
  );
}
