import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "./components/AppShell";
import { TrackingProvider } from "./components/TrackingProvider";
import { FeedbackModal } from "./components/FeedbackModal";
import Script from "next/script";

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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VR93V6T75P" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VR93V6T75P');
          `}
          </Script>
        <TrackingProvider>
          <AppShell>{children}</AppShell>
          <FeedbackModal />
        </TrackingProvider>
      </body>
    </html>
  );
}
