// src/app/layout.js
import React from "react";
import Script from "next/script";

import "./globals.css";
import Data from "./constants.json";

import Navegation from "./Navegation";
import Footer from "./Footer";





export const metadata = {
  title: "Inicio | Asoge Labs",
  description:
    "Una comunidad autosostenida, lo que significa que no se depende de financiamiento de empresas o gobiernos directamente. La comunidad se mantiene gracias al apoyo de los usuarios a través de donaciones, publicidad y otras contribuciones voluntarias.",
  keywords: [
    "rodolfocasan",
    "rodolfo casan",
    "asogelabs",
    "asoge labs",
    "asoge labs inicio",
  ],
  authors: [
    { name: "rodolfocasan", url: "https:://asogelabs.com" },
    { name: "rodolfocasan", url: "https://asogelabs.github.io/" },
  ],
  creator: "asogelabs",
  publisher: "asogelabs",
  icons: {
    icon: Data.favicon,
  },
};
export default function RootLayout({ children }) {
  // Definición de constantes
  const google_adsense_pub_id = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  return (
    <html lang="es">
      <head>
        <meta name="google-adsense-account" content={google_adsense_pub_id} />
        <meta name="google-site-verification" content="_327UUlYSP9tvTIcOg-YA8DWORNa0CN4NCm-8UKSOx8" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${google_adsense_pub_id}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navegation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
