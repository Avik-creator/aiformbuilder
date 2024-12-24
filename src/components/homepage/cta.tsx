'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function CTA() {
  const { data: session } = useSession()
  const router = useRouter()

  console.log("SESSIOn", session)

  const handleStartBuilding = () => {
    if (session) {
      router.push('/form-generation')
    } else {
      signIn('google', { callbackUrl: '/form-generation' })
    }
  }

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Revolutionize Your Forms?</h2>
        <p className="text-xl mb-8">
          Join thousands of users who are already creating smarter forms with our AI-powered platform. It&apos;s free, it&apos;s powerful, and it&apos;s waiting for you.
        </p>
        <Button size="lg" className="text-lg" onClick={handleStartBuilding}>
          Start Building for Free
        </Button>
      </motion.div>
    </section>
  )
}

