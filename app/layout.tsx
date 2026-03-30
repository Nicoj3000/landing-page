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

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nicoj Landing Page",
  description: "Landing page made by Nicoj",
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
    <html lang="en">
      <body className={urbanist.className}>
        <I18nProvider>
          <TooltipProvider>
            <Navbar />
            <Header />
            {children}
          </TooltipProvider>
        </I18nProvider>
      </body>
    </html>
  );
}