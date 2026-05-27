import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navbar } from "@/components/navbar";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import I18nProvider from "@/components/I18nProvider";
import { HtmlLangSync } from "@/components/html-lang-sync";
import ScrollToTop from "@/components/scroll-to-top";

const urbanist = Urbanist({ subsets: ["latin"] });

const BASE_URL = "https://nicoj3000.netlify.app";

export const metadata: Metadata = {
  title: "NicoX — Ingeniero de Sistemas Fullstack",
  description:
    "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "NicoX",
    title: "NicoX — Ingeniero de Sistemas Fullstack",
    description:
      "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
    images: [
      {
        url: "/Foto-CV.png",
        width: 1200,
        height: 630,
        alt: "Nicolás Delgado — Ingeniero de Sistemas Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NicoX — Ingeniero de Sistemas Fullstack",
    description:
      "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
    images: ["/Foto-CV.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <I18nProvider>
          <HtmlLangSync />
          <TooltipProvider>
            <Navbar />
            <Header />
            {children}
            <ScrollToTop />
          </TooltipProvider>
        </I18nProvider>
      </body>
    </html>
  );
}