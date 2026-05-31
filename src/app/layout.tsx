import type { Metadata, Viewport } from "next";
import { Syne, Inter_Tight } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coaltigerltd.com"),
  title: "Coal Tiger Innovations & Solutions Ltd — Inevitability Engineered",
  description:
    "Coal Tiger Innovations & Solutions Ltd engineers disruptive concepts and solutions for the holistic betterment of humanity — work that saves lives, generates sustainable employment, and safeguards both people and wildlife. Founded by Leon M. Browne. Built on the Bindu Method.",
  authors: [{ name: "Coal Tiger Innovations & Solutions Ltd" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Coal Tiger Innovations & Solutions Ltd — Inevitability Engineered",
    description:
      "Disruptive concepts and solutions engineered for the holistic betterment of humanity. Ethically sound. Financially robust.",
    url: "https://www.coaltigerltd.com/",
    images: ["/img/coal-tiger.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        {/* Shared SVG brand mark — referenced via <use href="#ct-mark" /> */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <symbol id="ct-mark" viewBox="0 0 64 64">
              <radialGradient id="iris2" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#9bfff6" />
                <stop offset="42%" stopColor="#22e0e6" />
                <stop offset="100%" stopColor="#0b7d8a" />
              </radialGradient>
              <linearGradient id="ring2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22e0e6" />
                <stop offset="100%" stopColor="#14c58b" />
              </linearGradient>
              <path
                d="M32 7 53 18 53 42 32 57 11 42 11 18Z"
                fill="none"
                stroke="url(#ring2)"
                strokeWidth="2.2"
                opacity="0.85"
              />
              <ellipse cx="32" cy="32" rx="17" ry="12" fill="none" stroke="url(#ring2)" strokeWidth="2" />
              <ellipse cx="32" cy="32" rx="9.5" ry="9.5" fill="url(#iris2)" />
              <path d="M32 22.5 Q34.2 32 32 41.5 Q29.8 32 32 22.5Z" fill="#05070a" />
              <circle cx="28.6" cy="28.6" r="2.1" fill="#eafffb" opacity="0.9" />
            </symbol>
          </defs>
        </svg>
      </body>
    </html>
  );
}
