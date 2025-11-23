"use client"

import { useCallback, useState } from "react"
import { Upload, X, FileText, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TrustBadge } from "@/components/marketing/trust-badge"

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: string[]
  uploadProgress?: Record<number, number>
  isUploading?: boolean
}

export function FileDropzone({
  onFilesSelected,
  maxFiles = 5,
  acceptedFileTypes = [
    ".pdf",
    ".dwg",
    ".dxf",
    ".step",
    ".stp",
    ".iges",
    ".igs",
    ".stl",
    ".png",
    ".jpg",
    ".jpeg",
  ],
  uploadProgress = {},
  isUploading = false,
}: FileDropzoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      handleFiles(files)
    },
    [selectedFiles]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files)
        handleFiles(files)
      }
    },
    [selectedFiles]
  )

  const handleFiles = (files: File[]) => {
    const newFiles = [...selectedFiles, ...files].slice(0, maxFiles)
    setSelectedFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-all",
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border hover:border-accent/50 hover:bg-accent/5"
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          multiple
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-accent/10 p-4">
            <Upload className="h-8 w-8 text-accent" />
          </div>
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-sm font-semibold text-accent hover:text-accent/80"
            >
              Click to upload
            </label>
            <span className="text-sm text-muted-foreground"> or drag and drop</span>
          </div>
          <p className="text-xs text-muted-foreground">
            CAD files, drawings, or images (Max {maxFiles} files)
          </p>
          <p className="text-xs text-muted-foreground">
            Supported: {acceptedFileTypes.slice(0, 5).join(", ")}...
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <TrustBadge variant="security" />
        </div>
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Selected Files ({selectedFiles.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => {
              const progress = uploadProgress[index] || 0
              const isFileUploading = isUploading && progress > 0 && progress < 100

              return (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                          {isFileUploading && ` • ${progress}% uploaded`}
                          {progress === 100 && isUploading && " • Upload complete"}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="flex-shrink-0 ml-2"
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Progress bar */}
                  {isUploading && progress > 0 && (
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
