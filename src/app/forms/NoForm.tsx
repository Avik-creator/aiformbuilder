'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export function NoForms() {
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-3xl font-bold mb-4"
      >
        No Forms Yet
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg text-gray-600 mb-6"
      >
        You haven't created any forms. Let's get started!
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <Button
          onClick={() => redirect('/')}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Create Your First Form
        </Button>
      </motion.div>
    </motion.div>
  )
}
