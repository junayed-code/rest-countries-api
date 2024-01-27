import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import ThemeProvider from "@/providers/ThemeProvider";
import config from "@/config";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://countryquery.vercel.app"),
  title: "REST Countries API with color theme switcher",
  description:
    "This is the solution to REST countries API with color theme switcher challenge by Junayed Akbor on Frontend Mentor.",
  creator: "Junayed Akbor",
  authors: [{ name: "Junayed Akbor", url: "https://junayedakbor.vercel.app" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Rest Countries API",
    locale: "en_bg",
    description:
      "This is the solution to REST countries API with color theme switcher challenge by Junayed Akbor on Frontend Mentor.",
    images: [
      {
        url: "/og.png",
        width: 1662,
        height: 935,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable}`}>
      <body className="dark:bg-slate-800 dark:text-slate-50">
        <ThemeProvider>
          <Navbar />
          <main className="container">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
