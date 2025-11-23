/**
 * AWS Lambda Handler for Presigned URL Generation
 *
 * This file is designed to be deployed as an AWS Lambda function.
 * It handles requests from API Gateway to generate presigned URLs for S3 uploads.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Bundle this file with dependencies using esbuild or webpack
 * 2. Deploy to AWS Lambda with Node.js 18.x runtime
 * 3. Attach IAM role with S3 PutObject permissions
 * 4. Configure environment variables: AWS_S3_BUCKET_NAME, AWS_REGION
 * 5. Connect to API Gateway with CORS enabled
 *
 * API Gateway should expose this as: POST /api/presigned-url
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { generatePresignedUrls, PresignedUrlRequest } from "./presigned-url"

interface PresignedUrlRequestBody {
  files: PresignedUrlRequest[]
}

/**
 * Lambda handler function
 */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  // Set CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: "Method not allowed",
        message: "Only POST requests are accepted",
      }),
    }
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Bad request",
          message: "Request body is required",
        }),
      }
    }

    const body: PresignedUrlRequestBody = JSON.parse(event.body)

    // Validate request
    if (!body.files || !Array.isArray(body.files) || body.files.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Bad request",
          message: "Files array is required and must not be empty",
        }),
      }
    }

    // Validate each file request
    for (const file of body.files) {
      if (!file.fileName || !file.fileType || typeof file.fileSize !== "number") {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Bad request",
            message: "Each file must have fileName, fileType, and fileSize",
          }),
        }
      }
    }

    // Generate presigned URLs
    const presignedUrls = await generatePresignedUrls(body.files)

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        presignedUrls,
      }),
    }
  } catch (error) {
    console.error("Error generating presigned URLs:", error)

    // Return error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const statusCode = errorMessage.includes("not allowed") || errorMessage.includes("Maximum") ? 400 : 500

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        error: statusCode === 400 ? "Bad request" : "Internal server error",
        message: errorMessage,
      }),
    }
  }
}

/**
 * For local testing (Node.js environment)
 */
export async function testHandler() {
  const mockEvent: APIGatewayProxyEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
      files: [
        {
          fileName: "test-drawing.pdf",
          fileType: "application/pdf",
          fileSize: 1024 * 1024, // 1MB
        },
      ],
    }),
    headers: {},
    multiValueHeaders: {},
    isBase64Encoded: false,
    path: "/api/presigned-url",
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: "",
  }

  const result = await handler(mockEvent)
  console.log("Test result:", JSON.stringify(result, null, 2))
  return result
}
