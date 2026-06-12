import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import I18nProvider from "@/components/I18nProvider";
import { HtmlLangSync } from "@/components/html-lang-sync";
import ScrollToTop from "@/components/scroll-to-top";
import { PreloadResources } from "@/components/preload-resources";
import { ThemeProvider } from "@/components/theme-provider";

const urbanist = Urbanist({ subsets: ["latin"] });

const BASE_URL = "https://nicoj3000.netlify.app";

export const metadata: Metadata = {
  title: "NicoX — Ingeniero de Sistemas Fullstack",
  description:
    "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "NicoX",
    locale: "es_CO",
    title: "NicoX — Ingeniero de Sistemas Fullstack",
    description:
      "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NicoX — Ingeniero de Sistemas Fullstack",
    description:
      "Portfolio de Nicolás Delgado, Ingeniero de Sistemas enfocado en desarrollo fullstack, arquitectura TI y mentoría técnica.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={urbanist.className}>
        <PreloadResources />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <HtmlLangSync />
            <TooltipProvider>
              <Navbar />
              <Header />
              <main>{children}</main>
              <ScrollToTop />
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}