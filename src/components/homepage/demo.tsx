"use client"
import { motion } from "framer-motion"

export default function Demo() {
  return (
    <section className="bg-gray-900 py-24 sm:py-32 relative overflow-hidden">
      {/* Purple gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See FormCraftAI in action</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Watch how easy it is to create intelligent forms with our AI-powered platform.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl rounded-2xl bg-gray-800 shadow-lg ring-1 ring-gray-700 sm:mt-20"
        >
          <div className="p-2">
            <div className="aspect-video w-full bg-gray-950 rounded-lg overflow-hidden">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/VfSbq-Fh0pA" 
                title="FormCraftAI Demo" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}