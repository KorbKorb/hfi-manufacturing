# AWS Deployment Guide - HFI Manufacturing Quote Wizard

This guide explains how to deploy the AWS infrastructure required for secure file uploads in the Quote Wizard.

## Architecture Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌─────────┐
│   Browser   │─────▶│ API Gateway  │─────▶│   Lambda    │─────▶│   S3    │
│  (Static)   │◀─────│    (REST)    │◀─────│  (Node.js)  │      │ (Private)│
└─────────────┘      └──────────────┘      └─────────────┘      └─────────┘
                           HTTPS                Presigned URL         256-bit
                                                Generation           Encrypted
```

**Flow:**
1. User selects files in Quote Wizard
2. Frontend requests presigned URLs from API Gateway
3. API Gateway triggers Lambda function
4. Lambda generates time-limited presigned URLs (15 min expiration)
5. Frontend uploads files directly to S3 using presigned URLs
6. S3 stores files with server-side encryption (AES256)

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18.x or later
- Understanding of AWS IAM, S3, Lambda, and API Gateway

## Step 1: Create S3 Bucket

### 1.1 Create the Bucket

```bash
aws s3api create-bucket \
  --bucket hfi-rfq-uploads \
  --region us-east-1 \
  --acl private
```

For regions other than us-east-1:
```bash
aws s3api create-bucket \
  --bucket hfi-rfq-uploads \
  --region YOUR_REGION \
  --create-bucket-configuration LocationConstraint=YOUR_REGION
```

### 1.2 Enable Versioning

```bash
aws s3api put-bucket-versioning \
  --bucket hfi-rfq-uploads \
  --versioning-configuration Status=Enabled
```

### 1.3 Enable Server-Side Encryption

```bash
aws s3api put-bucket-encryption \
  --bucket hfi-rfq-uploads \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      },
      "BucketKeyEnabled": true
    }]
  }'
```

### 1.4 Configure CORS for Presigned URL Uploads

Create a file named `cors-config.json`:

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": [
        "https://hfimfg.com",
        "https://www.hfimfg.com",
        "http://localhost:3000"
      ],
      "AllowedMethods": ["PUT", "POST"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

Apply CORS configuration:
```bash
aws s3api put-bucket-cors \
  --bucket hfi-rfq-uploads \
  --cors-configuration file://cors-config.json
```

### 1.5 Block Public Access (Security)

```bash
aws s3api put-public-access-block \
  --bucket hfi-rfq-uploads \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

## Step 2: Create IAM Role for Lambda

### 2.1 Create Trust Policy

Create `lambda-trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### 2.2 Create the Role

```bash
aws iam create-role \
  --role-name hfi-lambda-s3-presigned-url-role \
  --assume-role-policy-document file://lambda-trust-policy.json
```

### 2.3 Create IAM Policy for S3 Access

Create `s3-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::hfi-rfq-uploads/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

### 2.4 Attach Policy to Role

```bash
aws iam put-role-policy \
  --role-name hfi-lambda-s3-presigned-url-role \
  --policy-name S3PresignedUrlPolicy \
  --policy-document file://s3-policy.json
```

## Step 3: Deploy Lambda Function

### 3.1 Install Dependencies for Lambda

Create a new directory for Lambda deployment:

```bash
mkdir lambda-deploy
cd lambda-deploy
npm init -y
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### 3.2 Copy Lambda Code

Copy these files from your project:
- `lib/aws/presigned-url.ts`
- `lib/aws/lambda-handler.ts`

### 3.3 Build Lambda Package

Install TypeScript and build tools:

```bash
npm install --save-dev typescript @types/node @types/aws-lambda esbuild
```

Create `build.js`:

```javascript
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['lib/aws/lambda-handler.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/index.js',
  external: [],
  minify: true,
}).catch(() => process.exit(1));
```

Build the Lambda:

```bash
node build.js
cd dist
zip -r lambda-function.zip .
```

### 3.4 Create Lambda Function

```bash
aws lambda create-function \
  --function-name hfi-generate-presigned-url \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/hfi-lambda-s3-presigned-url-role \
  --handler index.handler \
  --zip-file fileb://lambda-function.zip \
  --timeout 30 \
  --memory-size 256 \
  --environment Variables="{AWS_S3_BUCKET_NAME=hfi-rfq-uploads,AWS_REGION=us-east-1,ALLOWED_ORIGIN=https://hfimfg.com}"
