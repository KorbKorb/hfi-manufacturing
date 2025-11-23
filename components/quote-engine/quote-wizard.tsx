"use client"

import { useQuoteStore } from "@/lib/stores/quote-store"
import { ProgressIndicator } from "./progress-indicator"
import { StepQualification } from "./step-qualification"
import { StepMaterial } from "./step-material"
import { StepContact } from "./step-contact"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"

const steps = [
  {
    id: 0,
    name: "Timeline",
    description: "Project timing",
  },
  {
    id: 1,
    name: "Material",
    description: "Material selection",
  },
  {
    id: 2,
    name: "Contact",
    description: "Upload & submit",
  },
]

const stepComponents = [StepQualification, StepMaterial, StepContact]

export function QuoteWizard() {
  const { currentStep } = useQuoteStore()
  const CurrentStepComponent = stepComponents[currentStep]

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <Card className="p-6">
        <ProgressIndicator steps={steps} currentStep={currentStep} />
      </Card>

      {/* Step Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
