'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Brain, Zap, Sparkles } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Form Creation',
    description: 'Let AI generate the perfect form structure based on your needs.',
    icon: Brain,
  },
  {
    title: 'Smart Response Analysis',
    description: 'Automatically analyze and categorize responses with machine learning.',
    icon: Zap,
  },
  {
    title: 'Intelligent Suggestions',
    description: 'Get AI-driven suggestions to improve your form\'s effectiveness.',
    icon: Sparkles,
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Powerful AI Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

