import "@/styles/globals.css";
import Header from "@/components/Header";

import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={`pmx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 ${inter.className}`}>
      <SessionProvider session={session}>
        <Header/>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
