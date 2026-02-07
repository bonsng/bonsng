import type { Metadata } from "next";
import { cookies } from "next/headers";
import SiteNav from "./components/site-nav";
import { SettingsProvider, type Language, type Theme } from "./components/settings-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bonseung Koo",
  description: "Bonseung Koo Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("bonsng-theme")?.value;
  const cookieLanguage = cookieStore.get("bonsng-language")?.value;

  const initialTheme: Theme = cookieTheme === "dark" ? "dark" : "light";
  const initialLanguage: Language = cookieLanguage === "en" ? "en" : "ko";

  return (
    <html lang={initialLanguage} className={initialTheme === "dark" ? "dark" : undefined}>
      <body className="antialiased">
        <SettingsProvider initialTheme={initialTheme} initialLanguage={initialLanguage}>
          <SiteNav />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
