'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'
import { jwtDecode } from 'jwt-decode'

// AI tool comparison data
const aiTools = [
	{
		name: 'ChatGPT',
		category: 'Text Generation',
		description:
			'Versatile conversational AI assistant with strong text generation capabilities',
		strengths: [
			'Natural conversations',
			'Broad knowledge base',
			'Code assistance',
		],
		weaknesses: [
			'Occasional inaccuracies',
			'Limited context window',
			'No real-time data',
		],
		rating: 4.7,
		color: 'from-blue-400 to-teal-500',
	},
	{
		name: 'Midjourney',
		category: 'Image Generation',
		description:
			'Powerful AI image generator with photorealistic and artistic capabilities',
		strengths: [
			'Stunning visual quality',
			'Creative versatility',
			'Strong style control',
		],
		weaknesses: [
			'Subscription required',
			'Learning curve for prompts',
			'Limited editing',
		],
		rating: 4.8,
		color: 'from-blue-500 to-teal-600',
	},
	{
		name: 'GitHub Copilot',
		category: 'Coding Assistant',
		description:
			'AI pair programmer that helps developers write code faster and with fewer bugs',
		strengths: ['Code completions', 'Language versatility', 'IDE integration'],
		weaknesses: [
			'Occasional inaccurate suggestions',
			'Subscription cost',
			'Privacy concerns',
		],
		rating: 4.6,
		color: 'from-teal-500 to-blue-600',
	},
]

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
}

