import { Dancing_Script, Open_Sans } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"; 
import Providers from "./Providers/Providers";
import HelpModal from "./components/HelpModal"; 
import "./globals.css";

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing" 
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans"
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${dancingScript.variable} ${openSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Providers>
          <Header />
          
          <main>{children}</main>
          
          <Footer /> 
          <HelpModal /> 
        </Providers>
      </body>
    </html>
  );
}