import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dumuni — L'âme de la cuisine africaine",
  description:
    "Découvrez des recettes africaines authentiques, cuisinez en mode mains-libres et partagez vos créations avec la communauté Dumuni.",
  keywords: ["cuisine africaine", "recettes", "mali", "sénégal", "dumuni", "culinaire"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              className: "rounded-xl",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
