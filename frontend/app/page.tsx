// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import Navigation from "@/components/navigation"
// import AnimatedBackground from "@/components/animated-background"
// import { Heart, Brain, Watch, Activity, MessageCircle, TrendingUp } from "lucide-react"

// export default function LandingPage() {
//   const [scrollY, setScrollY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const features = [
//     {
//       icon: Brain,
//       title: "AI Symptom Checker",
//       description: "Intelligent analysis of your symptoms using advanced AI algorithms",
//       color: "from-cyan-400 to-blue-600",
//     },
//     {
//       icon: TrendingUp,
//       title: "Chronic Disease Prediction",
//       description: "Predict health risks before they become serious",
//       color: "from-purple-400 to-pink-600",
//     },
//     {
//       icon: Watch,
//       title: "Wearable Integration",
//       description: "Seamless sync with your favorite health devices",
//       color: "from-lime-300 to-green-600",
//     },
//     {
//       icon: Activity,
//       title: "AI Health Plans",
//       description: "Personalized health recommendations tailored to you",
//       color: "from-orange-300 to-red-600",
//     },
//     {
//       icon: MessageCircle,
//       title: "Telehealth Chatbot",
//       description: "24/7 AI doctor available for your health concerns",
//       color: "from-blue-300 to-cyan-600",
//     },
//     {
//       icon: Heart,
//       title: "Real-Time Monitoring",
//       description: "Live vitals tracking with continuous health alerts",
//       color: "from-pink-300 to-rose-600",
//     },
//   ]

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       <AnimatedBackground />
//       <Navigation />

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto w-full">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="z-10"
//           >
//             <motion.h1
//               className="text-5xl md:text-7xl font-bold mb-6 text-balance text-gradient-cyan-purple"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//             >
//               HealthAI Guardian
//             </motion.h1>

//             <motion.p
//               className="text-xl md:text-2xl text-slate-300 mb-8 text-balance"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//             >
//               AI-Driven Predictive Health Monitoring System
//             </motion.p>

//             <motion.p
//               className="text-lg text-slate-400 mb-12 text-balance"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//             >
//               Experience the future of healthcare with real-time monitoring, predictive analytics, and personalized AI
//               health guidance.
//             </motion.p>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//             >
//               <Link href="/auth/signup">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 hover:shadow-lg hover-lift"
//                 >
//                   Get Started
//                 </motion.button>
//               </Link>

//               <Link href="/symptom-checker">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-3 rounded-lg font-semibold glass text-white border border-cyan-400/40 hover:border-cyan-300 hover-lift"
//                 >
//                   Try Symptom Checker
//                 </motion.button>
//               </Link>

//               <Link href="/dashboard">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-3 rounded-lg font-semibold glass text-white border border-purple-400/40 hover:border-purple-300 hover-lift"
//                 >
//                   View Demo Dashboard
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* Floating animated heartbeat */}
//           <motion.div
//             className="relative h-96 flex items-center justify-center"
//             animate={{ y: [0, 20, 0] }}
//             transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//           >
//             <div className="relative w-full h-full flex items-center justify-center">
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-glow-pulse" />

//               <motion.div
//                 className="relative z-10 w-48 h-48 rounded-full glass-dark flex items-center justify-center"
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
//               >
//                 <Heart className="w-24 h-24 text-cyan-400 animate-heartbeat" />
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="relative py-20 px-4 md:px-8">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
//             <p className="text-xl text-slate-400">Everything you need for comprehensive health monitoring</p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 className="group glass rounded-xl p-8 hover-lift"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1, duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2 mb-4`}>
//                   <feature.icon className="w-full h-full text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
//                 <p className="text-slate-400">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <motion.section
//         className="relative py-20 px-4 md:px-8"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-4xl mx-auto">
//           <div className="glass-dark rounded-2xl p-12 text-center border border-cyan-400/30">
//             <h2 className="text-4xl font-bold text-white mb-6">Ready to Monitor Your Health?</h2>
//             <p className="text-xl text-slate-300 mb-8">
//               Join thousands using HealthAI Guardian for preventive healthcare
//             </p>
//             <Link href="/auth/signup">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-10 py-4 rounded-lg font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 text-lg hover-lift"
//               >
//                 Start Your Free Trial
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   )
// }