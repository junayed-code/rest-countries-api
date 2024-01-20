import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "REST Countries API with color theme switcher",
  description:
    "This is the solution to REST countries API with color theme switcher challenge by Junayed Akbor on Frontend Mentor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
