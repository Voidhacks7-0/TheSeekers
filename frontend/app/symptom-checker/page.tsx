// "use client"

// import type React from "react"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { Search, Send, AlertCircle } from "lucide-react"
// import Navigation from "@/components/navigation"
// import AnimatedBackground from "@/components/animated-background"

// interface Symptom {
//   condition: string
//   severity: "low" | "medium" | "high"
//   advice: string
//   action: string
// }

// const mockResults: Symptom[] = [
//   {
//     condition: "Common Cold",
//     severity: "low",
//     advice: "Rest, stay hydrated, and monitor symptoms. Most cases resolve in 7-10 days.",
//     action: "Monitor symptoms",
//   },
//   {
//     condition: "Seasonal Allergies",
//     severity: "low",
//     advice: "Consider antihistamines and avoid allergen triggers. Consult with doctor if symptoms persist.",
//     action: "Manage triggers",
//   },
//   {
//     condition: "Mild Fever",
//     severity: "medium",
//     advice: "Take over-the-counter fever reducers and stay hydrated. Seek medical attention if fever persists.",
//     action: "Schedule checkup",
//   },
// ]

// const getSeverityColor = (severity: string) => {
//   switch (severity) {
//     case "low":
//       return "border-lime-400 bg-lime-400/10"
//     case "medium":
//       return "border-orange-400 bg-orange-400/10"
//     case "high":
//       return "border-red-400 bg-red-400/10"
//     default:
//       return "border-cyan-400 bg-cyan-400/10"
//   }
// }

// export default function SymptomCheckerPage() {
//   const [symptoms, setSymptoms] = useState("")
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [results, setResults] = useState<Symptom[] | null>(null)

//   const handleSubmit = async () => {
//     if (!symptoms.trim()) return

//     setIsAnalyzing(true)
//     // Simulate AI analysis
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     setResults(mockResults)
//     setIsAnalyzing(false)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !isAnalyzing) {
//       handleSubmit()
//     }
//   }

//   return (
//     <div className="relative min-h-screen">
//       <AnimatedBackground />
//       <Navigation />

//       <div className="pt-20 px-4 md:px-8 pb-20">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AI Symptom Checker</h1>
//             <p className="text-xl text-slate-400">Describe your symptoms and let our AI analyze them</p>
//           </motion.div>

//           {/* Input Section */}
//           <motion.div
//             className="glass-dark rounded-2xl p-8 border border-cyan-400/20 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <label className="block text-white font-semibold mb-4">Your Symptoms</label>
//             <div className="relative">
//               <Search className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
//               <textarea
//                 value={symptoms}
//                 onChange={(e) => setSymptoms(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="e.g., I have a headache, sore throat, and mild fever for 2 days..."
//                 className="w-full pl-12 pr-4 py-3 rounded-lg glass border border-cyan-400/30 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none h-32"
//               />
//             </div>

//             <motion.button
//               onClick={handleSubmit}
//               disabled={isAnalyzing || !symptoms.trim()}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="mt-6 w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 hover:shadow-lg hover:shadow-cyan-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isAnalyzing ? (
//                 <>
//                   <motion.div
//                     className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                   />
//                   Analyzing...
//                 </>
//               ) : (
//                 <>
//                   <Send size={20} />
//                   Analyze Symptoms
//                 </>
//               )}
//             </motion.button>
//           </motion.div>

//           {/* Results Section */}
//           {results && (
//             <motion.div
//               className="space-y-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="glass-dark rounded-2xl p-6 border border-orange-400/30 flex gap-4">
//                 <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
//                 <div>
//                   <h3 className="font-semibold text-white mb-1">Disclaimer</h3>
//                   <p className="text-slate-400 text-sm">
//                     This AI analysis is for informational purposes only. Please consult with a healthcare professional
//                     for accurate diagnosis and treatment.
//                   </p>
//                 </div>
//               </div>

//               {results.map((result, idx) => (
//                 <motion.div
//                   key={idx}
//                   className={`glass-dark rounded-2xl p-8 border-2 ${getSeverityColor(result.severity)}`}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1, duration: 0.5 }}
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <h3 className="text-2xl font-bold text-white">{result.condition}</h3>
//                     <span
//                       className={`px-4 py-1 rounded-full font-semibold text-sm ${
//                         result.severity === "low"
//                           ? "bg-lime-400/20 text-lime-300"
//                           : result.severity === "medium"
//                             ? "bg-orange-400/20 text-orange-300"
//                             : "bg-red-400/20 text-red-300"
//                       }`}
//                     >
//                       {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Risk
//                     </span>
//                   </div>

//                   <p className="text-slate-300 mb-6">{result.advice}</p>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 hover:shadow-lg hover:shadow-cyan-400/40 transition-all"
//                   >
//                     {result.action}
//                   </motion.button>
//                 </motion.div>
//               ))}

//               {/* Consultation CTA */}
//               <motion.div
//                 className="glass-dark rounded-2xl p-8 border border-cyan-400/30 text-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <h3 className="text-2xl font-bold text-white mb-4">Need Professional Help?</h3>
//                 <p className="text-slate-400 mb-6">Talk to our AI doctor for more detailed guidance</p>
//                 <Link href="/chat">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/40 transition-all"
//                   >
//                     Chat with AI Doctor
//                   </motion.button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           )}

//           {!results && !isAnalyzing && (
//             <motion.div
//               className="text-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <p className="text-slate-500">Enter your symptoms above to get started</p>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }