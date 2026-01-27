import "./globals.css";
import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});



/**
 * Metadata ajută SEO (titlu, descriere).
 * Mai târziu completăm cu OpenGraph, icons etc.
 */
export const metadata: Metadata = {
  title: "Chacón Villa | Fishing Retreat",
  description:
    "A quiet fishing retreat near Playas de Chacón, Caspe (Zaragoza). Nature, comfort, and unforgettable sunsets by the lake.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${nunito.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}


