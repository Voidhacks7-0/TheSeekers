// "use client"

// import type React from "react"
// import { motion } from "framer-motion"
// import Navigation from "@/components/navigation"
// import AnimatedBackground from "@/components/animated-background"
// import { Apple, Dumbbell, Zap, Calendar, CheckCircle2 } from "lucide-react"

// interface PlanCard {
//   icon: React.ReactNode
//   title: string
//   items: string[]
// }

// const dietPlan: PlanCard = {
//   icon: <Apple className="w-8 h-8" />,
//   title: "Nutrition Plan",
//   items: [
//     "Breakfast: Oatmeal with berries and almonds",
//     "Snack: Greek yogurt with honey",
//     "Lunch: Grilled chicken with quinoa and vegetables",
//     "Dinner: Baked salmon with sweet potato",
//     "Stay hydrated: 8-10 glasses of water daily",
//   ],
// }

// const exercisePlan: PlanCard = {
//   icon: <Dumbbell className="w-8 h-8" />,
//   title: "Exercise Routine",
//   items: [
//     "Monday/Wednesday/Friday: 45 min cardio (running, cycling)",
//     "Tuesday/Thursday: Strength training (30 min)",
//     "Weekends: Yoga or walking (30-45 min)",
//     "Daily: 10,000 steps target",
//     "Cool down: Stretching exercises",
//   ],
// }

// const stressPlan: PlanCard = {
//   icon: <Zap className="w-8 h-8" />,
//   title: "Stress Management",
//   items: [
//     "Morning: 10 min meditation session",
//     "Midday: 5 min breathing exercises",
//     "Evening: Relaxation techniques",
//     "Weekly: Try a new stress relief activity",
//     "Sleep: 7-9 hours nightly",
//   ],
// }

// export default function HealthPlanPage() {
//   const plans = [
//     { ...dietPlan, color: "from-lime-400 to-green-500", delay: 0.1 },
//     { ...exercisePlan, color: "from-cyan-400 to-blue-500", delay: 0.2 },
//     { ...stressPlan, color: "from-purple-400 to-pink-500", delay: 0.3 },
//   ]

//   return (
//     <div className="relative min-h-screen">
//       <AnimatedBackground />
//       <Navigation />

//       <div className="pt-20 px-4 md:px-8 pb-20">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your AI Health Plan</h1>
//             <p className="text-xl text-slate-400">Personalized recommendations for your wellness journey</p>
//           </motion.div>

//           {/* Plan Cards */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 className="glass-dark rounded-2xl p-8 border border-cyan-400/20 hover-lift"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: plan.delay }}
//                 viewport={{ once: true }}
//               >
//                 <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${plan.color} p-2 mb-4`}>
//                   <div className="text-white">{plan.icon}</div>
//                 </div>

//                 <h2 className="text-2xl font-bold text-white mb-6">{plan.title}</h2>

//                 <ul className="space-y-3">
//                   {plan.items.map((item, itemIdx) => (
//                     <motion.li
//                       key={itemIdx}
//                       className="flex gap-3 text-slate-300"
//                       initial={{ opacity: 0, x: -10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: plan.delay + itemIdx * 0.05 }}
//                       viewport={{ once: true }}
//                     >
//                       <CheckCircle2 className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
//                       <span>{item}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>

//           {/* Schedule */}
//           <motion.div
//             className="glass-dark rounded-2xl p-8 border border-cyan-400/20 mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//               <Calendar className="w-6 h-6 text-cyan-400" />
//               Weekly Schedule
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
//               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, idx) => (
//                 <motion.div
//                   key={day}
//                   className="glass rounded-lg p-4 text-center border border-cyan-400/20"
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.5 + idx * 0.05 }}
//                   viewport={{ once: true }}
//                 >
//                   <p className="font-semibold text-white mb-2">{day}</p>
//                   <p className="text-sm text-slate-400">{idx % 2 === 0 ? "45min Cardio" : "30min Strength"}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Goals */}
//           <motion.div
//             className="glass-dark rounded-2xl p-8 border border-lime-400/20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-2xl font-bold text-white mb-6">Your Goals</h2>

//             <div className="space-y-4">
//               {[
//                 { goal: "Lose 5kg", progress: 35, color: "from-cyan-400 to-blue-500" },
//                 { goal: "Improve fitness level", progress: 65, color: "from-lime-400 to-green-500" },
//                 { goal: "Reduce stress", progress: 50, color: "from-purple-400 to-pink-500" },
//               ].map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.7 + idx * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-semibold text-white">{item.goal}</span>
//                     <span className="text-sm text-slate-400">{item.progress}%</span>
//                   </div>
//                   <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
//                     <motion.div
//                       className={`h-full bg-gradient-to-r ${item.color}`}
//                       initial={{ width: 0 }}
//                       whileInView={{ width: `${item.progress}%` }}
//                       transition={{ duration: 1 }}
//                       viewport={{ once: true }}
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }