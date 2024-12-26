import Footer from "@/components/footer";
import Header from "@/components/header";
import CTA from "@/components/homepage/cta";
import Features from "@/components/homepage/features";
import Hero from "@/components/homepage/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Form Generator",
  description: "It's a form generator that uses AI to generate google forms.",
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID
  }
};

export default function Home() {
  return (
    <>
    <Header/>
    <Hero />
      <Features />
      <CTA />
      <Footer/>
      </>
  );
}
