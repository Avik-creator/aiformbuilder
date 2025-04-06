import CTA from "@/components/homepage/cta";
import Demo from "@/components/homepage/demo";
import Features from "@/components/homepage/features";
import Hero from "@/components/homepage/hero";
import Pricing from "@/components/homepage/pricing";
import { Testimonials } from "@/components/homepage/testimonial";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FormCraft AI",
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID
  },
  description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  abstract: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  creator: "Avik Mukherjee",
   metadataBase: new URL("https://formcraftai-delta.vercel.app"),
  openGraph:{
    title: "FormCraft AI",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
    type: "website",
    locale: "en_US",
    siteName: "FormCraft AI",
    countryName:"India",
    images:"https://formcraftai-delta.vercel.app/og-image.png",
    url:"https://formcraftai-delta.vercel.app"
  },
  twitter:{
    card: "summary",
    creator: "Avik Mukherjee",
    site: "FormCraft AI",
    title: "FormCraft AI",
    images:"https://formcraftai-delta.vercel.app/og-image.png",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  },
  icons:{
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
  
};

export default function Home() {
  return (
    <>
    <Hero />
      <Features />
      <Demo/>
      <Testimonials/>
      <CTA />

      <Pricing/>

      </>
  );
}
