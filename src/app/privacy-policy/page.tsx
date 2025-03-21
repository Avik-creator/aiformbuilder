import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from "next";


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

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollArea className="h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            
            <div className="text-sm text-muted-foreground">
              Last updated: March 21, 2025
            </div>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">1. Introduction</h2>
              <p className="text-lg">
                Welcome to FormCraft AI ("we," "our," or "us"). We are committed to protecting 
                your privacy and ensuring the security of your personal information. This Privacy 
                Policy explains how we collect, use, store, and protect your data when you use our 
                form-building service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium">2.1 User Account Information</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Email address</li>
                  <li>Name (optional)</li>
                  <li>Profile image (optional)</li>
                  <li>User identification numbers</li>
                  <li>Account creation and update timestamps</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium">2.2 Form Information</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Form titles and descriptions</li>
                  <li>Form identifiers</li>
                  <li>Form links and edit links</li>
                  <li>Creation and modification timestamps</li>
                  <li>Association between forms and users</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium">2.3 Google User Data</h3>
                <p className="text-lg">
                  When you use Google services with our application, we only collect and store:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg mt-4">
                  <li>Form IDs of created forms</li>
                  <li>Edit and view links for forms</li>
                  <li>Information about which user created which form</li>
                </ul>
                <p className="text-lg mt-4">
                  We do not collect, store, or process any other Google user data beyond what is strictly necessary to provide our form creation service.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">3. How We Use Your Information</h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium">3.1 Essential Service Provision</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Creating and managing your user account</li>
                  <li>Enabling form creation and management</li>
                  <li>Maintaining form ownership and access controls</li>
                  <li>Providing form editing and sharing capabilities</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">4. Data Storage and Security</h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium">4.1 Data Storage</h3>
                <p className="text-lg">
                  We store your information in secure PostgreSQL databases. Our data structure ensures:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg mt-4">
                  <li>Secure user authentication</li>
                  <li>Proper association between users and their forms</li>
                  <li>Data integrity and reliability</li>
                  <li>Automated timestamp tracking for audit purposes</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">5. Sharing and Disclosure of Google User Data</h2>
              <p className="text-lg">
                We do not share, transfer, or disclose Google user data to any third parties. The form IDs, edit links, and view links we collect are only used internally to provide you with our service and are not shared with any external entities, individuals, or services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">6. Data Retention and Deletion</h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium">6.1 Retention of Google User Data</h3>
                <p className="text-lg">
                  We retain Google user data (form IDs, edit links, and view links) only for as long as necessary to provide our service to you. This data is stored in our database for the duration of your account's existence.
                </p>
                <h3 className="text-2xl font-medium mt-6">6.2 Deletion of Google User Data</h3>
                <p className="text-lg">
                  Google user data will be deleted in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg mt-4">
                  <li>When you delete a form through our service</li>
                  <li>When you delete your account with FormCraft AI</li>
                  <li>Upon your explicit request to delete specific data</li>
                </ul>
                <p className="text-lg mt-4">
                  To request deletion of your Google user data, please contact us at the email address provided in Section 8.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">7. AI and Machine Learning</h2>
              <p className="text-lg">
                FormCraft AI does not retain or use any Google user data obtained through Workspace APIs to develop, improve, or train generalized artificial intelligence (AI) or machine learning (ML) models. Your form data is used solely for providing you with our form creation service and is not used for any AI/ML training purposes.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold">8. Contact Us</h2>
              <p className="text-lg">
                If you have questions about this Privacy Policy, our data practices, or wish to request deletion of your data, please contact us at:
                <br />
                <span className="text-primary font-medium">avikm744@gmail.com</span>
              </p>
            </section>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PrivacyPolicy;
