import { Button } from "@mantine/core";
import { IconBrandFacebook } from "@tabler/icons-react";
import FacebookLogin, { SuccessResponse } from "@greatsumini/react-facebook-login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { defaultNetworkErrorMessage } from "../../../constants/applicationConstants";

type FacebookButtonProps = {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function FacebookButton({ setErrorMessage }: FacebookButtonProps) {
  const { handleExternalAuth } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: handleExternalAuth,
    onError: (error: AxiosError) => {
      if (error.code === "ERR_NETWORK") {
        setErrorMessage(defaultNetworkErrorMessage);
      } else {
        setErrorMessage(error.message);
      }
    },
  });

  const facebookAuthenticate = useCallback(
    async (facebookData: SuccessResponse) => {
      if (!facebookData.accessToken) {
        return;
      }
      await mutation.mutateAsync({ provider: "FACEBOOK", idToken: facebookData.accessToken });
    },
    [mutation],
  );

  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      onSuccess={facebookAuthenticate}
      render={({ onClick }) => (
        <Button
          loading={mutation.isPending}
          className={`${mutation.isPending && "cursor-not-allowed"}`}
          onClick={onClick}
          leftSection={<IconBrandFacebook style={{ width: "1rem", height: "1rem" }} color="#00ACEE" />}
          variant="default"
          radius="xl"
          fullWidth
        >
          Facebook
        </Button>
      )}
    />
  );
}
