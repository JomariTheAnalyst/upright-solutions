import type { Metadata } from "next";
import { Sora, Outfit, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const playfairDisplay = localFont({
  src: "../public/fonts/Playfair_Display/PlayfairDisplay-ExtraBold.ttf",
  variable: "--font-playfair",
  display: "swap",
});

const roslindale = localFont({
  src: "../public/fonts/RoslindaleDisplayCondensed-Bold.woff2",
  variable: "--font-roslindale",
  display: "swap",
});

const justSansOutline = localFont({
  src: "../public/fonts/just-sans-outline.exbold.otf",
  variable: "--font-just-sans-outline",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          sora.variable,
          outfit.variable,
          ebGaramond.variable,
          playfairDisplay.variable,
          roslindale.variable,
          justSansOutline.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
