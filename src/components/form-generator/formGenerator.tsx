'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Wand2 } from 'lucide-react'
import { generateFormFromAI, createGoogleForm, sendBatchUpdateToGoogleForm } from "@/app/actions/actions"
import { FormPreview } from "./formviewer"

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

export default function FormGenerator() {
  const [prompt, setPrompt] = useState(""); // User's prompt input
  const [isGenerating, setIsGenerating] = useState(false); // Loading state
  const [formLinks, setFormLinks] = useState<{ editLink: string; viewLink: string } | null>(null); // Links to generated forms

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
      
      if (createdForm?.formId) {
        const updatedForm = await sendBatchUpdateToGoogleForm(aiResponse, createdForm.formId);

        setFormLinks({
          editLink: `https://docs.google.com/forms/d/${createdForm.formId}/edit`,
          viewLink: updatedForm?.form?.responderUri || `https://docs.google.com/forms/d/e/${createdForm.formId}/viewform`,
        });
      }
    } catch (error) {
      console.error("Error generating form:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Display form preview if links are available */}
      {formLinks ? (
        <FormPreview editLink={formLinks.editLink} viewLink={formLinks.viewLink} />
      ) : (
        // Motion animated card for form input
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
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

          {/* Suggestions buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex max-w-2xl mt-16 flex-wrap justify-center gap-3 items-center"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                className="text-gray-300 text-[10px] border-purple-400 hover:bg-gray-800 hover:scale-110 transition-all rounded-3xl bg-transparent border py-1 px-2"
                onClick={() => handleSuggestionClick(suggestion)}
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
