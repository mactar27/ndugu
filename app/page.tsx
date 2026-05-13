"use client"

import { useState } from "react"
import { ShoppingList } from "@/components/shopping-list"
import { SplashScreen } from "@/components/splash-screen"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <ShoppingList />
    </>
  )
}
