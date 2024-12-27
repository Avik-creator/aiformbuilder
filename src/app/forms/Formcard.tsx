'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FormCardProps {
  form: {
    id: string
    title: string
    description: string
    formLink: string
    editFormLink?: string | null
  }
  index: number // Add index prop for staggered animation
}

export function FormCard({ form, index }: FormCardProps) {
  const variants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        delay: index * 0.15, // Stagger based on index
      }
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="line-clamp-1">{form.title}</CardTitle>
          <CardDescription className="line-clamp-2">{form.description}</CardDescription>
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
          <Button asChild variant="outline">
            <Link 
              href={form?.editFormLink || ''} 
              target="_blank" 
              rel="noopener noreferrer"
              className={!form.editFormLink ? 'pointer-events-none opacity-50' : ''}
            >
              Edit Form
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Example of how to use the FormCard in a grid layout
export function FormCardGrid({ forms }: { forms: FormCardProps['form'][] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forms.map((form, index) => (
        <FormCard key={form.id} form={form} index={index} />
      ))}
    </div>
  )
}

