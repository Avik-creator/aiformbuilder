import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollArea className="h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            
            <div className="text-sm text-muted-foreground">
              Last updated: December 26, 2024
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
              <h2 className="text-3xl font-semibold">5. Contact Us</h2>
              <p className="text-lg">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
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