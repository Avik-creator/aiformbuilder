"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    content: "FormCraftAI has completely transformed how we collect data. What used to take days now takes minutes.",
    author: "Sarah Johnson",
    role: "Director of Marketing",
    company: "TechCorp",
  },
  {
    content:
      "The AI-powered form creation is mind-blowing. I just describe what I need, and it creates the perfect form.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLabs",
  },
  {
    content:
      "The insights we get from the response analysis have helped us make better business decisions faster than ever.",
    author: "Jessica Williams",
    role: "Data Analyst",
    company: "DataDriven Inc.",
  }
]

export function Testimonials() {
  return (
    <section className="bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-purple-400">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Loved by Developers worldwide</p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-gray-900 p-8 border border-gray-800"
              >
                <p className="text-lg leading-7 text-white">"{testimonial.content}"</p>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-300 font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm leading-6 text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

