import type { Metadata } from "next";
import { Geist, Oxanium } from "next/font/google";
import { MotionSystem } from "./components/MotionSystem";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const oxanium = Oxanium({ variable: "--font-oxanium", subsets: ["latin"] });

const localOrigin = "http://localhost:3000";
const siteTitle = "QuantStation — Systematic trading, one workstation";
const siteDescription = "Build, test, optimize, execute, and review systematic trading workflows in one local-first desktop workstation.";
const socialImage = `${localOrigin}/og-monochrome.png`;
const socialTitle = "QuantStation";
const socialDescription = "Research. Validate. Execute.";

export const metadata: Metadata = {
  metadataBase: new URL(localOrigin),
  title: {
    default: siteTitle,
    template: "%s — QuantStation",
  },
  description: siteDescription,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    siteName: "QuantStation",
    url: localOrigin,
    images: [{ url: socialImage, width: 1731, height: 909, alt: `${socialTitle} — ${socialDescription}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className={`${geistSans.variable} ${oxanium.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MotionSystem />
      </body>
    </html>
  );
}
