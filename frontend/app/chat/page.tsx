// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import Navigation from "@/components/navigation"
// import AnimatedBackground from "@/components/animated-background"
// import { Send, Phone, Paperclip } from "lucide-react"

// interface Message {
//   id: string
//   type: "user" | "doctor"
//   text: string
//   timestamp: Date
// }

// const mockResponses = [
//   "I'm here to help. Can you describe your symptoms in more detail?",
//   "Based on what you've shared, I'd recommend rest and hydration. Monitor your symptoms closely.",
//   "That's important information. Let me analyze this further.",
//   "Have you experienced any other symptoms recently?",
//   "I'd suggest scheduling a follow-up appointment with your healthcare provider.",
//   "Your health metrics look good overall. Keep up with your health plan.",
// ]

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       type: "doctor",
//       text: "Hello! I'm your AI health assistant. How can I help you today?",
//       timestamp: new Date(),
//     },
//   ])
//   const [input, setInput] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const endRef = useRef<HTMLDivElement>(null)

//   const scrollToBottom = () => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const handleSend = async () => {
//     if (!input.trim()) return

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: "user",
//       text: input,
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInput("")
//     setIsLoading(true)

//     // Simulate AI response
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     const doctorMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       type: "doctor",
//       text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, doctorMessage])
//     setIsLoading(false)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !isLoading) {
//       handleSend()
//     }
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col">
//       <AnimatedBackground />
//       <Navigation />

//       <div className="flex-1 flex flex-col pt-20 px-4 md:px-8">
//         <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
//           {/* Header */}
//           <motion.div
//             className="mb-6"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-white">AI Doctor Chat</h1>
//                 <p className="text-slate-400">24/7 Health Consultation</p>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="p-3 rounded-lg glass border border-cyan-400/30 hover:border-cyan-300 transition-colors"
//               >
//                 <Phone className="w-6 h-6 text-cyan-400" />
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Chat Area */}
//           <motion.div
//             className="flex-1 glass-dark rounded-2xl border border-cyan-400/20 p-6 overflow-y-auto mb-6 flex flex-col"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.1, duration: 0.5 }}
//           >
//             <div className="space-y-4 flex-1">
//               <AnimatePresence>
//                 {messages.map((message, idx) => (
//                   <motion.div
//                     key={message.id}
//                     className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div
//                       className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl p-4 ${
//                         message.type === "user"
//                           ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
//                           : "glass-dark border border-cyan-400/20 text-slate-100"
//                       }`}
//                     >
//                       <p className="text-sm">{message.text}</p>
//                       <p className={`text-xs mt-2 ${message.type === "user" ? "text-cyan-100" : "text-slate-500"}`}>
//                         {message.timestamp.toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {isLoading && (
//                 <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   <div className="glass-dark border border-cyan-400/20 rounded-2xl p-4 flex gap-2">
//                     {[0, 1, 2].map((i) => (
//                       <motion.div
//                         key={i}
//                         className="w-2 h-2 rounded-full bg-cyan-400"
//                         animate={{ scale: [1, 1.3, 1] }}
//                         transition={{
//                           duration: 0.6,
//                           repeat: Number.POSITIVE_INFINITY,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               <div ref={endRef} />
//             </div>
//           </motion.div>

//           {/* Input Area */}
//           <motion.div
//             className="glass-dark rounded-2xl border border-cyan-400/20 p-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <div className="flex gap-3 items-end">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="p-2 rounded-lg glass border border-cyan-400/30 hover:border-cyan-300 transition-colors flex-shrink-0"
//               >
//                 <Paperclip className="w-5 h-5 text-cyan-400" />
//               </motion.button>

//               <div className="flex-1">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your health question..."
//                   disabled={isLoading}
//                   className="w-full px-4 py-2 rounded-lg glass border border-cyan-400/30 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 transition-all disabled:opacity-50"
//                 />
//               </div>

//               <motion.button
//                 onClick={handleSend}
//                 disabled={isLoading || !input.trim()}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 hover:shadow-lg hover:shadow-cyan-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
//               >
//                 <Send className="w-5 h-5" />
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }