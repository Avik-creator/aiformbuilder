'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FormCardProps {
  form: {
    id: number
    title: string
    description: string
    formLink: string
    editFormLink?: string | null
  }
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
        <CardDescription>{form.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add any additional content here if needed */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={form.formLink} target="_blank" rel="noopener noreferrer">
            View Form
          </Link>
        </Button>
        <Button asChild>
          <Link href={form?.editFormLink || ''} target="_blank" rel="noopener noreferrer">
            Edit Form
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

