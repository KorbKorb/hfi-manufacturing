"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { materialSchema, type MaterialFormData } from "@/lib/validations/quote-schema"
import { useQuoteStore } from "@/lib/stores/quote-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const materials = [
  { value: "stainless-steel", label: "Stainless Steel", popular: true },
  { value: "aluminum", label: "Aluminum", popular: true },
  { value: "carbon-steel", label: "Carbon Steel", popular: false },
  { value: "brass", label: "Brass", popular: false },
  { value: "copper", label: "Copper", popular: false },
  { value: "other", label: "Other (Specify in notes)", popular: false },
]

export function StepMaterial() {
  const { formData, updateFormData, setCurrentStep } = useQuoteStore()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      material: formData.material || undefined,
      materialGrade: formData.materialGrade || '',
      quantity: formData.quantity || undefined,
    },
  })

  const onSubmit = (data: MaterialFormData) => {
    updateFormData(data)
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(0)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Material Selection</CardTitle>
          <CardDescription>
            Select the material type for your fabrication project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="material">Material Type *</Label>
            <Controller
              name="material"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Select a material" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      Most Popular
                    </div>
                    {materials
                      .filter((m) => m.popular)
                      .map((material) => (
                        <SelectItem key={material.value} value={material.value}>
                          {material.label}
                        </SelectItem>
                      ))}
                    <div className="my-1 h-px bg-border" />
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      Other Materials
                    </div>
                    {materials
                      .filter((m) => !m.popular)
                      .map((material) => (
                        <SelectItem key={material.value} value={material.value}>
                          {material.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.material && (
              <p className="text-sm text-destructive">{errors.material.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="materialGrade">Material Grade (Optional)</Label>
            <Input
              id="materialGrade"
              placeholder="e.g., 304, 316L, 6061-T6"
              {...register("materialGrade")}
            />
            <p className="text-xs text-muted-foreground">
              If you know the specific grade, enter it here. Otherwise, our engineers will recommend the best option.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Estimated Quantity (Optional)</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="e.g., 100"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive">{errors.quantity.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Approximate number of parts needed. Can be adjusted later.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" size="lg" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
          Continue to Upload & Contact
        </Button>
      </div>
    </form>
  )
}
