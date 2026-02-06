import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const circular = localFont({
  src: [
    {
      path: "../public/fonts/CircularSpotifyText-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/lineto-circular-book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/lineto-circular-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-circular",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke"),
  title: {
    default: "BudgetKE - Kenya's #1 Digital Planning Tools",
    template: "%s | BudgetKE",
  },
  description:
    "Download verified M-Pesa ready budget planners and business tools.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "BudgetKE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${circular.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
