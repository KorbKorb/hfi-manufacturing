"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { qualificationSchema, type QualificationFormData } from "@/lib/validations/quote-schema"
import { useQuoteStore } from "@/lib/stores/quote-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar } from "lucide-react"

export function StepQualification() {
  const { formData, updateFormData, setCurrentStep } = useQuoteStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QualificationFormData>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: {
      timeline: formData.timeline || undefined,
      projectName: formData.projectName || '',
    },
  })

  const selectedTimeline = watch("timeline")

  const onSubmit = (data: QualificationFormData) => {
    updateFormData(data)
    setCurrentStep(1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>
            Help us understand your project urgency to provide the most accurate quote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedTimeline}
            onValueChange={(value) => setValue("timeline", value as "immediate" | "forecast")}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Immediate Option */}
              <label
                htmlFor="immediate"
                className="relative flex cursor-pointer rounded-lg border-2 border-border p-4 hover:border-accent transition-all"
              >
                <RadioGroupItem value="immediate" id="immediate" className="sr-only" />
                <div
                  className={`flex items-start gap-3 ${
                    selectedTimeline === "immediate" ? "text-accent" : ""
                  }`}
                >
                  <Clock className="h-6 w-6 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Immediate Need</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      I need parts soon (within 2-8 weeks)
                    </div>
                  </div>
                </div>
                {selectedTimeline === "immediate" && (
                  <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-accent" />
                )}
              </label>

              {/* Forecast Option */}
              <label
                htmlFor="forecast"
                className="relative flex cursor-pointer rounded-lg border-2 border-border p-4 hover:border-accent transition-all"
              >
                <RadioGroupItem value="forecast" id="forecast" className="sr-only" />
                <div
                  className={`flex items-start gap-3 ${
                    selectedTimeline === "forecast" ? "text-accent" : ""
                  }`}
                >
                  <Calendar className="h-6 w-6 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Future Planning</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Planning ahead (8+ weeks out)
                    </div>
                  </div>
                </div>
                {selectedTimeline === "forecast" && (
                  <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-accent" />
                )}
              </label>
            </div>
          </RadioGroup>
          {errors.timeline && (
            <p className="text-sm text-destructive mt-2">{errors.timeline.message}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Name (Optional)</CardTitle>
          <CardDescription>
            Give your project a name to help us reference it in our communication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              placeholder="e.g., Medical Device Enclosure Prototype"
              {...register("projectName")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
          Continue to Material Selection
        </Button>
      </div>
    </form>
  )
}
