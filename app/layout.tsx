import type { Metadata } from "next";
import SiteNav from "./components/site-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bonseung Koo",
  description: "Bonseung Koo Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
