"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function WaveformChart() {
  const [waveData, setWaveData] = useState<number[]>([])

  useEffect(() => {
    const generateWave = () => {
      const data = []
      for (let i = 0; i < 400; i++) {
        const value = 75 + 15 * Math.sin(i * 0.1) + Math.random() * 5
        data.push(Math.max(60, Math.min(90, value)))
      }
      setWaveData(data)
    }

    generateWave()
    const interval = setInterval(generateWave, 3000)
    return () => clearInterval(interval)
  }, [])

  const points = waveData
    .map((value, idx) => `${(idx / waveData.length) * 400},${150 - ((value - 60) / 30) * 100}`)
    .join(" ")

  return (
    <div className="h-64 flex items-center justify-center">
      <div className="w-full h-40 relative overflow-hidden rounded-lg">
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A56BFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#A56BFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[...Array(4)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2="400"
              y2={i * 50}
              stroke="#23D4FF"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="150"
              stroke="#23D4FF"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}

          {/* Waveform */}
          {points && (
            <>
              <polyline
                points={points}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <polyline points={points} fill="url(#waveGradient)" opacity="0.3" />
            </>
          )}

          {/* Animated scanning line */}
          <motion.line
            x1={0}
            x2={0}
            y1={0}
            y2={150}
            stroke="#23D4FF"
            strokeWidth="2"
            opacity="0.8"
            animate={{ x1: 400, x2: 400 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
      </div>
    </div>
  )
}