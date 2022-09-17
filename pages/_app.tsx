import PlausibleProvider from "next-plausible";
import { SessionProvider } from "next-auth/react";

import type { Session } from "next-auth";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return <Component {...pageProps} />;
}