export default function Home() {
	const [hoveredTool, setHoveredTool] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userRole, setUserRole] = useState(null)

	useEffect(() => {
		// Check if user is logged in
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const decodedToken = jwtDecode(token)
				setIsLoggedIn(true)
				setUserRole(decodedToken.role)
			} catch (error) {
				console.error('Invalid token:', error)
				localStorage.removeItem('token')
			}
		}
	}, [])

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#0A0118] to-[#1A1625]">
			{/* Navigation */}
			<nav className="backdrop-blur-md bg-[#1A1625]/80 sticky top-0 z-10 border-b border-[#2A2438]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<motion.div
								className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-600"
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
								className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-teal-400 transition-colors"
							>
								Explore
							</Link>
							<Link
								href="/compare-tools"
								className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-teal-400 transition-colors"
							>
								Compare
							</Link>
							{isLoggedIn ? (
								<Link
									href={
										userRole === 'admin'
											? '/admin/profile'
											: '/user/profile'
									}
									className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 shadow-sm transition-all hover:shadow-md"
								>
									Profile
								</Link>
							) : (
								<Link
									href="/login"
									className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 shadow-sm transition-all hover:shadow-md"
								>
									Sign In
								</Link>
							)}
						</div>
					</div>
				</div>
			</nav>
			{/* <Navbar /> */}

			{/* Hero section */}
			<section className="relative px-6 pt-20 pb-16 lg:px-8 overflow-hidden">
				<motion.div
					className="absolute inset-0 -z-10 overflow-hidden"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<svg
						className="absolute left-[calc(50%-33rem)] top-9 -z-10 transform-gpu blur-3xl"
						aria-hidden="true"
						viewBox="0 0 1155 678"
					>
						<path
							fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)"
							fillOpacity=".3"
							d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
						/>
						<defs>
							<linearGradient
								id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff"
								x1="1155.49"
								x2="-78.208"
								y1=".177"
								y2="474.645"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#3B82F6" />
								<stop offset={1} stopColor="#14B8A6" />
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
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl mb-6">
							Navigate the AI{' '}
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-600">
								Landscape
							</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
							Compare AI tools with precision and clarity. Find the perfect AI
							solution for your specific needs with data-driven insights and expert
							analysis.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									href="/browse-tools"
									className="flex items-center rounded-xl bg-gradient-to-r from-blue-500 to-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
								>
									Explore Tools{' '}
									<span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
										<IconArrowRight />
									</span>
								</Link>
							</motion.div>
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
					viewport={{ once: true, margin: '-100px' }}
					variants={staggerContainer}
				>
					<div className="text-center mb-16">
						<motion.h2
							className="text-base font-semibold text-blue-400 tracking-wide uppercase"
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
								className="relative overflow-hidden rounded-2xl bg-[#1A1625] border border-[#2A2438] shadow-md hover:shadow-xl transition-all duration-300"
								variants={fadeIn}
								whileHover={{ y: -5 }}
								onHoverStart={() => setHoveredTool(index)}
								onHoverEnd={() => setHoveredTool(null)}
							>
								<div className={`h-2 bg-gradient-to-r ${tool.color}`} />
								<div className="p-6">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-xl font-bold text-gray-900 dark:text-white">
												{tool.name}
											</h3>
											<p className="text-sm text-indigo-600 dark:text-indigo-400">
												{tool.category}
											</p>
										</div>
										<span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
											{tool.rating}/5
										</span>
									</div>
									<p className="mt-4 text-sm text-gray-300 dark:text-gray-300">
										{tool.description}
									</p>

									<div className="mt-6">
										<h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
											Strengths
										</h4>
										<ul className="mt-2 space-y-1">
											{tool.strengths.map((strength, i) => (
												<li
													key={i}
													className="text-sm text-gray-300 dark:text-gray-300 flex items-center"
												>
													<svg
														className="w-3.5 h-3.5 mr-2 text-green-500"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M5 13l4 4L19 7"
														></path>
													</svg>
													{strength}
												</li>
											))}
										</ul>
									</div>

									<div className="mt-4">
										<h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
											Weaknesses
										</h4>
										<ul className="mt-2 space-y-1">
											{tool.weaknesses.map((weakness, i) => (
												<li
													key={i}
													className="text-sm text-gray-300 dark:text-gray-300 flex items-center"
												>
													<svg
														className="w-3.5 h-3.5 mr-2 text-red-500"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M6 18L18 6M6 6l12 12"
														></path>
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
											<svg
												className="ml-1 w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M9 5l7 7-7 7"
												></path>
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
			<section className="py-16 px-6 lg:px-8 bg-[#0A0118]">
				<motion.div
					className="mx-auto max-w-6xl"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
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
							className="relative p-6 bg-[#1A1625] border border-[#2A2438] rounded-2xl shadow-sm"
							variants={fadeIn}
							whileHover={{ y: -5 }}
						>
							<div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
								<svg
									className="h-6 w-6 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									></path>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								Detailed Metrics
							</h3>
							<p className="mt-4 text-gray-300 dark:text-gray-300">
								Compare AI tools across 50+ standardized metrics to find the
								perfect match for your specific requirements.
							</p>
						</motion.div>

						<motion.div
							className="relative p-6 bg-[#1A1625] border border-[#2A2438] rounded-2xl shadow-sm"
							variants={fadeIn}
							whileHover={{ y: -5 }}
						>
							<div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
								<svg
									className="h-6 w-6 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								Real-time Updates
							</h3>
							<p className="mt-4 text-gray-300 dark:text-gray-300">
								Our data is constantly updated to reflect the latest features,
								pricing changes, and performance benchmarks.
							</p>
						</motion.div>

						<motion.div
							className="relative p-6 bg-[#1A1625] border border-[#2A2438] rounded-2xl shadow-sm"
							variants={fadeIn}
							whileHover={{ y: -5 }}
						>
							<div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
								<svg
									className="h-6 w-6 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
									></path>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								Community Insights
							</h3>
							<p className="mt-4 text-gray-300 dark:text-gray-300">
								Benefit from thousands of verified user reviews and expert analysis
								to get beyond the marketing claims.
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
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-teal-600">
						<div className="absolute inset-0 mix-blend-multiply opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
						<div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:py-24 lg:px-16">
							<div className="mx-auto max-w-2xl text-center">
								<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
									Find your perfect AI match today
								</h2>
								<p className="mt-6 text-lg leading-8 text-indigo-100">
									Join thousands of professionals who use AI Compass to make
									better technology decisions.
								</p>
								<div className="mt-10 flex items-center justify-center gap-x-6">
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Link
											href="/signup"
											className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
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
		</div>
	)
}
