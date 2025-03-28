"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Button } from "../ui/button"
import { Brain, Zap, Sparkles } from 'lucide-react'



export default function Hero() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetStarted = () => {
    if (session) {
      router.push('/form-generation')
    } else {
      signIn('google', { callbackUrl: '/form-generation' })
    }
  }


  return (
    <div className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 bg-gray-950 flex justify-center">
      {/* Purple gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[100px]" />
        <div className="absolute right-[5%] bottom-[5%] h-[400px] w-[600px] rounded-full bg-purple-900/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Simplify your Form Creation with AI
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              FormCraftAI lets you hand off form creation to AI Models, so you can save your time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex justify-center w-full"
          >
            <Button 
              className="relative pr-12 py-6 text-base rounded-md 
                       bg-gray-800 border-gray-700 text-white 
                       hover:bg-gray-700 
                       focus:outline-none 
                       animate-pulse-glow"
              onClick={handleGetStarted}
            >
              Getting Started 
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <ArrowRight className="h-5 w-5 text-purple-400" />
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 w-full"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="group relative rounded-2xl border border-gray-800 bg-gray-900 p-6 hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/30 text-purple-400">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-white">Creation</h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Let AI generate the perfect form structure based on your needs.
              </p>
            </div>
            <div className="group relative rounded-2xl border border-gray-800 bg-gray-900 p-6 hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/30 text-purple-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-white">Manage Forms</h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">Manage All your forms through one platform.</p>
            </div>
            <div className="group relative rounded-2xl border border-gray-800 bg-gray-900 p-6 hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/30 text-purple-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-white">Responses</h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">Download Responses in CSV and PDF format Respectively.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

