import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import cn from "clsx";

const work_sans = Work_Sans({
  subsets: ["latin"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Many Cat Pcis",
  description: "come here to see many cat pics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-accent-light ${work_sans.variable} font-sans`}>{children}</body>
    </html>
  );
}
