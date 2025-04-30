'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

// AI tool comparison data
const aiTools = [
  {
    name: 'ChatGPT',
    category: 'Text Generation',
    description: 'Versatile conversational AI assistant with strong text generation capabilities',
    strengths: ['Natural conversations', 'Broad knowledge base', 'Code assistance'],
    weaknesses: ['Occasional inaccuracies', 'Limited context window', 'No real-time data'],
    rating: 4.7,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Midjourney',
    category: 'Image Generation',
    description: 'Powerful AI image generator with photorealistic and artistic capabilities',
    strengths: ['Stunning visual quality', 'Creative versatility', 'Strong style control'],
    weaknesses: ['Subscription required', 'Learning curve for prompts', 'Limited editing'],
    rating: 4.8,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'GitHub Copilot',
    category: 'Coding Assistant',
    description: 'AI pair programmer that helps developers write code faster and with fewer bugs',
    strengths: ['Code completions', 'Language versatility', 'IDE integration'],
    weaknesses: ['Occasional inaccurate suggestions', 'Subscription cost', 'Privacy concerns'],
    rating: 4.6,
    color: 'from-violet-500 to-purple-600'
  }
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {

  const [hoveredTool, setHoveredTool] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                AI Compass
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/browse-tools"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/compare-tools"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
              >
                Compare
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-sm transition-all hover:shadow-md"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative px-6 pt-20 pb-16 lg:px-8 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg className="absolute left-[calc(50%-33rem)] top-9 -z-10 transform-gpu blur-3xl" aria-hidden="true" viewBox="0 0 1155 678">
            <path fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
            <defs>
              <linearGradient id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl mb-6">
              Navigate the AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">landscape</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Compare AI tools with precision and clarity. Find the perfect AI solution for your specific needs with data-driven insights and expert analysis.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/compare"
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
                >
                  Start comparing
                </Link>
              </motion.div>
              <Link
                href="/explore"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white group"
              >
                Explore tools <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured comparison section */}
      <section className="py-16 px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase"
              variants={fadeIn}
            >
              Featured Comparisons
            </motion.h2>
            <motion.p
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
              variants={fadeIn}
            >
              Popular AI Tools Head-to-Head
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredTool(index)}
                onHoverEnd={() => setHoveredTool(null)}
              >
                <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">{tool.category}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                      {tool.rating}/5
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>

                  <div className="mt-6">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Strengths</h4>
                    <ul className="mt-2 space-y-1">
                      {tool.strengths.map((strength, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weaknesses</h4>
                    <ul className="mt-2 space-y-1">
                      {tool.weaknesses.map((weakness, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <svg className="w-3.5 h-3.5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      href={`/tool/${tool.name.toLowerCase()}`}
                      className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      Detailed analysis
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase"
              variants={fadeIn}
            >
              Why Choose AI Compass
            </motion.h2>
            <motion.p
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
              variants={fadeIn}
            >
              Make informed decisions with our unique approach
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={staggerContainer}
          >
            <motion.div
              className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detailed Metrics</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Compare AI tools across 50+ standardized metrics to find the perfect match for your specific requirements.
              </p>
            </motion.div>

            <motion.div
              className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Real-time Updates</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Our data is constantly updated to reflect the latest features, pricing changes, and performance benchmarks.
              </p>
            </motion.div>

            <motion.div
              className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Community Insights</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Benefit from thousands of verified user reviews and expert analysis to get beyond the marketing claims.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="absolute inset-0 mix-blend-multiply opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:py-24 lg:px-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Find your perfect AI match today
                </h2>
                <p className="mt-6 text-lg leading-8 text-indigo-100">
                  Join thousands of professionals who use AI Compass to make better technology decisions.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/signup"
                      className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                    >
                      Create free account
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
              &copy; 2023 AI Compass. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
