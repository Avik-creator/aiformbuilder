'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

import Link from 'next/link'

export default function Hero() {

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
        <Link href="/api/auth/signin">
        <Button size="lg" className="text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        </Link>
      </motion.div>
    </section>
  )
}

