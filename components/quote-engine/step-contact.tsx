"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/validations/quote-schema"
import { useQuoteStore } from "@/lib/stores/quote-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDropzone } from "./file-dropzone"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { uploadFilesToS3WithRetry } from "@/lib/aws/presigned-url"
import type { PresignedUrlResponse } from "@/lib/aws/presigned-url"

export function StepContact() {
  const { formData, updateFormData, setCurrentStep, resetForm } = useQuoteStore()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({})
  const [uploadError, setUploadError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      companyName: formData.companyName || '',
      contactName: formData.contactName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      additionalNotes: formData.additionalNotes || '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setUploadError(null)
    setUploadProgress({})

    try {
      // Update form data
      updateFormData(data)

      let uploadedFileKeys: string[] = []

      // Step 1: Upload files if any are selected
      if (selectedFiles.length > 0) {
        try {
          // Request presigned URLs from API
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/presigned-url'

          const presignedUrlResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              files: selectedFiles.map((file) => ({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
              })),
            }),
          })

          if (!presignedUrlResponse.ok) {
            const errorData = await presignedUrlResponse.json()
            throw new Error(errorData.message || 'Failed to get upload URLs')
          }

          const { presignedUrls } = await presignedUrlResponse.json() as { presignedUrls: PresignedUrlResponse[] }

          // Step 2: Upload files to S3 using presigned URLs
          uploadedFileKeys = await uploadFilesToS3WithRetry(
            selectedFiles,
            presignedUrls,
            (fileIndex, progress) => {
              setUploadProgress((prev) => ({
                ...prev,
                [fileIndex]: progress,
              }))
            },
            3 // Max 3 retries
          )

          console.log('Files uploaded successfully:', uploadedFileKeys)
        } catch (error) {
          console.error('Error uploading files:', error)
          throw new Error(
            error instanceof Error
              ? `File upload failed: ${error.message}`
              : 'File upload failed. Please try again.'
          )
        }
      }

      // Step 3: Submit quote request to backend
      // TODO: Implement quote submission API call
      // This would typically send:
      // - All form data (timeline, material, contact info)
      // - uploadedFileKeys array (S3 keys of uploaded files)
      // - Any additional metadata

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Quote submitted with file keys:', uploadedFileKeys)

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting quote:', error)
      const errorMessage = error instanceof Error ? error.message : 'There was an error submitting your quote. Please try again.'
      setUploadError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleStartNew = () => {
    resetForm()
    setIsSubmitted(false)
    setSelectedFiles([])
    setUploadProgress({})
    setUploadError(null)
  }

  if (isSubmitted) {
    return (
      <Card className="border-accent">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Quote Request Submitted!
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Thank you for your request. Our team will review your project and respond with a detailed quote within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            You&apos;ll receive a confirmation email at <strong>{formData.email}</strong>
          </p>
          <Button onClick={handleStartNew} variant="outline">
            Submit Another Quote
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error message */}
      {uploadError && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-destructive mb-1">Upload Error</h4>
                <p className="text-sm text-muted-foreground">{uploadError}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upload Files (Optional)</CardTitle>
          <CardDescription>
            Upload CAD files, technical drawings, or reference images. All uploads are encrypted and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileDropzone
            onFilesSelected={setSelectedFiles}
            uploadProgress={uploadProgress}
            isUploading={isSubmitting}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How should we reach you with your quote?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Your Company Inc."
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Your Name *</Label>
              <Input
                id="contactName"
                placeholder="John Doe"
                {...register("contactName")}
              />
              {errors.contactName && (
                <p className="text-sm text-destructive">{errors.contactName.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <textarea
              id="additionalNotes"
              rows={4}
              placeholder="Any additional details about your project, special requirements, or questions..."
              {...register("additionalNotes")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" size="lg" onClick={handleBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="bg-accent hover:bg-accent/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  )
}
