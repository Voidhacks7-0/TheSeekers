"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Activity, Zap } from "lucide-react"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"

interface RiskMetrics {
  diabetes: number
  heart: number
  stress: number
  sleep: number
}

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: 35,
    bmi: 24,
    stepsPerDay: 8000,
    sleepHours: 7,
    heartRate: 72,
  })

  const [isPredicting, setIsPredicting] = useState(false)
  const [risks, setRisks] = useState<RiskMetrics | null>(null)

  const handleChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsPredicting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate risks based on inputs
    const diabetesRisk = Math.max(10, Math.min(95, formData.bmi * 3 + (35 - formData.age) * 0.5))
    const heartRisk = Math.max(5, Math.min(90, (formData.heartRate - 60) * 0.8 + (formData.sleepHours < 7 ? 20 : 0)))
    const stressRisk = Math.max(
      10,
      Math.min(85, 100 - (formData.stepsPerDay / 10000) * 40 - (formData.sleepHours - 6) * 10),
    )
    const sleepRisk = Math.max(5, Math.min(80, 100 - formData.sleepHours * 10))

    setRisks({
      diabetes: Math.round(diabetesRisk),
      heart: Math.round(heartRisk),
      stress: Math.round(stressRisk),
      sleep: Math.round(sleepRisk),
    })

    setIsPredicting(false)
  }

  const RiskGauge = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">{label}</span>
        <span className={`text-lg font-bold ${color}`}>{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color === "text-lime-400" ? "from-lime-400 to-green-500" : color === "text-orange-400" ? "from-orange-400 to-red-500" : "from-cyan-400 to-blue-500"}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </motion.div>
  )

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Predictive Analytics</h1>
            <p className="text-xl text-slate-400">Get personalized health risk predictions</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              className="glass-dark rounded-2xl p-8 border border-cyan-400/20 h-fit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Health Metrics</h2>

              {[
                { label: "Age", field: "age", min: 18, max: 100, unit: "years" },
                { label: "BMI", field: "bmi", min: 15, max: 40, unit: "kg/m²", step: 0.1 },
                { label: "Steps Per Day", field: "stepsPerDay", min: 0, max: 30000, unit: "steps" },
                { label: "Sleep Hours", field: "sleepHours", min: 3, max: 12, unit: "hours", step: 0.5 },
                { label: "Heart Rate", field: "heartRate", min: 40, max: 120, unit: "BPM" },
              ].map((input, idx) => (
                <motion.div
                  key={input.field}
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">{input.label}</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step || 1}
                      value={formData[input.field as keyof typeof formData]}
                      onChange={(e) => handleChange(input.field, Number.parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-slate-700 rounded-full cursor-pointer accent-cyan-400"
                    />
                    <div className="w-20 text-right">
                      <span className="font-semibold text-white">{formData[input.field as keyof typeof formData]}</span>
                      <span className="text-slate-400 text-sm ml-1">{input.unit}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.button
                onClick={handlePredict}
                disabled={isPredicting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPredicting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Calculate Risk Score
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Results */}
            {risks && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="glass-dark rounded-2xl p-8 border border-cyan-400/20">
                  <h2 className="text-2xl font-bold text-white mb-8">Your Risk Profile</h2>

                  <div className="space-y-8">
                    <RiskGauge
                      label="Diabetes Risk"
                      value={risks.diabetes}
                      color={
                        risks.diabetes > 50
                          ? "text-orange-400"
                          : risks.diabetes > 25
                            ? "text-orange-300"
                            : "text-lime-400"
                      }
                    />
                    <RiskGauge
                      label="Heart Disease Risk"
                      value={risks.heart}
                      color={risks.heart > 50 ? "text-red-400" : risks.heart > 25 ? "text-orange-300" : "text-lime-400"}
                    />
                    <RiskGauge
                      label="Stress Risk"
                      value={risks.stress}
                      color={
                        risks.stress > 50 ? "text-orange-400" : risks.stress > 25 ? "text-yellow-300" : "text-lime-400"
                      }
                    />
                    <RiskGauge
                      label="Sleep Disorder Risk"
                      value={risks.sleep}
                      color={
                        risks.sleep > 50 ? "text-orange-400" : risks.sleep > 25 ? "text-yellow-300" : "text-lime-400"
                      }
                    />
                  </div>
                </div>

                {/* Recommendations */}
                <motion.div
                  className="glass-dark rounded-2xl p-6 border border-lime-400/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-lime-400" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    {risks.diabetes > 50 && <li>• Increase physical activity and monitor diet closely</li>}
                    {risks.heart > 50 && <li>• Schedule a cardiovascular checkup with your doctor</li>}
                    {risks.stress > 50 && <li>• Practice meditation and stress management techniques</li>}
                    {risks.sleep > 50 && <li>• Establish a consistent sleep schedule</li>}
                    <li>• Get personalized health plan recommendations</li>
                  </ul>

                  <Link href="/health-plan">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-lime-400 to-green-500 text-slate-900 hover:shadow-lg hover:shadow-lime-400/40 transition-all"
                    >
                      View Personalized Plan
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {!risks && (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-slate-500 text-lg">Enter your health metrics to get predictions</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}