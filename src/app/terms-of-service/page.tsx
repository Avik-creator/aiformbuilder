import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "AI Form Generator",
    template: "%s | AI Form Generator",
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

}

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-8 px-4">

          <ScrollArea className="h-[80vh]">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
              
              <div className="text-sm text-muted-foreground">
                Last updated: December 26, 2024
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
                <p>
                  By accessing or using FormCraft AI, you agree to be bound by these Terms. 
                  If you disagree with any part of the terms, you may not access the service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Description of Service</h2>
                <p>
                  FormCraft AI provides form creation and management services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Form creation and customization</li>
                  <li>Form sharing and distribution</li>
                  <li>Form response collection</li>
                  <li>User account management</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. User Accounts</h2>
                <div className="space-y-2">
                  <p>When creating an account, you must provide accurate information including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Valid email address</li>
                    <li>Secure password</li>
                    <li>Additional profile information as requested</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain account security</li>
                  <li>Comply with applicable laws and regulations</li>
                  <li>Respect intellectual property rights</li>
                  <li>Use the service appropriately and ethically</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Data Storage</h2>
                <p>
                  We store form data and user information in secure PostgreSQL databases with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encrypted data transmission</li>
                  <li>Regular backups</li>
                  <li>Access controls and monitoring</li>
                  <li>Automatic data removal upon account deletion</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
                <p>
                  Users retain rights to their form content. The service infrastructure and code remain 
                  our intellectual property.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend access to our service immediately, 
                  without prior notice, for violations of these Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Contact Information</h2>
                <p>
                  For questions about these Terms, please contact us at:
                  <br />
                  <span className="text-primary">avikm744@gmail.com</span>
                </p>
              </section>
            </div>
          </ScrollArea>
    </div>
  );
};

export default TermsOfService;