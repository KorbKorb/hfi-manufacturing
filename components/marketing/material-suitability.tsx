"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Material = "aluminum" | "stainless"

interface MaterialStats {
  name: string
  cost: number // 1-100 scale
  strength: number // 1-100 scale
  weight: number // 1-100 scale (higher = heavier)
  description: string
}

const materials: Record<Material, MaterialStats> = {
  aluminum: {
    name: "Aluminum 6061",
    cost: 45,
    strength: 65,
    weight: 35, // Lighter
    description: "Excellent strength-to-weight ratio. Ideal for aerospace and portable equipment.",
  },
  stainless: {
    name: "Stainless Steel 304",
    cost: 70,
    strength: 90,
    weight: 95, // Heavier
    description: "Superior corrosion resistance. Perfect for medical devices and food equipment.",
  },
}

export function MaterialSuitability() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>("aluminum")
  const current = materials[selectedMaterial]

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-lg p-6 max-w-2xl">
      <h3 className="text-xl font-bold text-white mb-4 font-orbitron">Material Comparison Tool</h3>

      {/* Material Toggle */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={() => setSelectedMaterial("aluminum")}
          variant={selectedMaterial === "aluminum" ? "default" : "outline"}
          className={selectedMaterial === "aluminum"
            ? "bg-orange-600 hover:bg-orange-700"
            : "border-slate-600 text-slate-300 hover:bg-slate-800"}
        >
          Aluminum 6061
        </Button>
        <Button
          onClick={() => setSelectedMaterial("stainless")}
          variant={selectedMaterial === "stainless" ? "default" : "outline"}
          className={selectedMaterial === "stainless"
            ? "bg-orange-600 hover:bg-orange-700"
            : "border-slate-600 text-slate-300 hover:bg-slate-800"}
        >
          Stainless 304
        </Button>
      </div>

      {/* Stats Bars */}
      <div className="space-y-4 mb-4">
        {/* Cost */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-slate-400 font-mono uppercase">Material Cost</span>
            <span className="text-sm text-white font-mono">{current.cost}/100</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-orange-600 transition-all duration-500 rounded-full"
              style={{ width: `${current.cost}%` }}
            />
          </div>
        </div>

        {/* Strength */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-slate-400 font-mono uppercase">Tensile Strength</span>
            <span className="text-sm text-white font-mono">{current.strength}/100</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${current.strength}%` }}
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-slate-400 font-mono uppercase">Density (Weight)</span>
            <span className="text-sm text-white font-mono">{current.weight}/100</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-600 to-red-600 transition-all duration-500 rounded-full"
              style={{ width: `${current.weight}%` }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded border-l-4 border-orange-600">
        <span className="font-semibold text-white">{current.name}:</span> {current.description}
      </p>
    </div>
  )
}
