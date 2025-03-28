import Footer from "@/components/footer";
import Header from "@/components/header";

import CTA from "@/components/homepage/cta";
import Demo from "@/components/homepage/demo";
import Features from "@/components/homepage/features";
import Hero from "@/components/homepage/hero";
import Pricing from "@/components/homepage/pricing";
import { Testimonials } from "@/components/homepage/testimonial";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Form Generator",
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
    url:"https://formcraftai-delta.vercel.app"
  },
  twitter:{
    card: "summary",
    creator: "Avik Mukherjee",
    site: "FormCraft AI",
    title: "FormCraft AI",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
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
