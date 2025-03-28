"use client"

import { motion } from "framer-motion"
import { 
  FileText, 
  Download, 
  Trash2, 
  FileCheck2, 
  FilePlus2 
} from "lucide-react"

export default function Features() {
  return (
    <div className="bg-gray-950 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">Powerful AI Form Builder</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create, Manage, and Export Forms Effortlessly
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            FormCraftAI empowers you to create, manipulate, and export forms with cutting-edge AI technology.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="h-5 w-5 flex-none text-purple-400">
                  <FilePlus2 />
                </div>
                AI-Powered Form Creation
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                <p className="flex-auto">
                  Leverage advanced AI to generate sophisticated forms instantly. Describe your needs, and watch as the perfect form takes shape.
                </p>
              </dd>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="h-5 w-5 flex-none text-purple-400">
                  <Trash2 />
                </div>
                Easy Form Management
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                <p className="flex-auto">
                  Seamlessly delete, modify, and organize your forms with intuitive controls and smart management tools.
                </p>
              </dd>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <div className="h-5 w-5 flex-none text-purple-400">
                  <Download />
                </div>
                Versatile Export Options
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                <p className="flex-auto">
                  Export your forms and their responses with a single click. Support for CSV and PDF formats ensures maximum flexibility.
                </p>
              </dd>
            </motion.div>
          </dl>
        </div>
      </div>
    </div>
  )
}