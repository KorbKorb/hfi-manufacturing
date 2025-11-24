"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BendDeductionCalc() {
  const [thickness, setThickness] = useState<string>("0.063")
  const [bendRadius, setBendRadius] = useState<string>("0.125")
  const [bendAngle, setBendAngle] = useState<string>("90")
  const [kFactor, setKFactor] = useState<string>("0.44")
  const [result, setResult] = useState<number | null>(null)

  const calculateBendDeduction = () => {
    const T = parseFloat(thickness)
    const R = parseFloat(bendRadius)
    const A = parseFloat(bendAngle)
    const K = parseFloat(kFactor)

    if (isNaN(T) || isNaN(R) || isNaN(A) || isNaN(K)) {
      alert("Please enter valid numbers")
      return
    }

    // Bend Deduction formula (simplified)
    // BD = 2 * (R + T) * tan(A/2) - (π/180) * R * A * (1 - K)
    const angleRadians = (A * Math.PI) / 180
    const outsideSetback = (R + T) * Math.tan(angleRadians / 2)
    const bendAllowance = (angleRadians * (R + K * T))
    const bendDeduction = 2 * outsideSetback - bendAllowance

    setResult(bendDeduction)
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-6 max-w-lg">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-bold text-white font-orbitron">Bend Deduction Calculator</h3>
      </div>

      <p className="text-sm text-slate-400 mb-6">
        Calculate precise bend deductions for sheet metal fabrication
      </p>

      <div className="space-y-4">
        {/* Material Thickness */}
        <div>
          <Label htmlFor="thickness" className="text-slate-300 text-sm font-mono">
            Material Thickness (T) - inches
          </Label>
          <Input
            id="thickness"
            type="number"
            step="0.001"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white font-mono"
            placeholder="0.063"
          />
        </div>

        {/* Bend Radius */}
        <div>
          <Label htmlFor="radius" className="text-slate-300 text-sm font-mono">
            Inside Bend Radius (R) - inches
          </Label>
          <Input
            id="radius"
            type="number"
            step="0.001"
            value={bendRadius}
            onChange={(e) => setBendRadius(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white font-mono"
            placeholder="0.125"
          />
        </div>

        {/* Bend Angle */}
        <div>
          <Label htmlFor="angle" className="text-slate-300 text-sm font-mono">
            Bend Angle (A) - degrees
          </Label>
          <Input
            id="angle"
            type="number"
            step="1"
            value={bendAngle}
            onChange={(e) => setBendAngle(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white font-mono"
            placeholder="90"
          />
        </div>

        {/* K-Factor */}
        <div>
          <Label htmlFor="kfactor" className="text-slate-300 text-sm font-mono">
            K-Factor (Default 0.44 for soft materials)
          </Label>
          <Input
            id="kfactor"
            type="number"
            step="0.01"
            value={kFactor}
            onChange={(e) => setKFactor(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white font-mono"
            placeholder="0.44"
          />
        </div>

        <Button
          onClick={calculateBendDeduction}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
        >
          Calculate Bend Deduction
        </Button>

        {/* Result Display */}
        {result !== null && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
            <p className="text-sm text-green-300 font-mono uppercase mb-1">Bend Deduction:</p>
            <p className="text-3xl font-bold text-green-400 font-mono">
              {result.toFixed(4)}&quot;
            </p>
            <p className="text-xs text-green-400 mt-2">
              Use this value to calculate flat pattern length
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-3 bg-slate-800/50 rounded border-l-4 border-orange-600">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-white">Pro Tip:</span> For stainless steel 304, use K-Factor 0.42-0.46.
          For aluminum, use 0.38-0.42. Thicker materials require higher K-Factors.
        </p>
      </div>
    </div>
  )
}
