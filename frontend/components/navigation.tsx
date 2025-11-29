// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Heart, Menu, X } from "lucide-react"
// import { usePathname } from "next/navigation"

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const pathname = usePathname()

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const navLinks = [
//     { href: "/dashboard", label: "Dashboard" },
//     { href: "/symptom-checker", label: "Symptoms" },
//     { href: "/predict", label: "Predict" },
//     { href: "/vitals", label: "Live Vitals" },
//     { href: "/health-plan", label: "Health Plan" },
//     { href: "/chat", label: "Doctor Chat" },
//   ]

//   const isActive = (href: string) => pathname === href

//   return (
//     <motion.nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-dark" : ""}`}
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-400/30 transition-shadow">
//             <Heart className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-xl font-bold text-gradient-cyan-purple hidden md:inline">HealthAI</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-1">
//           {navLinks.map((link) => (
//             <Link key={link.href} href={link.href}>
//               <motion.div
//                 className="relative px-4 py-2 text-slate-300 hover:text-white transition-colors"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {link.label}
//                 {isActive(link.href) && (
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
//                     layoutId="underline"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </motion.div>
//             </Link>
//           ))}
//         </div>

//         {/* Auth Buttons */}
//         <div className="hidden md:flex items-center gap-4">
//           <Link href="/auth/login">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
//             >
//               Sign In
//             </motion.button>
//           </Link>
//           <Link href="/auth/signup">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 hover-lift"
//             >
//               Sign Up
//             </motion.button>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-cyan-400 hover:text-cyan-300">
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           className="md:hidden glass-dark border-t border-cyan-400/20"
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//         >
//           <div className="flex flex-col gap-2 px-4 py-4">
//             {navLinks.map((link) => (
//               <Link key={link.href} href={link.href}>
//                 <motion.div
//                   className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   {link.label}
//                 </motion.div>
//               </Link>
//             ))}
//             <Link href="/auth/login">
//               <motion.button className="w-full px-4 py-2 text-slate-300 hover:text-white transition-colors">
//                 Sign In
//               </motion.button>
//             </Link>
//             <Link href="/auth/signup">
//               <motion.button className="w-full px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900">
//                 Sign Up
//               </motion.button>
//             </Link>
//           </div>
//         </motion.div>
//       )}
//     </motion.nav>
//   )
// }