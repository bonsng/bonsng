import "./globals.css";
import { Metadata } from "next";
import React from "react";
import Providers from "@/ui/providers";

export const metadata: Metadata = {
  title: "Bonseung Koo",
  description: "Bonseung Koo Portfolio",
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
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
