import {auth} from "@/auth"
import { redirect } from "next/navigation"
import FormGenerator from "@/components/form-generator/formGenerator"

export default async function FormGenerationPage() {
  const session = await auth()

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Form Generator</h1>
      <FormGenerator />
    </div>
  )
}

