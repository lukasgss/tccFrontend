import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactGA from "react-ga4";
import AppRoutes from "./routes/routes";
import theme from "./theme/theme";

import "@mantine/notifications/styles.css";

import "./index.scss";

function App() {
  const appTheme = createTheme(theme);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  ReactGA.initialize("G-YZ2P2WHD99");

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme="light" forceColorScheme="light" theme={appTheme}>
          <GoogleOAuthProvider clientId={clientId}>
            <AppRoutes />
          </GoogleOAuthProvider>
          <Notifications position="top-right" zIndex={999999} />
        </MantineProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