```

Replace `YOUR_ACCOUNT_ID` with your AWS account ID.

### 3.5 Update Lambda Function (for future updates)

```bash
aws lambda update-function-code \
  --function-name hfi-generate-presigned-url \
  --zip-file fileb://lambda-function.zip
```

## Step 4: Create API Gateway

### 4.1 Create REST API

```bash
aws apigateway create-rest-api \
  --name "HFI RFQ File Upload API" \
  --description "API for generating presigned URLs for RFQ file uploads" \
  --endpoint-configuration types=REGIONAL
```

Note the `id` from the response (e.g., `abc123def`).

### 4.2 Get Root Resource ID

```bash
aws apigateway get-resources \
  --rest-api-id YOUR_API_ID
```

Note the root resource `id`.

### 4.3 Create /api Resource

```bash
aws apigateway create-resource \
  --rest-api-id YOUR_API_ID \
  --parent-id ROOT_RESOURCE_ID \
  --path-part api
```

### 4.4 Create /api/presigned-url Resource

```bash
aws apigateway create-resource \
  --rest-api-id YOUR_API_ID \
  --parent-id API_RESOURCE_ID \
  --path-part presigned-url
```

### 4.5 Create POST Method

```bash
aws apigateway put-method \
  --rest-api-id YOUR_API_ID \
  --resource-id PRESIGNED_URL_RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE
```

### 4.6 Configure Lambda Integration

```bash
aws apigateway put-integration \
  --rest-api-id YOUR_API_ID \
  --resource-id PRESIGNED_URL_RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:hfi-generate-presigned-url/invocations
```

### 4.7 Enable CORS

```bash
# Create OPTIONS method
aws apigateway put-method \
  --rest-api-id YOUR_API_ID \
  --resource-id PRESIGNED_URL_RESOURCE_ID \
  --http-method OPTIONS \
  --authorization-type NONE

# Add mock integration for OPTIONS
aws apigateway put-integration \
  --rest-api-id YOUR_API_ID \
  --resource-id PRESIGNED_URL_RESOURCE_ID \
  --http-method OPTIONS \
  --type MOCK \
  --request-templates '{"application/json": "{\"statusCode\": 200}"}'

# Add method response for OPTIONS
aws apigateway put-method-response \
  --rest-api-id YOUR_API_ID \
  --resource-id PRESIGNED_URL_RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Headers":false,"method.response.header.Access-Control-Allow-Methods":false,"method.response.header.Access-Control-Allow-Origin":false}'

# Add integration response for OPTIONS
aws apigateway put-integration-response \
  --rest-api-id YOUR_API_ID \
  --resource-id PRESIGNED_URL_RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Headers":"'\''Content-Type,Authorization'\''","method.response.header.Access-Control-Allow-Methods":"'\''POST,OPTIONS'\''","method.response.header.Access-Control-Allow-Origin":"'\''*'\''"}' \
  --response-templates '{"application/json": ""}'
