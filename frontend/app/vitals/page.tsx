"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"
import WaveformChart from "@/components/waveform-chart"
import VitalCard from "@/components/vital-card"
import { Heart, Wind, Activity, AlertCircle } from "lucide-react"

export default function VitalsPage() {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    oxygen: 98,
    stressIndex: 35,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) => ({
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 5)),
        oxygen: Math.max(95, Math.min(100, prev.oxygen + (Math.random() - 0.5) * 1)),
        stressIndex: Math.max(0, Math.min(100, prev.stressIndex + (Math.random() - 0.5) * 4)),
      }))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 px-4 md:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Live Vitals Monitor</h1>
            <p className="text-xl text-slate-400">Real-time health monitoring</p>
          </motion.div>

          {/* Live Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <VitalCard
              icon={Heart}
              label="Heart Rate"
              value={Math.round(vitals.heartRate)}
              unit="BPM"
              color="text-rose-400"
              bgGradient="from-rose-500/10 to-rose-600/10"
              delay={0.1}
            />
            <VitalCard
              icon={Wind}
              label="Oxygen Level"
              value={vitals.oxygen.toFixed(1)}
              unit="%"
              color="text-cyan-400"
              bgGradient="from-cyan-500/10 to-blue-600/10"
              delay={0.2}
            />
            <VitalCard
              icon={Activity}
              label="Stress Index"
              value={Math.round(vitals.stressIndex)}
              unit="/100"
              color="text-lime-400"
              bgGradient="from-lime-500/10 to-green-600/10"
              delay={0.3}
            />
          </div>

          {/* ECG Waveform */}
          <motion.div
            className="glass-dark rounded-2xl p-8 border border-cyan-400/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Heart Rate Waveform (ECG)</h2>
            <WaveformChart />
          </motion.div>

          {/* Status & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Status */}
            <motion.div
              className="glass-dark rounded-2xl p-8 border border-lime-400/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Overall Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                  <span className="text-white font-semibold">Heart Rate</span>
                  <span className="text-lime-400">Normal</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-lg">
                  <span className="text-white font-semibold">Oxygen Levels</span>
                  <span className="text-cyan-400">Excellent</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                  <span className="text-white font-semibold">Stress Level</span>
                  <span className="text-lime-400">Low</span>
                </div>
              </div>
            </motion.div>

            {/* Alerts & Warnings */}
            <motion.div
              className="glass-dark rounded-2xl p-8 border border-orange-400/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                Alerts & Warnings
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                  <p className="text-green-300 font-semibold">✓ All vitals normal</p>
                  <p className="text-slate-400 text-sm">No concerning patterns detected</p>
                </div>
                <motion.div
                  className="p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-lg"
                  animate={{
                    borderColor: ["rgb(34, 212, 255, 0.3)", "rgb(34, 212, 255, 0.6)", "rgb(34, 212, 255, 0.3)"],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <p className="text-cyan-300 font-semibold">→ Live monitoring active</p>
                  <p className="text-slate-400 text-sm">Continuous real-time tracking enabled</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}