import { getForms } from "../actions/getForms"
import { FormCard } from "./Formcard"

export default async function FormsPage() {
  const forms = await getForms()



  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Forms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  )
}

