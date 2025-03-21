'use client'
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, Eye, ExternalLink, FileEdit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteForm, getFormResponses } from "../actions/actions" // Import your server actions
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast" // Import toast component if available

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
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResponsesDialogOpen, setIsResponsesDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [responseData, setResponseData] = useState<{ responseCount: number, responses: any[] } | null>(null)
  
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
  
  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteForm(form.id)
      toast({
        title: "Form deleted",
        description: "The form has been successfully deleted",
      })
      router.refresh() // Refresh the page to update the list
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete form",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }
  
  const handleViewResponses = async () => {
    setIsLoading(true)
    try {
      const data = await getFormResponses(form.id)
      setResponseData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load responses",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="line-clamp-1">{form.title}</CardTitle>
          <CardDescription className="line-clamp-2">{form.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center justify-between">
            <Dialog open={isResponsesDialogOpen} onOpenChange={setIsResponsesDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-sm"
                  onClick={handleViewResponses}
                >
                  <Eye size={16} />
                  <span>View Responses</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Responses for {form.title}</DialogTitle>
                  <DialogDescription>
                    {isLoading ? "Loading responses..." : 
                      responseData ? 
                      `Total responses: ${responseData.responseCount}` : 
                      "No response data available"}
                  </DialogDescription>
                </DialogHeader>
                
                {responseData && responseData.responses.length > 0 ? (
                  <div className="space-y-4 mt-4">
                    {responseData.responses.map((response, idx) => (
                      <div key={idx} className="border rounded-md p-3">
                        <h4 className="font-medium mb-2">Response {idx + 1}</h4>
                        {Object.entries(response.enhancedAnswers || {}).map(([questionId, answerData]: [string, any]) => (
                          <div key={questionId} className="mb-2">
                            <p className="text-sm text-gray-500">Question:</p>
                            <p className="text-sm">{answerData.questionText || "Unnamed Question"}</p>
                            <p className="text-sm text-gray-500 mt-1">Answer:</p>
                            <p className="text-sm">{answerData.textAnswers?.answers?.[0]?.value || "No answer"}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : !isLoading && (
                  <div className="flex justify-center items-center py-8">
                    <p className="text-muted-foreground">No responses yet</p>
                  </div>
                )}
                
                <DialogFooter>
                  <Button onClick={() => setIsResponsesDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href={form.formLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-1" /> View
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href={form?.editFormLink || ''}
                target="_blank"
                rel="noopener noreferrer"
                className={!form.editFormLink ? 'pointer-events-none opacity-50' : ''}
              >
                <FileEdit size={16} className="mr-1" /> Edit
              </Link>
            </Button>
          </div>
          
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Form</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{form.title}"? This will remove the form from Google Forms and our database. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Delete Form"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

