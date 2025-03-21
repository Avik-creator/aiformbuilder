import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FormCraft AI",
    template: "%s | FormCraft AI",
  },
  description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  abstract: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  creator: "Avik Mukherjee",
  metadataBase: new URL("https://formcraftai-delta.vercel.app"),

  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID
  },
  openGraph:{
    title: "FormCraft AI",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
    type: "website",
    locale: "en_US",
    siteName: "FormCraft AI",
    countryName:"India",
    url:"https://formcraftai-delta.vercel.app"
  },
  twitter:{
    card: "summary",
    creator: "Avik Mukherjee",
    site: "FormCraft AI",
    title: "FormCraft AI",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",

  },
  icons:{
    icon:"/logo.png",
    apple:"/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       

        <SessionProvider>
        
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
        {children}
        <Analytics/>
        <Toaster />
        <Footer/>
        </ThemeProvider>
        </SessionProvider>
       
      </body>
    </html>
  );
}
