"use client";

import React, { type PropsWithChildren, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  postEvent,
  isSSR,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";
// import { BottomNav } from '@/components/BottomNav';
import apiClient from "@/libs/api";
// import  from '@/constants/data';
import { route, Navbar } from "../Navbar";
import "./styles.css";
import { FadeLoader } from "react-spinners";

async function setTelegramCookies(
  telegram_entity_id: number,
  telegram_username: string
): Promise<void> {
  await apiClient.post("/set-telegram-cookies", {
    telegram_entity_id: telegram_entity_id,
    telegram_username: telegram_username,
  });
}

// Utility function to determine if the path is a main page
function isMainPage(pathname: string): boolean {
  return route.some((item) => item.path === pathname);
}

function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const pathname = usePathname();
  const isMain = isMainPage(pathname);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport?.expand() && bindViewportCSSVars(viewport);
  }, [viewport]);

  if (!viewport?.isExpanded) {
    viewport?.expand();
  }

  useEffect(() => {
    postEvent("web_app_expand");
    postEvent("web_app_setup_main_button", { is_visible: false });

    // Ensure elements exist before manipulating them
    document.body.classList.add("mobile-body");
    const wrap = document.getElementById("wrap");
    const content = document.getElementById("content");
    if (wrap && content) {
      wrap.classList.add("mobile-wrap");
      content.classList.add("mobile-content");
    }
  }, [isMain]);

  useEffect(() => {
    const telegram_entity_id = lp.initData?.user?.id;
    const telegram_username = lp.initData?.user?.username;
    if (telegram_entity_id && telegram_username) {
      setTelegramCookies(telegram_entity_id, telegram_username);
    }
  }, [lp]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <div id="wrap">
        <div id="content">{props.children}</div>
      </div>
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  // const debug = useLaunchParams().startParam === "debug";
  // const manifestUrl = useMemo(() => {
  //   return new URL("tonconnect-manifest.json", window.location.href).toString();
  // }, []);

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
        <App>{children}</App>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

const ErrorBoundaryError: React.FC<{ error: unknown }> = ({ error }) => (
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

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  // const didMount = useDidMount();

  // return didMount ? (
  //   <ErrorBoundary fallback={ErrorBoundaryError}>
  //     <RootInner {...props} />
  //   </ErrorBoundary>
  // ) : (
  //   <div className="fixed w-full h-screen flex justify-center items-center top-0 left-0 z-50 bg-[#171717]">
  //     <FadeLoader color="#6174ec" height={20} width={6} />
  //   </div>
  // );

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <RootInner {...props} />
    </ErrorBoundary>
  );
}
