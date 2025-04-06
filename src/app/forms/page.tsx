import { auth } from "@/auth"
import { getForms } from "../actions/getForms"
import { FormCard } from "./Formcard"
import { redirect } from "next/navigation"
import { NoForms } from "./NoForm";
import { Metadata } from "next";

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
     images:"https://formcraftai-delta.vercel.app/og-image.png",
    siteName: "FormCraft AI",
    countryName:"India",
    url:"https://formcraftai-delta.vercel.app"
  },
  twitter:{
    card: "summary",
    creator: "Avik Mukherjee",
    site: "FormCraft AI",
     images:"https://formcraftai-delta.vercel.app/og-image.png",
    title: "FormCraft AI",
    description: "Want to create a form? FormCraft AI is here to help you generate forms with AI.",   
  },
  icons:{
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/logo.png",
  }

}

export default async function FormsPage() {
  

  const session = await auth();

  if(!session) {
    redirect("/");
  }

  const forms = await getForms();

  


  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-screen justify-center items-center">
         <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute -left-[20%] top-[5%] h-[600px] w-[600px] rounded-full bg-purple-900/30 blur-[150px] animate-pulse" />
      <div className="absolute right-[0%] bottom-[0%] h-[500px] w-[500px] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse" />
    </div>

      <h1 className="text-3xl font-bold mb-6">Your Forms</h1>
      {forms.length === 0 ? (
        <NoForms />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} index={forms.length}/>
          ))}
        </div>
      )}
    </div>
  )
}

