import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import { headers } from "next/headers";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const oxanium = Oxanium({ variable: "--font-oxanium", subsets: ["latin"] });

const defaultOrigin = "https://quantstation.openai.site";
const siteTitle = "QuantStation — Systematic trading, one workstation";
const siteDescription = "Build, test, optimize, execute, and review systematic trading workflows in one local-first desktop workstation.";

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || requestHeaders.get("host") || new URL(defaultOrigin).host;
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || (/^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? "http" : "https");

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return defaultOrigin;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getRequestOrigin();
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: siteTitle,
      template: "%s — QuantStation",
    },
    description: siteDescription,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: siteTitle,
      description: "From strategy idea to trading decision. One workstation.",
      type: "website",
      siteName: "QuantStation",
      url: origin,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "QuantStation signal core" }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: "From strategy idea to trading decision. One workstation.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${oxanium.variable} antialiased`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
