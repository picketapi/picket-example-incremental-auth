import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PicketProvider } from "@picketapi/picket-react";

const apiKey =
  process.env.NEXT_PUBLIC_PICKET_PUBLISHABLE_KEY || "YOUR_API_KEY_HERE";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PicketProvider apiKey={apiKey as string}>
      <Component {...pageProps} />
    </PicketProvider>
  );
}

export default MyApp;
