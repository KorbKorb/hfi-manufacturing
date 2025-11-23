import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || process.env.AWS_S3_BUCKET_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

// Allowed file types for security
const ALLOWED_FILE_TYPES = [
  "application/pdf", // PDF
  "image/vnd.dwg", "application/acad", "application/x-acad", // DWG
  "image/vnd.dxf", "application/dxf", // DXF
  "application/step", "application/x-step", // STEP
  "model/iges", "application/iges", // IGES
  "model/stl", "application/sla", // STL
  "image/png", // PNG
  "image/jpeg", // JPEG
  "application/octet-stream", // Generic binary (for CAD files)
]

// File extension to MIME type mapping for CAD files (which often get detected as octet-stream)
const FILE_EXTENSIONS: Record<string, string> = {
  ".pdf": "application/pdf",
  ".dwg": "application/acad",
  ".dxf": "application/dxf",
  ".step": "application/step",
  ".stp": "application/step",
  ".iges": "application/iges",
  ".igs": "application/iges",
  ".stl": "model/stl",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
}

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

export interface PresignedUrlRequest {
  fileName: string
  fileType: string
  fileSize: number
}

export interface PresignedUrlResponse {
  uploadUrl: string
  fileKey: string
  expiresIn: number
}

/**
 * Validates file upload request
 */
function validateFileRequest(request: PresignedUrlRequest): { valid: boolean; error?: string } {
  // Check file size
  if (request.fileSize > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    }
  }

  // Get file extension
  const extension = request.fileName.toLowerCase().match(/\.[^.]+$/)?.[0]
  if (!extension) {
    return { valid: false, error: "File must have a valid extension" }
  }

  // Check if extension is allowed
  if (!FILE_EXTENSIONS[extension]) {
    return {
      valid: false,
      error: `File type ${extension} is not allowed. Allowed types: ${Object.keys(FILE_EXTENSIONS).join(", ")}`,
    }
  }

  // Validate file type matches extension or is in allowed list
  const expectedType = FILE_EXTENSIONS[extension]
  const isValidType =
    request.fileType === expectedType ||
    request.fileType === "application/octet-stream" ||
    ALLOWED_FILE_TYPES.includes(request.fileType)

  if (!isValidType) {
    return {
      valid: false,
      error: `Invalid file type ${request.fileType} for extension ${extension}`,
    }
  }

  return { valid: true }
}

/**
 * Generates a unique file key for S3 storage
 */
function generateFileKey(fileName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_")
  return `rfq-uploads/${timestamp}-${randomString}-${sanitizedFileName}`
}

/**
 * Generate a presigned URL for S3 upload
 * This function should be called from a Next.js API route (server-side only)
 *
 * @param request - File upload request details
 * @returns Presigned URL and file key for S3 upload
 */
export async function generatePresignedUrl(
  request: PresignedUrlRequest
): Promise<PresignedUrlResponse> {
  // Validate the request
  const validation = validateFileRequest(request)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  // Get bucket name from environment
  const bucketName = process.env.AWS_S3_BUCKET_NAME
  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME environment variable is not configured")
  }

  // Generate unique file key
  const fileKey = generateFileKey(request.fileName)

  // Get appropriate content type
  const extension = request.fileName.toLowerCase().match(/\.[^.]+$/)?.[0]
  const contentType = extension ? FILE_EXTENSIONS[extension] : request.fileType

  // Create PutObject command
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    ContentType: contentType,
    ContentLength: request.fileSize,
    // Server-side encryption
    ServerSideEncryption: "AES256",
    // Metadata for tracking
    Metadata: {
      originalFileName: request.fileName,
      uploadedAt: new Date().toISOString(),
    },
  })

  // Generate presigned URL (expires in 15 minutes)
  const expiresIn = 15 * 60 // 15 minutes in seconds
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn })

  return {
    uploadUrl,
    fileKey,
    expiresIn,
  }
}

/**
 * Generate presigned URLs for multiple files
 */
export async function generatePresignedUrls(
  requests: PresignedUrlRequest[]
): Promise<PresignedUrlResponse[]> {
  // Validate total file count
  if (requests.length > 5) {
    throw new Error("Maximum 5 files allowed per upload")
  }

  // Generate presigned URLs for all files
  const promises = requests.map((request) => generatePresignedUrl(request))
  return Promise.all(promises)
}

/**
 * Upload file to S3 using presigned URL
 * This function runs in the browser (client-side)
 *
 * @param file - File to upload
 * @param presignedUrl - Presigned URL from generatePresignedUrl
 * @param onProgress - Progress callback (0-100)
 * @returns Promise that resolves when upload is complete
 */
export async function uploadFileToS3(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100)
          onProgress(percentComplete)
        }
      })
    }

    // Handle completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve()
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`))
      }
    })

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"))
    })

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload was aborted"))
    })

    // Send the request
    xhr.open("PUT", presignedUrl)
    xhr.setRequestHeader("Content-Type", file.type)
    xhr.send(file)
  })
}

/**
 * Upload multiple files with retry logic
 *
 * @param files - Array of files to upload
 * @param presignedUrls - Array of presigned URLs
 * @param onProgress - Progress callback for each file
 * @param maxRetries - Maximum number of retry attempts
 * @returns Array of uploaded file keys
 */
export async function uploadFilesToS3WithRetry(
  files: File[],
  presignedUrls: PresignedUrlResponse[],
  onProgress?: (fileIndex: number, progress: number) => void,
  maxRetries = 3
): Promise<string[]> {
  const fileKeys: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const { uploadUrl, fileKey } = presignedUrls[i]

    let lastError: Error | null = null
    let retryCount = 0

    // Retry loop
    while (retryCount <= maxRetries) {
      try {
        await uploadFileToS3(file, uploadUrl, (progress) => {
          onProgress?.(i, progress)
        })
        fileKeys.push(fileKey)
        break // Success, exit retry loop
      } catch (error) {
        lastError = error as Error
        retryCount++

        if (retryCount <= maxRetries) {
          // Wait before retrying (exponential backoff)
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    // If all retries failed, throw the last error
    if (retryCount > maxRetries && lastError) {
      throw new Error(`Failed to upload ${file.name} after ${maxRetries} retries: ${lastError.message}`)
    }
  }

  return fileKeys
}
