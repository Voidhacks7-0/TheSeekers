"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: "-10px",
          }}
          animate={{
            y: -window.innerHeight - 20,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle Wave Animation */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="url(#gradient)" className="animate-wave" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#23D4FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#A56BFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9CFF2E" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}