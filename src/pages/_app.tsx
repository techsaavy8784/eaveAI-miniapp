import {
  SDKProvider,
  retrieveLaunchParams,
  useBackButton,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  isSSR,
  useLaunchParams,
} from "@tma.js/sdk-react";
import { type FC, useEffect, useMemo } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useRouter as useNavigationRouter } from "next/navigation";

import { useTelegramMock } from "@/hooks/useTelegramMock";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import "./global.css";
import apiClient from "@/libs/api";

async function setTelegramCookies(
  telegram_entity_id: number,
  telegram_username: string
): Promise<void> {
  await apiClient.post("/set-telegram-cookies", {
    telegram_entity_id: telegram_entity_id,
    telegram_username: telegram_username,
  });
}

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const BackButtonManipulator: FC = () => {
  const router = useRouter();
  const { back } = useNavigationRouter();
  const bb = useBackButton(true);

  useEffect(() => {
    if (!bb) {
      return;
    }
    if (router.pathname === "/") {
      bb.hide();
    } else {
      bb.show();
    }
  }, [router, bb]);

  useEffect(() => {
    return bb && bb.on("click", back);
  }, [bb, back]);

  return null;
};

const App: FC<AppProps> = ({ pageProps, Component }) => {
  const miniApp = useMiniApp(true);
  const themeParams = useThemeParams(true);
  const viewport = useViewport(true);
  const lp = useLaunchParams(true);

  useEffect(() => {
    if (miniApp && themeParams) {
      return bindMiniAppCSSVars(miniApp, themeParams);
    }
  }, [miniApp, themeParams]);

  useEffect(() => {
    if (themeParams) {
      return bindThemeParamsCSSVars(themeParams);
    }
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      return bindViewportCSSVars(viewport);
    }
  }, [viewport]);

  useEffect(() => {
    const telegram_entity_id = lp?.initData?.user?.id;
    const telegram_username = lp?.initData?.user?.username;
    if (telegram_entity_id && telegram_username) {
      setTelegramCookies(telegram_entity_id, telegram_username);
    }
  }, [lp]);

  useEffect(() => {
    return viewport?.expand() && bindViewportCSSVars(viewport);
  }, [viewport]);

  if (!viewport?.isExpanded) {
    viewport?.expand();
  }

  return (
    <>
      <BackButtonManipulator />
      <Component {...pageProps} />
    </>
  );
};

const Inner: FC<AppProps> = (props) => {
  // Mock Telegram environment in development mode.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const debug = useMemo(() => {
    return isSSR() ? false : retrieveLaunchParams().startParam === "debug";
  }, []);
  const manifestUrl = useMemo(() => {
    return isSSR()
      ? ""
      : new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App {...props} />
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export default function CustomApp(props: AppProps) {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Inner {...props} />
    </ErrorBoundary>
  );
}
