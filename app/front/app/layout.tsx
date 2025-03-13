import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./providers";
import { ThemeProvider } from "../components/theme-provider";
import { SettingsProvider } from "@/contexts/settings-context";
import { Sidebar } from '../components/financial-ui/sidebar';
import { TopNav } from '../components/financial-ui/top-navbar';
import { TooltipProvider } from '../components/ui/tooltip';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finanzas Personales",
  description: "Aplicación para el seguimiento de gastos e inversiones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <TooltipProvider delayDuration={0}>
              <div className="min-h-screen flex">
                <Sidebar />
                <div className="flex-1">
                  <TopNav />
                  <div className="container mx-auto p-6 max-w-7xl">
                    <main className="w-full">{children}</main>
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
  // return (
  //   <html lang="es">
  //     <AuthProvider>
  //       <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  //         <body className={inter.className}>{children}</body>
  //       </ThemeProvider>
  //     </AuthProvider>
  //   </html>
  // );
}
