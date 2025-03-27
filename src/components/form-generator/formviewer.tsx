'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Check, ChevronDown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FormPreviewProps {
  editLink: string
  viewLink: string
}

export const FormPreview = ({ editLink, viewLink }: FormPreviewProps) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async (text: string, type: 'edit' | 'view') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(type)
      setTimeout(() => setCopiedLink(null), 2000)
      toast({ title: 'Link Copied', description: `Copied: ${text}` })
    } catch {
      toast({ title: 'Error', description: 'Failed to copy link' })
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row h-auto min-h-screen bg-background p-4"
    >
      {/* Left Section - Dropdown & Links */}
      <motion.div 
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full md:w-1/3 p-4 border-b md:border-r"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4">Form Links</h2>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              Select Link Type
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <AnimatePresence>
            {isOpen && (
              <DropdownMenuContent asChild forceMount>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <DropdownMenuItem className="flex justify-between items-center">
                    Edit Link
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(editLink, 'edit')}>
                      {copiedLink === 'edit' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between items-center">
                    View Link
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(viewLink, 'view')}>
                      {copiedLink === 'view' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenu>
       
      </motion.div>

      {/* Right Section - Form Preview */}
      <motion.div 
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full md:w-2/3 p-4"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4">Form Preview</h2>
        <motion.div 
          className="w-full h-[60vh] md:h-[calc(100vh-6rem)] border rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <iframe
            src={viewLink}
            className="w-full h-full border-none"
            title="Form Preview"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}