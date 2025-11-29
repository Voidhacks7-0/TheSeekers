"use client"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface VitalCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit: string
  color: string
  bgGradient: string
  delay: number
}

export default function VitalCard({ icon: Icon, label, value, unit, color, bgGradient, delay }: VitalCardProps) {
  return (
    <motion.div
      className={`glass-dark rounded-2xl p-8 border border-cyan-400/20 bg-gradient-to-br ${bgGradient} hover-lift`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-cyan-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <p className="text-slate-400 text-sm font-medium mb-3">{label}</p>

      <motion.div
        className="flex items-baseline gap-2"
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-4xl font-bold text-white">{value}</span>
        <span className="text-slate-400">{unit}</span>
      </motion.div>

      {/* Pulsing indicator */}
      <motion.div
        className="mt-6 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  )
}