import { Title } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import useUserDataQuery from "../../../../queries/useUserDataQuery";
import EditSettingsForm from "../EditSettingsForm";

export default function SettingsTab() {
  const { userData, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: userInfo, isPending } = useUserDataQuery(userData?.id ?? null);

  useEffect(() => {
    if ((!isAuthenticated || !userInfo) && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, navigate, userInfo]);

  return (
    <>
      <Title order={2}>Dados da conta</Title>
      <EditSettingsForm userData={userInfo!} isLoading={isPending} />
    </>
  );
}
