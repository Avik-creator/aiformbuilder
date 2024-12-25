'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Wand2 } from 'lucide-react'
import { generateFormFromAI, createGoogleForm, sendBatchUpdateToGoogleForm } from "@/app/actions/actions"

export default function FormGenerator() {
  const [prompt, setPrompt] = useState("")
  const [generatedForm, setGeneratedForm] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [formLinks, setFormLinks] = useState<{ editLink: string; viewLink: string } | null>(null);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const aiResponse = await generateFormFromAI(prompt);
      const createdForm = await createGoogleForm(aiResponse);
      if(createdForm?.formId){
        const updatedForm = await sendBatchUpdateToGoogleForm(aiResponse, createdForm.formId);
        console.log('updatedForm:', updatedForm);
        setFormLinks({
          editLink: `https://docs.google.com/forms/d/${createdForm.formId}/edit`,
          viewLink: (updatedForm as any).form.responderUri || `https://docs.google.com/forms/d/e/${createdForm.formId}/viewform`,
        });
      }
    } catch (error) {
      console.error('Error generating form:', error);
    } finally {
      setIsGenerating(false);
    }
  };
    
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Describe Your Form</h2>
            <Textarea
              placeholder="E.g., Create a customer feedback form with questions about product quality, delivery experience, and overall satisfaction..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="mb-4"
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || prompt.trim() === ""}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Form
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Generated Form</h2>
                <div className="prose max-w-none">
                  <p>{generatedForm}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}


