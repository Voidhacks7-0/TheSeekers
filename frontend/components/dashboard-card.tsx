"use client"
import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface DashboardCardProps {
  icon: LucideIcon
  label: string
  value: number | string
  unit: string
  color: string
  trend?: "up" | "down" | "stable"
  delay: number
}

export default function DashboardCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  trend = "stable",
  delay,
}: DashboardCardProps) {
  return (
    <motion.div
      className="glass-dark rounded-xl p-6 border border-cyan-400/20 hover-lift"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${color} p-2 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend === "up" && <TrendingUp className="w-5 h-5 text-lime-400" />}
        {trend === "down" && <TrendingDown className="w-5 h-5 text-lime-400" />}
      </div>

      <p className="text-slate-400 text-sm font-medium mb-2">{label}</p>

      <div className="flex items-baseline gap-2">
        <motion.span
          className="text-3xl font-bold text-white"
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
        <span className="text-slate-400 text-sm">{unit}</span>
      </div>

      {/* Animated progress bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ delay: delay + 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      />
    </motion.div>
  )
}