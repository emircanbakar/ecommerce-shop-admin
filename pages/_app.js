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
    <main className={`px-4 ${inter.className}`}>
      <SessionProvider session={session}>
        <Header/>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
