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


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center">
        {children}
    </div>
  );
}
