'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

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
    <section className="py-20 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen text-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Intelligent Forms with AI
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl mb-8 max-w-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Harness the power of AI to build smarter, more efficient forms using Google Forms. Completely free, forever.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button size="lg" className="text-lg" onClick={handleGetStarted}>
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  )
}

