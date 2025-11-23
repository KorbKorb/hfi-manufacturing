# AWS Integration - Presigned URL File Upload

This directory contains the AWS integration code for secure file uploads in the Quote Wizard.

## Overview

The Quote Wizard uses AWS S3 presigned URLs for secure, direct-to-S3 file uploads without exposing AWS credentials to the browser.

## Architecture

```
Browser → API Gateway → Lambda → S3
   ↓                                ↑
   └────────────────────────────────┘
        (Direct upload via presigned URL)
```

## Files

### `presigned-url.ts`
Core utility functions for generating and uploading files using presigned URLs.

**Key Functions:**
- `generatePresignedUrl(request)` - Generate a single presigned URL (server-side only)
- `generatePresignedUrls(requests)` - Generate multiple presigned URLs (server-side only)
- `uploadFileToS3(file, presignedUrl, onProgress)` - Upload file to S3 (client-side)
- `uploadFilesToS3WithRetry(files, presignedUrls, onProgress, maxRetries)` - Upload multiple files with retry logic (client-side)

**Security Features:**
- File type validation (CAD files, PDFs, images only)
- File size limits (50MB maximum)
- 15-minute expiration on presigned URLs
- Server-side encryption (AES256)

### `lambda-handler.ts`
AWS Lambda function handler for deployment to AWS Lambda.

**Deployment:**
See `AWS_DEPLOYMENT_GUIDE.md` in the root directory for complete deployment instructions.

**Environment Variables (Lambda):**
- `AWS_S3_BUCKET_NAME` - S3 bucket name for uploads
- `AWS_REGION` - AWS region
- `ALLOWED_ORIGIN` - CORS allowed origin (e.g., https://hfimfg.com)

## Local Development

### Option 1: Using Next.js API Route (Recommended for Development)

1. **Temporarily remove static export:**
   ```javascript
   // In next.config.js, comment out:
   // output: 'export',
   ```

2. **Set environment variables:**
   Create `.env.local`:
   ```bash
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   AWS_S3_BUCKET_NAME=hfi-rfq-uploads
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Test Quote Wizard:**
   - Visit http://localhost:3000/quote
   - Upload files and verify they reach S3

### Option 2: Using Mock Data (No AWS Required)

If you don't have AWS credentials, you can test the UI without actual uploads:

1. Comment out the upload logic in `step-contact.tsx` (lines 52-99)
2. Keep the mock simulation (line 110)

## Production Deployment

### 1. Deploy AWS Infrastructure

Follow the complete guide in `AWS_DEPLOYMENT_GUIDE.md`:
- Create S3 bucket with encryption and CORS
- Create IAM role for Lambda
- Deploy Lambda function
- Set up API Gateway
- Configure DNS (optional)

### 2. Configure Environment Variables

Set `NEXT_PUBLIC_API_URL` in your deployment environment:

```bash
NEXT_PUBLIC_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/production/api/presigned-url
```

### 3. Build and Deploy Frontend

```bash
npm run build
# Deploy 'out' directory to S3 + CloudFront
```

## Testing

### Unit Test (Validation Logic)

```typescript
import { generatePresignedUrl } from './presigned-url'

// Test file validation
try {
  await generatePresignedUrl({
    fileName: 'test.exe', // Should fail
    fileType: 'application/x-executable',
    fileSize: 1024
  })
} catch (error) {
  console.log('Validation working:', error.message)
}
```

### Integration Test (Local)

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Test API endpoint
curl -X POST http://localhost:3000/api/presigned-url \
  -H "Content-Type: application/json" \
  -d '{
    "files": [{
      "fileName": "test.pdf",
      "fileType": "application/pdf",
      "fileSize": 1048576
    }]
  }'
```

### E2E Test (Browser)

1. Open http://localhost:3000/quote
2. Fill out the wizard
3. Upload a test file (PDF, DWG, etc.)
4. Check browser Network tab for:
   - POST to `/api/presigned-url` → 200 OK
   - PUT to S3 presigned URL → 200 OK
5. Verify file in S3 bucket

## File Type Support

The following file types are allowed:

| Extension | MIME Type | Use Case |
|-----------|-----------|----------|
| .pdf | application/pdf | Drawings, specs |
| .dwg | application/acad | AutoCAD drawings |
| .dxf | application/dxf | CAD exchange format |
| .step, .stp | application/step | 3D CAD models |
| .iges, .igs | application/iges | CAD surface models |
| .stl | model/stl | 3D printing files |
| .png, .jpg | image/png, image/jpeg | Reference images |

## Security Considerations

✅ **Implemented:**
- No AWS credentials in frontend code
- Presigned URLs expire after 15 minutes
- File type validation server-side
- File size limits (50MB max)
- Server-side encryption on S3
- Private S3 bucket (no public access)
- CORS properly configured

⚠️ **Additional Recommendations:**
- Enable CloudWatch alarms for Lambda errors
- Set up S3 lifecycle policies for old uploads
- Implement virus scanning (AWS S3 + ClamAV Lambda)
- Add rate limiting on API Gateway
- Monitor costs in AWS Cost Explorer

## Troubleshooting

### Error: "Access to fetch blocked by CORS policy"

**Cause:** CORS not configured on S3 bucket or API Gateway

**Solution:**
```bash
# Update S3 CORS (see AWS_DEPLOYMENT_GUIDE.md)
aws s3api put-bucket-cors --bucket hfi-rfq-uploads --cors-configuration file://cors-config.json

# Verify API Gateway has OPTIONS method configured
```

### Error: "AWS credentials not found"

**Cause:** Environment variables not set for local development

**Solution:**
Create `.env.local` with AWS credentials (see Local Development above)

### Error: "File type not allowed"

**Cause:** File extension not in allowed list

**Solution:**
Add the file extension to `FILE_EXTENSIONS` in `presigned-url.ts`

### Error: "Presigned URL has expired"

**Cause:** URLs are only valid for 15 minutes

**Solution:**
This is expected behavior. User should submit the form within 15 minutes of selecting files.

## Performance

**Typical Upload Times (50Mbps connection):**
- 1MB file: ~2 seconds
- 10MB file: ~15 seconds
- 50MB file (max): ~1 minute

**Optimizations:**
- Files upload in parallel (all at once)
- Progress tracking for user feedback
- Retry logic with exponential backoff (3 attempts)
- XHR for progress events (not fetch API)

## Cost Estimate

**Per 1,000 Quotes with 2 Files Each (average 5MB):**
- S3 Storage (10GB for 1 month): $0.23
- S3 PUT Requests (2,000): $0.01
- Lambda Invocations (1,000): $0.00 (free tier)
- API Gateway Requests (1,000): $0.00 (free tier)
- Data Transfer: ~$0.90

**Total: ~$1.14/month** for 1,000 quotes

## Support

- **AWS Infrastructure Issues:** See `AWS_DEPLOYMENT_GUIDE.md`
- **Code Issues:** Check `step-contact.tsx` and this directory
- **File Upload UI:** See `components/quote-engine/file-dropzone.tsx`

---

**Last Updated:** 2025-11-22
