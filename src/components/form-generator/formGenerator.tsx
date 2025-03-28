'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Wand2 } from 'lucide-react'
import { generateFormFromAI, createGoogleForm, sendBatchUpdateToGoogleForm } from "@/app/actions/actions"
import { FormPreview } from "./formviewer"
import { useToast } from "@/hooks/use-toast"
import { getErrorMessage } from "@/lib/utils"
import { FormGenerationError } from "@/lib/error"

// Suggestions array for form templates
const suggestions = [
  { id: 1, title: "Contact Form", defaultPrompt: "Create a contact form with fields for name, email, phone number, and message." },
  { id: 2, title: "Feedback Form", defaultPrompt: "Create a feedback form that collects customer satisfaction ratings and comments." },
  { id: 3, title: "Frontend Job Application Form", defaultPrompt: "Create a job application form for the position of frontend." },
  { id: 4, title: "Survey Form", defaultPrompt: "Create a survey form to gather information about." },
  { id: 5, title: "Order Form", defaultPrompt: "Create an order form for customers to purchase." },
  { id: 6, title: "Registration for Event Form", defaultPrompt: "Create a registration form for attending an event." },
  { id: 7, title: "Lead Generation Form", defaultPrompt: "Create a lead generation form to collect information from potential customers." },
  { id: 8, title: "Payment Form", defaultPrompt: "Create a payment form that collects billing information." },
];

const HoveringWand = () => (
	<motion.div
		className="fixed inset-0 pointer-events-none z-50 flex flex-col items-center justify-center gap-4"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
	>
		{/* Wand Animation */}
		<motion.div
			className="text-purple-500"
			animate={{
				rotate: [0, 20, 0, -20, 0],
				scale: [1, 1.2, 1, 1.2, 1]
			}}
			transition={{
				duration: 2,
				ease: 'anticipate',
				times: [0, 0.25, 0.5, 0.75, 1],
				repeat: Infinity,
				repeatDelay: 0.5
			}}
		>
			<Wand2 size={64} />
		</motion.div>

		{/* Text Animation */}
		<motion.p
			className="text-xl font-semibold text-purple-700"
			animate={{
				opacity: [0, 1, 0] // Animates from invisible (0) to visible (1) and back to invisible (0)
			}}
			transition={{
				duration: 2, // 2 seconds for each full cycle
				repeat: Infinity, // Loops infinitely
				ease: 'easeInOut' // Smooth transitions
			}}
		>
			Oh My Me! Wait till the Magic Happens
		</motion.p>
	</motion.div>
)


export default function FormGenerator() {
  const [prompt, setPrompt] = useState(""); // User's prompt input
  const [isGenerating, setIsGenerating] = useState(false); // Loading state
  const [formLinks, setFormLinks] = useState<{ editLink: string; viewLink: string, formId: string } | null>(null); // Links to generated forms
  const { toast } = useToast()

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: { id?: number; title?: string; defaultPrompt: string }) => {
    setPrompt(suggestion.defaultPrompt);
  };

  // Handle form generation process
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const aiResponse = await generateFormFromAI(prompt);
      
      const createdForm = await createGoogleForm(aiResponse);
      
      if (!createdForm?.Form?.formId) {
        throw new FormGenerationError(
          'FORM_CREATE_FAILED',
          'Failed to create form'
        );
      }

      const updatedForm = await sendBatchUpdateToGoogleForm(aiResponse, createdForm.Form.formId, createdForm);

      if (!updatedForm?.form?.responderUri) {
        throw new FormGenerationError(
          'FORM_UPDATE_FAILED',
          'Failed to update form'
        );
      }

      setFormLinks({
        editLink: `https://docs.google.com/forms/d/${createdForm.Form.formId}/edit`,
        viewLink: updatedForm.form.responderUri,
        formId: createdForm.Form.formId
      });

      toast({
        title: "Success!",
        description: "Your form has been created successfully.",
      });

    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      let errorDescription = 'Please try again later';
      
      if (error instanceof FormGenerationError) {
        errorMessage = getErrorMessage(error);
        errorDescription = error.details || 'Please try again or contact support if the issue persists';
      }

      toast({
        title: errorMessage,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <>
      <style jsx global>{`
        ::selection {
          background-color: rgba(168, 85, 247, 0.3);
          color: #ffffff;
        }
      `}</style>
          <div className="fixed inset-0 pointer-events-none z-[-1]">
      <div className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[100px]" />
      <div className="absolute right-[5%] bottom-[5%] h-[400px] w-[600px] rounded-full bg-purple-900/20 blur-[100px]" />
    </div>

      <AnimatePresence>
        {isGenerating && <HoveringWand />}
      </AnimatePresence>
      {formLinks ? (
        <FormPreview editLink={formLinks.editLink} viewLink={formLinks.viewLink} formId={formLinks.formId}/>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 max-w-3xl mx-auto p-4 relative"
        >
          {isGenerating && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 rounded-lg" />
          )}
          <Card className="overflow-hidden border border-purple-500/20 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800">
            <CardContent className="p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold mb-4 text-white">Describe Your Form</h2>
                <Textarea
                  placeholder="E.g., Create a customer feedback form with questions about product quality, delivery experience, and overall satisfaction..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="mb-4 bg-gray-800 border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-gray-100 placeholder-gray-400"
                  disabled={isGenerating}
                />
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || prompt.trim() === ""}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 items-center mt-8"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                className="text-gray-200 text-xs border-purple-400 hover:bg-gray-800 hover:scale-105 transition-all rounded-full bg-gray-800/50 border py-1.5 px-3 shadow-md"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isGenerating}
              >
                {suggestion.title}
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

