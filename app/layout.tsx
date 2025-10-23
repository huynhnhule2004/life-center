import type { Metadata } from "next";
import { ToasterProvider } from "../components/toaster-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Life Center",
  description: "Trung tâm tiếng Anh English Life Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
