// src/app/layout.js
import React from "react";

import "./globals.css";
import Data from "./constants.json";

import Navegation from "./Navegation";
import Footer from "./Footer";





export const metadata = {
  title: 'Inicio | Asoge Labs',
  description: "Una comunidad autosostenida, lo que significa que no se depende de financiamiento de empresas o gobiernos directamente. La comunidad se mantiene gracias al apoyo de los usuarios a través de donaciones, publicidad y otras contribuciones voluntarias.",
  keywords: ["rodolfocasan", "rodolfo casan", "asogelabs", "asoge labs", "asoge labs inicio"],
  authors: [{ name: 'rodolfocasan', url: "https:://asogelabs.com" }, { name: 'rodolfocasan', url: 'https://asogelabs.github.io/' }],
  creator: 'asogelabs',
  publisher: 'asogelabs',
  icons: {
      icon: Data.favicon,
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <>
        <meta name="google-adsense-account" content="ca-pub-6072835343724077">
      </head>
      <body>
        <Navegation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
