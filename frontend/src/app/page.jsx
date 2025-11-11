'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconArrowRight, IconSparkles, IconChartBar, IconUsers, IconRocket, IconShieldCheck, IconBrandOpenai, IconTrendingUp, IconStar, IconCheck, IconX, IconExternalLink } from '@tabler/icons-react'
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
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
			{/* Navigation */}
			<nav className="backdrop-blur-md bg-gray-900/95 sticky top-0 z-50 border-b border-gray-800/50 shadow-lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<motion.div
								className="flex items-center gap-2"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5 }}
							>
								<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
									<IconBrandOpenai className="w-6 h-6 text-white" />
								</div>
								<span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
									AI Compass
								</span>
							</motion.div>
						</div>
						<div className="flex items-center space-x-2">
							<Link
								href="/browse-tools"
								className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
							>
								Explore
							</Link>
							<Link
								href="/user/compare-tools"
								className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
							>
								Compare
							</Link>
							{isLoggedIn ? (
								<Link
									href={
										userRole === 'admin'
											? '/admin/page'
											: '/user/profile'
									}
									className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105"
								>
									Dashboard
								</Link>
							) : (
								<Link
									href="/login"
									className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105"
								>
									Sign In
								</Link>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Hero section */}
			<section className="relative px-6 pt-24 pb-20 lg:px-8 overflow-hidden">
				{/* Animated Background */}
				<motion.div
					className="absolute inset-0 -z-10 overflow-hidden"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
				</motion.div>

				<div className="mx-auto max-w-7xl">
					<motion.div
						className="text-center"
						initial="hidden"
						animate="visible"
						variants={fadeIn}
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-8"
						>
							<IconSparkles className="w-5 h-5 text-pink-400" />
							<span className="text-pink-300 text-sm font-semibold">Your AI Tool Discovery Platform</span>
						</motion.div>

						<h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl mb-6">
							Navigate the AI{' '}
							<span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
								Landscape
							</span>
						</h1>
						<p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
							Discover, compare, and choose the perfect AI tools for your needs.
							Make informed decisions with expert insights and real-time data.
						</p>

						<div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									href="/browse-tools"
									className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-pink-500/50 transition-all"
								>
									<IconRocket className="w-5 h-5" />
									Explore AI Tools
									<IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									href="/user/compare-tools"
									className="flex items-center gap-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-8 py-4 text-base font-semibold text-white hover:bg-gray-700/50 transition-all"
								>
									<IconChartBar className="w-5 h-5" />
									Compare Tools
								</Link>
							</motion.div>
						</div>

						{/* Stats */}
						{/* <motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
						>
							{[
								{ icon: IconBrandOpenai, label: '500+ AI Tools', color: 'from-blue-500 to-cyan-500' },
								{ icon: IconUsers, label: '10K+ Users', color: 'from-purple-500 to-pink-500' },
								{ icon: IconStar, label: '4.9/5 Rating', color: 'from-yellow-500 to-orange-500' },
							].map((stat, index) => (
								<div key={index} className="flex flex-col items-center">
									<div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-2`}>
										<stat.icon className="w-6 h-6 text-white" />
									</div>
									<span className="text-2xl font-bold text-white">{stat.label.split(' ')[0]}</span>
									<span className="text-gray-400 text-sm">{stat.label.split(' ').slice(1).join(' ')}</span>
								</div>
							))}
						</motion.div> */}
					</motion.div>
				</div>
			</section>

			{/* Featured comparison section */}
			<section className="py-20 px-6 lg:px-8 bg-gray-900/50">
				<motion.div
					className="mx-auto max-w-7xl"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
					variants={staggerContainer}
				>
					<div className="text-center mb-16">
						<motion.div
							variants={fadeIn}
							className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-4"
						>
							<IconTrendingUp className="w-5 h-5 text-pink-400" />
							<span className="text-pink-300 text-sm font-semibold">Featured Comparisons</span>
						</motion.div>
						<motion.p
							className="mt-2 text-4xl font-bold text-white"
							variants={fadeIn}
						>
							Popular AI Tools Head-to-Head
						</motion.p>
						<motion.p
							className="mt-4 text-gray-400 max-w-2xl mx-auto"
							variants={fadeIn}
						>
							See how the most popular AI tools stack up against each other
						</motion.p>
					</div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-6"
						variants={staggerContainer}
					>
						{aiTools.map((tool, index) => (
							<motion.div
								key={tool.name}
								className="relative overflow-hidden rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300"
								variants={fadeIn}
								whileHover={{ y: -8, scale: 1.02 }}
								onHoverStart={() => setHoveredTool(index)}
								onHoverEnd={() => setHoveredTool(null)}
							>
								<div className={`h-1.5 bg-gradient-to-r ${tool.color}`} />
								<div className="p-6">
									<div className="flex justify-between items-start mb-4">
										<div>
											<h3 className="text-2xl font-bold text-white mb-1">
												{tool.name}
											</h3>
											<p className="text-sm font-medium text-purple-400">
												{tool.category}
											</p>
										</div>
										<div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-3 py-1">
											<IconStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
											<span className="text-sm font-bold text-yellow-300">{tool.rating}</span>
										</div>
									</div>
									<p className="text-sm text-gray-300 leading-relaxed mb-6">
										{tool.description}
									</p>

									<div className="mb-6">
										<h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
											<IconCheck className="w-4 h-4" />
											Strengths
										</h4>
										<ul className="space-y-2">
											{tool.strengths.map((strength, i) => (
												<li
													key={i}
													className="text-sm text-gray-300 flex items-start gap-2 bg-green-500/5 p-2 rounded-lg border border-green-500/10"
												>
													<IconCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
													<span>{strength}</span>
												</li>
											))}
										</ul>
									</div>

									<div className="mb-6">
										<h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
											<IconX className="w-4 h-4" />
											Weaknesses
										</h4>
										<ul className="space-y-2">
											{tool.weaknesses.map((weakness, i) => (
												<li
													key={i}
													className="text-sm text-gray-300 flex items-start gap-2 bg-red-500/5 p-2 rounded-lg border border-red-500/10"
												>
													<IconX className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
													<span>{weakness}</span>
												</li>
											))}
										</ul>
									</div>

									<div className="pt-4 border-t border-gray-700/50">
										<Link
											href={`/browse-tools`}
											className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
										>
											View Detailed Analysis
											<IconExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</section>

			{/* Features section */}
			<section className="py-20 px-6 lg:px-8">
				<motion.div
					className="mx-auto max-w-7xl"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
					variants={staggerContainer}
				>
					<div className="text-center mb-16">
						<motion.div
							variants={fadeIn}
							className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-4"
						>
							<IconShieldCheck className="w-5 h-5 text-pink-400" />
							<span className="text-pink-300 text-sm font-semibold">Why Choose Us</span>
						</motion.div>
						<motion.p
							className="mt-2 text-4xl font-bold text-white"
							variants={fadeIn}
						>
							Make Informed Decisions
						</motion.p>
						<motion.p
							className="mt-4 text-gray-400 max-w-2xl mx-auto"
							variants={fadeIn}
						>
							Everything you need to find and compare the best AI tools for your projects
						</motion.p>
					</div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-8"
						variants={staggerContainer}
					>
						{[
							{
								icon: IconChartBar,
								title: 'Detailed Metrics',
								description: 'Compare AI tools across 50+ standardized metrics including performance, pricing, features, and user ratings.',
								color: 'from-blue-500 to-cyan-500'
							},
							{
								icon: IconTrendingUp,
								title: 'Real-time Updates',
								description: 'Stay current with the latest features, pricing changes, and performance benchmarks updated daily.',
								color: 'from-purple-500 to-pink-500'
							},
							{
								icon: IconUsers,
								title: 'Community Insights',
								description: 'Access thousands of verified user reviews and expert analysis to see beyond marketing claims.',
								color: 'from-yellow-500 to-orange-500'
							}
						].map((feature, index) => (
							<motion.div
								key={index}
								className="relative p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-purple-500/50 transition-all duration-300"
								variants={fadeIn}
								whileHover={{ y: -8 }}
							>
								<div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
									<feature.icon className="h-7 w-7 text-white" />
								</div>
								<h3 className="text-xl font-bold text-white mb-3">
									{feature.title}
								</h3>
								<p className="text-gray-300 leading-relaxed">
									{feature.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-6 lg:px-8">
				<motion.div
					className="mx-auto max-w-5xl"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeIn}
				>
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 p-12 shadow-2xl">
						<div className="absolute inset-0 bg-black/20"></div>
						<div className="relative text-center">
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.2 }}
							>
								<IconRocket className="w-16 h-16 text-white mx-auto mb-6" />
								<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
									Find Your Perfect AI Match Today
								</h2>
								<p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
									Join thousands of professionals who use AI Compass to discover and compare the best AI tools.
								</p>
								<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Link
											href="/signup"
											className="px-8 py-4 rounded-xl bg-white text-purple-600 text-base font-bold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all"
										>
											Create Free Account
										</Link>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Link
											href="/browse-tools"
											className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white text-white text-base font-bold hover:bg-white/20 transition-all"
										>
											Explore Tools
										</Link>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Footer */}
			<footer className="border-t border-gray-800/50 py-12 px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<div className="flex items-center justify-center gap-2 mb-4">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
							<IconBrandOpenai className="w-5 h-5 text-white" />
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
							AI Compass
						</span>
					</div>
					<p className="text-gray-400 text-sm">
						© 2025 AI Compass. Your trusted guide to AI tools.
					</p>
				</div>
			</footer>
		</div>
	)
}
