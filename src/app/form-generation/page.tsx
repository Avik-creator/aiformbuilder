import {auth} from "@/auth"
import { redirect } from "next/navigation"
import FormGenerator from "@/components/form-generator/formGenerator"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: {
    default: "FormCraft AI",
    template: "%s | FormCraft AI",
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
     images:"https://formcraftai-delta.vercel.app/og-image.png",
    countryName:"India",
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
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/logo.png",
  }

}

export default async function FormGenerationPage() {
  const session = await auth()

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <FormGenerator />
    </div>
  )
}

