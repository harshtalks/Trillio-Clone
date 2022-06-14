import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from "../theme/defaultTheme";
import createEmotionCache from "../utility/emotionCache";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <NextNProgress />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default MyApp;
