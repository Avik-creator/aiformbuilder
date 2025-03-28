"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Pricing() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetStarted = () => {
    if (session) {
      router.push("/form-generation")
    } else {
      signIn("google", { callbackUrl: "/form-generation" })
    }
  }

  const features = [
    "Unlimited form creation",
    "Unlimited form responses",
    "AI-powered form generation",
    "CSV and PDF export",
    "Advanced analytics",
    "No credit card required",
    "Lifetime access",
  ]

  return (
    <div id="pricing" className="py-24 sm:py-32 bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Completely Free, No Strings Attached
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Unlock the full potential of FormCraft AI at absolutely no cost. No limitations, no hidden fees.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl rounded-2xl bg-gray-800 shadow-lg ring-1 ring-gray-700 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">FormCraft AI Free Tier</h3>
            <span className="text-4xl font-bold text-purple-400">$0</span>
          </div>
          
          <p className="text-gray-300 mb-6">
            Everything you need to create, manage, and analyze forms with cutting-edge AI technology.
          </p>
          
          <ul className="space-y-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-x-3 text-gray-300">
                <Check className="h-5 w-5 text-purple-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button
            className="w-full bg-purple-600 text-white hover:bg-purple-500"
            onClick={handleGetStarted}
          >
            Start Creating Forms
          </Button>
        </motion.div>
      </div>
    </div>
  )
}