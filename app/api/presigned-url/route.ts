/**
 * Next.js API Route for Presigned URL Generation (Development Only)
 *
 * ⚠️ IMPORTANT: This API route will NOT work in production with static export.
 * This is for LOCAL DEVELOPMENT ONLY.
 *
 * For production:
 * 1. Deploy lib/aws/lambda-handler.ts to AWS Lambda
 * 2. Set up API Gateway endpoint
 * 3. Configure NEXT_PUBLIC_API_URL in environment variables
 *
 * To use this in development:
 * - Comment out `output: 'export'` in next.config.js
 * - Run `npm run dev`
 * - API will be available at http://localhost:3000/api/presigned-url
 */

import { NextRequest, NextResponse } from "next/server"
import { generatePresignedUrls, PresignedUrlRequest } from "@/lib/aws/presigned-url"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate request
    if (!body.files || !Array.isArray(body.files) || body.files.length === 0) {
      return NextResponse.json(
        {
          error: "Bad request",
          message: "Files array is required and must not be empty",
        },
        { status: 400 }
      )
    }

    // Validate each file request
    for (const file of body.files) {
      if (!file.fileName || !file.fileType || typeof file.fileSize !== "number") {
        return NextResponse.json(
          {
            error: "Bad request",
            message: "Each file must have fileName, fileType, and fileSize",
          },
          { status: 400 }
        )
      }
    }

    // Generate presigned URLs
    const presignedUrls = await generatePresignedUrls(body.files as PresignedUrlRequest[])

    // Return success response
    return NextResponse.json({
      success: true,
      presignedUrls,
    })
  } catch (error) {
    console.error("Error generating presigned URLs:", error)

    // Return error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const statusCode = errorMessage.includes("not allowed") || errorMessage.includes("Maximum") ? 400 : 500

    return NextResponse.json(
      {
        error: statusCode === 400 ? "Bad request" : "Internal server error",
        message: errorMessage,
      },
      { status: statusCode }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
