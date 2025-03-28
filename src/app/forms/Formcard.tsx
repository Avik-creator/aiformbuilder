'use client'
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, Eye, ExternalLink, FileEdit, FileSpreadsheet, FileType } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteForm, getFormResponses } from "../actions/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface FormCardProps {
  form: {
    id: string
    title: string
    description: string
    formLink: string
    editFormLink?: string | null
  }
  index: number
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
        delay: index * 0.15,
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
      router.refresh()
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

  const downloadAsExcel = () => {
    if (!responseData) return;
    
    try {
      let csvContent = "data:text/csv;charset=utf-8,";
      
      if (responseData.responses.length > 0) {
        const firstResponse = responseData.responses[0];
        const headers = Object.values(firstResponse.enhancedAnswers || {})
          .map((answer: any) => answer.questionText || "Unnamed Question");
        csvContent += headers.join(",") + "\n";
        
        responseData.responses.forEach(response => {
          const row = Object.values(response.enhancedAnswers || {})
            .map((answer: any) => {
              const value = answer.textAnswers?.answers?.[0]?.value || "";
              return `"${value.replace(/"/g, '""')}"`;
            });
          csvContent += row.join(",") + "\n";
        });
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${form.title}_responses.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download complete",
        description: "Responses have been downloaded as CSV",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download responses",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = () => {
    if (!responseData) return;
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({
          title: "Error",
          description: "Pop-up blocked. Please allow pop-ups to download PDF.",
          variant: "destructive",
        });
        return;
      }
      
      let htmlContent = `
        <html>
        <head>
          <title>${form.title} - Responses</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
            h1 { color: #333; margin-bottom: 20px; }
            .response { 
              background-color: white; 
              border: 1px solid #e0e0e0; 
              padding: 15px; 
              margin-bottom: 15px; 
              border-radius: 8px; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .response-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              margin-bottom: 10px; 
              border-bottom: 1px solid #f0f0f0; 
              padding-bottom: 10px;
            }
            .question { color: #555; margin-bottom: 5px; font-weight: bold; }
            .answer { margin-bottom: 15px; color: #333; }
          </style>
        </head>
        <body>
          <h1>${form.title} - Responses</h1>
          <p>Total responses: ${responseData.responseCount}</p>
      `;
      
      responseData.responses.forEach((response, idx) => {
        htmlContent += `
          <div class="response">
            <div class="response-header">
              <h3>Response ${idx + 1}</h3>
            </div>
        `;
        
        Object.entries(response.enhancedAnswers || {}).forEach(([questionId, answerData]: [string, any]) => {
          htmlContent += `
            <div>
              <p class="question">${answerData.questionText || "Unnamed Question"}</p>
              <p class="answer">${answerData.textAnswers?.answers?.[0]?.value || "No answer"}</p>
            </div>
          `;
        });
        
        htmlContent += `</div>`;
      });
      
      htmlContent += `
        </body>
        </html>
      `;
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      printWindow.onload = function() {
        printWindow.print();
      };
      
      toast({
        title: "PDF prepared",
        description: "The print dialog should open to save as PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  const handleViewResponses = async () => {
    setIsLoading(true)
    try {
      const data = await getFormResponses(form.id)
      setResponseData(data)
      setIsResponsesDialogOpen(true)
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
      <Card className="h-full flex flex-col bg-black border-purple-900/50">
        <CardHeader>
          <CardTitle className="line-clamp-1 text-purple-300">{form.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-purple-100/70">{form.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center justify-between">
            <Dialog open={isResponsesDialogOpen} onOpenChange={setIsResponsesDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-sm text-purple-300 hover:bg-purple-900/30"
                  onClick={handleViewResponses}
                >
                  <Eye size={16} />
                  <span>View Responses</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-black border-purple-900/50">
                <DialogHeader>
                  <DialogTitle className="text-purple-300">Responses for {form.title}</DialogTitle>
                  <DialogDescription className="text-purple-100/70">
                    {isLoading ? "Loading responses..." : 
                      responseData ? 
                      `Total responses: ${responseData.responseCount}` : 
                      "No response data available"}
                  </DialogDescription>
                </DialogHeader>
                
                {/* Export buttons at the top */}
                <div className="flex justify-end gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downloadAsExcel}
                    disabled={!responseData || responseData.responses.length === 0}
                    className="flex items-center gap-1 text-purple-300 hover:bg-purple-900/30 border-purple-900/50"
                  >
                    <FileSpreadsheet size={16} />
                    <span>Export Excel</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downloadAsPDF}
                    disabled={!responseData || responseData.responses.length === 0}
                    className="flex items-center gap-1 text-purple-300 hover:bg-purple-900/30 border-purple-900/50"
                  >
                    <FileType size={16} />
                    <span>Export PDF</span>
                  </Button>
                </div>
                
                {responseData && responseData.responses.length > 0 ? (
                  <div className="space-y-4">
                    {responseData.responses.map((response, idx) => (
                      <div 
                        key={idx} 
                        className="border rounded-md p-4 bg-black border-purple-900/50"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-purple-300">Response {idx + 1}</h4>
                        </div>
                        {Object.entries(response.enhancedAnswers || {}).map(([questionId, answerData]: [string, any]) => (
                          <div key={questionId} className="mb-3 pb-3 border-b border-purple-900/50 last:border-b-0">
                            <p className="text-sm text-purple-100/50 mb-1">Question:</p>
                            <p className="text-sm text-purple-200">{answerData.questionText || "Unnamed Question"}</p>
                            <p className="text-sm text-purple-100/50 mt-2 mb-1">Answer:</p>
                            <p className="text-sm text-purple-100">{answerData.textAnswers?.answers?.[0]?.value || "No answer"}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : !isLoading && (
                  <div className="flex justify-center items-center py-8">
                    <p className="text-purple-100/50">No responses yet</p>
                  </div>
                )}
                
                <DialogFooter className="mt-4">
                  <Button 
                    onClick={() => setIsResponsesDialogOpen(false)} 
                    variant="outline"
                    className="text-purple-300 hover:bg-purple-900/30 border-purple-900/50"
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              asChild 
              size="sm" 
              variant="outline" 
              className="text-purple-300 hover:bg-purple-900/30 border-purple-900/50"
            >
              <Link href={form.formLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-1" /> View
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="text-purple-300 hover:bg-purple-900/30 border-purple-900/50"
            >
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
              <Button variant="destructive" size="sm" className="bg-purple-900/50 hover:bg-purple-900/70">
                <Trash2 size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-purple-900/50">
              <DialogHeader>
                <DialogTitle className="text-purple-300">Delete Form</DialogTitle>
                <DialogDescription className="text-purple-100/70">
                  Are you sure you want to delete "{form.title}"? This will remove the form from Google Forms and our database. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)} 
                  disabled={isLoading}
                  className="text-purple-300 hover:bg-purple-900/30 border-purple-900/50"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete} 
                  disabled={isLoading}
                  className="bg-purple-900/50 hover:bg-purple-900/70"
                >
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

export function FormCardGrid({ forms }: { forms: FormCardProps['form'][] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forms.map((form, index) => (
        <FormCard key={form.id} form={form} index={index} />
      ))}
    </div>
  )
}