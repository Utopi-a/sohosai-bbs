import { createTheme, MantineProvider } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "@mantine/core/styles.css";
import "~/styles/globals.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme}>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
