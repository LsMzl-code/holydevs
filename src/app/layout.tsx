import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { Toaster } from "@/components/shadcn/toaster";
import { ThemeProvider } from "@/components/provider/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   manifest: "/manifest.json",
   metadataBase: new URL("https://acme.com"),
   openGraph: {
      title: "Holydevs - Le réseau social des propriétaires",
      description: "Holydevs - Le réseau social des propriétaires",
      images: [
         {
            url: "/open-graph/holydevs.png",
            width: 1200,
            height: 630,
            alt: "Holydevs - Le réseau social des propriétaires",
         },
      ],
      url: "https://www.holydevs.fr",
      siteName: "Holydevs",
      type: "website",
   },
   title: "Holydevs",
   description: "Holydevs - Le réseau social des propriétaires",
   
};

export default async function RootLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   return (
      <ClerkProvider localization={frFR}>
         <html lang="fr" suppressHydrationWarning>
            <body className={cn("w-full min-h-screen", inter.className)}>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  <Toaster />
                  <main>{children}</main>
               </ThemeProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
