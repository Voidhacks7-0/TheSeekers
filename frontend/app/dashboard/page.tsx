"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Activity, Moon, Zap, TrendingUp, Pill, MessageSquare, Clock } from "lucide-react"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"
import DashboardCard from "@/components/dashboard-card"
import WaveformChart from "@/components/waveform-chart"

export default function DashboardPage() {
  const [userName, setUserName] = useState("User")
  const [vitals, setVitals] = useState({
    heartRate: 72,
    steps: 8234,
    sleep: 7.5,
    stress: 35,
  })

  useEffect(() => {
    const stored = localStorage.getItem("userName")
    if (stored) setUserName(stored)

    // Simulate live vitals
    const interval = setInterval(() => {
      setVitals((prev) => ({
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        steps: prev.steps + Math.floor(Math.random() * 50),
        sleep: prev.sleep,
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 3)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const shortcuts = [
    { icon: TrendingUp, label: "Predict Health Risks", href: "/predict", color: "from-purple-400 to-pink-600" },
    { icon: Pill, label: "Check Symptoms", href: "/symptom-checker", color: "from-cyan-400 to-blue-600" },
    { icon: Activity, label: "View Health Plan", href: "/health-plan", color: "from-lime-300 to-green-600" },
    { icon: MessageSquare, label: "Open AI Doctor", href: "/chat", color: "from-orange-300 to-red-600" },
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Hello, <span className="text-gradient-cyan-purple">{userName}</span> — Your Health at a Glance
            </h1>
            <p className="text-slate-400">Last updated: {new Date().toLocaleTimeString()}</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              icon={Heart}
              label="Heart Rate"
              value={Math.round(vitals.heartRate)}
              unit="BPM"
              color="text-rose-400"
              trend="up"
              delay={0.1}
            />
            <DashboardCard
              icon={Activity}
              label="Steps Today"
              value={vitals.steps}
              unit="steps"
              color="text-cyan-400"
              trend="up"
              delay={0.2}
            />
            <DashboardCard
              icon={Moon}
              label="Sleep Hours"
              value={vitals.sleep}
              unit="h"
              color="text-purple-400"
              trend="stable"
              delay={0.3}
            />
            <DashboardCard
              icon={Zap}
              label="Stress Level"
              value={Math.round(vitals.stress)}
              unit="%"
              color="text-lime-400"
              trend="down"
              delay={0.4}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="glass-dark rounded-2xl p-6 border border-cyan-400/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Daily Activity Trend</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full h-40 relative">
                  <svg viewBox="0 0 400 150" className="w-full h-full">
                    <polyline
                      points="0,120 50,80 100,100 150,60 200,80 250,40 300,70 350,30 400,50"
                      fill="none"
                      stroke="#23D4FF"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                    <polyline
                      points="0,120 50,80 100,100 150,60 200,80 250,40 300,70 350,30 400,50"
                      fill="url(#gradient1)"
                      fillOpacity="0.2"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#23D4FF" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#23D4FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-dark rounded-2xl p-6 border border-cyan-400/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Heart Rate Over Time</h3>
              <WaveformChart />
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {shortcuts.map((shortcut, idx) => (
                <Link key={idx} href={shortcut.href}>
                  <motion.div
                    className="glass-dark rounded-xl p-6 cursor-pointer border border-cyan-400/20 hover-lift flex flex-col items-center text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${shortcut.color} p-2 mb-3`}>
                      <shortcut.icon className="w-full h-full text-white" />
                    </div>
                    <span className="font-semibold text-white">{shortcut.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Last Check */}
          <motion.div
            className="glass-dark rounded-2xl p-6 border border-cyan-400/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-white">Last Health Check</h4>
                <p className="text-slate-400 text-sm">Today at 2:30 PM - All systems normal</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}