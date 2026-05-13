"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1800)

    const completeTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 2300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl p-4">
          <Image 
            src="/ndugu.png" 
            alt="Ndugu Logo" 
            width={128} 
            height={128} 
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight">Ndugu</h1>
        <p className="text-xl text-white/80 mt-3 font-medium">Vos courses simplifiées</p>
      </div>
    </div>
  )
}
