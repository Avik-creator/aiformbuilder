import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Terms of Service | FormCraft AI",
    template: "%s | FormCraft AI",
  },
  description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  abstract: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",
  creator: "Avik Mukherjee",
  metadataBase: new URL("https://formcraftai-delta.vercel.app"),
  openGraph:{
    title: "Terms of Service | FormCraft AI",
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
    title: "Terms of Service | FormCraft AI",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",   
  }
}

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Purple gradient background similar to forms page */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute -left-[20%] top-[5%] h-[600px] w-[600px] rounded-full bg-purple-900/30 blur-[150px] animate-pulse" />
        <div className="absolute right-[0%] bottom-[0%] h-[500px] w-[500px] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse" />
      </div>
      
      <Card className="bg-black/40 border-purple-900/50 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <ScrollArea className="h-[80vh] pr-4">
            <div className="space-y-8">
              <div className="border-b border-purple-900/50 pb-4">
                <h1 className="text-3xl font-bold text-purple-300 mb-2">Terms of Service</h1>
                <div className="text-sm text-purple-200/70">
                  Last updated: December 26, 2024
                </div>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">1. Agreement to Terms</h2>
                <p className="text-gray-300">
                  By accessing or using FormCraft AI, you agree to be bound by these Terms. 
                  If you disagree with any part of the terms, you may not access the service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">2. Description of Service</h2>
                <p className="text-gray-300">
                  FormCraft AI provides form creation and management services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Form creation and customization</li>
                  <li>Form sharing and distribution</li>
                  <li>Form response collection</li>
                  <li>User account management</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">3. User Accounts</h2>
                <div className="space-y-2">
                  <p className="text-gray-300">When creating an account, you must provide accurate information including:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Valid email address</li>
                    <li>Secure password</li>
                    <li>Additional profile information as requested</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">4. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Maintain account security</li>
                  <li>Comply with applicable laws and regulations</li>
                  <li>Respect intellectual property rights</li>
                  <li>Use the service appropriately and ethically</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">5. Data Storage</h2>
                <p className="text-gray-300">
                  We store form data and user information in secure PostgreSQL databases with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Encrypted data transmission</li>
                  <li>Regular backups</li>
                  <li>Access controls and monitoring</li>
                  <li>Automatic data removal upon account deletion</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">6. Intellectual Property</h2>
                <p className="text-gray-300">
                  Users retain rights to their form content. The service infrastructure and code remain 
                  our intellectual property.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">7. Termination</h2>
                <p className="text-gray-300">
                  We reserve the right to terminate or suspend access to our service immediately, 
                  without prior notice, for violations of these Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-purple-200">8. Contact Information</h2>
                <p className="text-gray-300">
                  For questions about these Terms, please contact us at:
                  <br />
                  <span className="text-purple-400 font-medium">avikm744@gmail.com</span>
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;