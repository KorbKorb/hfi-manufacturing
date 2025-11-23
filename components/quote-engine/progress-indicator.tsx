import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
  description: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, stepIdx) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          const isUpcoming = currentStep < step.id

          return (
            <li key={step.id} className={cn("relative", stepIdx !== steps.length - 1 && "flex-1")}>
              <div className="group flex items-center">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      isCompleted && "border-accent bg-accent",
                      isCurrent && "border-accent bg-background",
                      isUpcoming && "border-border bg-background"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isCurrent && "text-accent",
                          isUpcoming && "text-muted-foreground"
                        )}
                      >
                        {step.id + 1}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isCurrent && "text-accent",
                        (isCompleted || isUpcoming) && "text-muted-foreground"
                      )}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 flex-1 hidden md:block">
                    <div
                      className={cn(
                        "h-0.5 w-full transition-all",
                        isCompleted ? "bg-accent" : "bg-border"
                      )}
                    />
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
