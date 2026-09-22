import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "SISARPRAS",
  description:
    "Sistem Informasi Sarana dan Prasarana Sekolah",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}