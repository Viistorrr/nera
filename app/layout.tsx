import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "./components/AppShell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NERA · La del Negrooverso",
  description: "La inteligencia central del Negrooverso para proyectos, conocimiento y expansión creativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-[#1a1a1a] text-zinc-100`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
