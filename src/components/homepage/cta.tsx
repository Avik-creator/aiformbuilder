"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CTA() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleStartBuilding = () => {
    if (session) {
      router.push("/form-generation")
    } else {
      signIn("google", { callbackUrl: "/form-generation" })
    }
  }

  return (
    <div className="bg-gray-950 relative overflow-hidden">
      {/* Purple gradient accent */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-purple-900/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to simplify your form creation?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of users who are already creating smarter forms with our AI-powered platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="rounded-md bg-purple-600 px-6 py-6 text-base font-semibold text-white shadow-sm hover:bg-purple-700"
              onClick={handleStartBuilding}
            >
              Try for free
            </Button>
            <Button variant="link" className="text-base font-semibold text-purple-400 hover:text-purple-300">
              Learn more
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

