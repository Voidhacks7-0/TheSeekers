"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    localStorage.setItem("userEmail", email)
    window.location.href = "/dashboard"
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />

      <motion.div
        className="glass-dark rounded-2xl p-8 md:p-12 w-full max-w-md border border-cyan-400/30"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="block mb-8">
          <motion.h1 className="text-3xl font-bold text-gradient-cyan-purple text-center" whileHover={{ scale: 1.05 }}>
            HealthAI Guardian
          </motion.h1>
        </Link>

        <p className="text-center text-slate-400 mb-8">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg glass border border-cyan-400/30 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-lg glass border border-cyan-400/30 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-cyan-400 hover:text-cyan-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-slate-400">Remember me</span>
            </label>
            <Link href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 hover:shadow-lg hover:shadow-cyan-400/40 transition-all"
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-sm text-slate-500">or</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-slate-400">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}