```

### 4.8 Grant API Gateway Permission to Invoke Lambda

```bash
aws lambda add-permission \
  --function-name hfi-generate-presigned-url \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:YOUR_ACCOUNT_ID:YOUR_API_ID/*/*"
```

### 4.9 Deploy API

```bash
aws apigateway create-deployment \
  --rest-api-id YOUR_API_ID \
  --stage-name production \
  --description "Production deployment"
```

Your API endpoint will be:
```
https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/production/api/presigned-url
```

## Step 5: Update Frontend Configuration

### 5.1 Update Environment Variables

Create `.env.local` (for development) or configure in your deployment:

```bash
# AWS Configuration (not needed in browser - only for Lambda)
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=hfi-rfq-uploads

# API Endpoint (used by browser)
NEXT_PUBLIC_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/production/api/presigned-url
```

### 5.2 For Local Development

To test locally with Next.js API routes:

1. Comment out `output: 'export'` in `next.config.js`
2. Create `.env.local` with AWS credentials
3. Run `npm run dev`
4. The app will use `/api/presigned-url` endpoint

## Step 6: Testing

### 6.1 Test Lambda Function Directly

```bash
aws lambda invoke \
  --function-name hfi-generate-presigned-url \
  --payload '{"httpMethod":"POST","body":"{\"files\":[{\"fileName\":\"test.pdf\",\"fileType\":\"application/pdf\",\"fileSize\":1024}]}"}' \
  response.json
```

### 6.2 Test API Gateway Endpoint

```bash
curl -X POST \
  https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/production/api/presigned-url \
  -H "Content-Type: application/json" \
  -d '{
    "files": [
      {
        "fileName": "test-drawing.pdf",
        "fileType": "application/pdf",
        "fileSize": 1048576
      }
    ]
  }'
```

Expected response:
```json
{
  "success": true,
  "presignedUrls": [
    {
      "uploadUrl": "https://hfi-rfq-uploads.s3.amazonaws.com/...",
      "fileKey": "rfq-uploads/...",
      "expiresIn": 900
    }
  ]
}
```

### 6.3 Test File Upload

```bash
# Get presigned URL (from previous step)
PRESIGNED_URL="..."

# Upload a test file
curl -X PUT "$PRESIGNED_URL" \
  -H "Content-Type: application/pdf" \
  --data-binary "@test-file.pdf"
```

### 6.4 Verify Upload in S3

```bash
aws s3 ls s3://hfi-rfq-uploads/rfq-uploads/
```

## Security Checklist

- [x] S3 bucket is private (public access blocked)
- [x] Server-side encryption enabled (AES256)
- [x] CORS properly configured
- [x] Lambda has minimal IAM permissions (only PutObject)
- [x] Presigned URLs expire after 15 minutes
- [x] File type validation in Lambda
- [x] File size limits enforced (50MB max)
- [x] API Gateway uses HTTPS only
- [x] No AWS credentials in frontend code

## Monitoring and Logging

### CloudWatch Logs

Lambda logs are automatically sent to CloudWatch:
```bash
aws logs tail /aws/lambda/hfi-generate-presigned-url --follow
```

### API Gateway Logs

Enable CloudWatch logging for API Gateway:
```bash
aws apigateway update-stage \
  --rest-api-id YOUR_API_ID \
  --stage-name production \
  --patch-operations \
    op=replace,path=/accessLogSettings/destinationArn,value=arn:aws:logs:us-east-1:YOUR_ACCOUNT_ID:log-group:api-gateway-logs \
    op=replace,path=/accessLogSettings/format,value='$context.requestId'
```

### S3 Access Logs (Optional)

```bash
aws s3api put-bucket-logging \
  --bucket hfi-rfq-uploads \
  --bucket-logging-status '{
    "LoggingEnabled": {
      "TargetBucket": "hfi-logs-bucket",
      "TargetPrefix": "s3-access-logs/"
    }
  }'
```

## Cost Estimation

**Monthly costs for moderate usage (500 quotes/month, 2 files per quote):**

- S3 Storage (10GB): ~$0.23
- S3 PUT Requests (1,000): ~$0.01
- Lambda Invocations (500): Free tier
- Lambda Duration: Free tier (assuming < 1M requests)
- API Gateway (1,000 requests): Free tier
- Data Transfer Out (minimal): ~$0.10

**Total: ~$0.50/month** (assuming free tier eligibility)

## Troubleshooting

### Error: "Access Denied"
- Check IAM role has S3 PutObject permissions
- Verify bucket policy allows Lambda role

### Error: "CORS policy"
- Verify CORS configuration on S3 bucket
- Check API Gateway OPTIONS method is configured
- Ensure frontend origin is in allowed origins list

### Error: "Presigned URL expired"
- URLs expire after 15 minutes
- Generate new URLs if needed
- Check server time synchronization

### Error: "File type not allowed"
- Check file extension in ALLOWED_FILE_TYPES
- Verify file MIME type matches extension

## Production Deployment Checklist

- [ ] S3 bucket created with encryption
- [ ] IAM role created with minimal permissions
- [ ] Lambda function deployed and tested
- [ ] API Gateway configured with CORS
- [ ] Environment variables set in frontend
- [ ] Test file upload end-to-end
- [ ] CloudWatch logging enabled
- [ ] Alerts configured for errors
- [ ] Update allowed origins for production domain
- [ ] Document API endpoint for team

## Support

For issues related to:
- **AWS Setup**: Contact DevOps team
- **Frontend Integration**: Check `components/quote-engine/step-contact.tsx`
- **Lambda Code**: Check `lib/aws/lambda-handler.ts`

---

**Last Updated:** 2025-11-22
**Version:** 1.0.0
