# Quick Start - AWS File Upload Integration

## 🎯 What Was Built

Secure file upload system for the Quote Wizard using AWS S3 presigned URLs.

**Key Features:**
- ✅ Direct browser-to-S3 uploads (no server middleman)
- ✅ Real-time progress tracking with retry logic
- ✅ File validation (type, size, security)
- ✅ 256-bit AES encryption
- ✅ No AWS credentials exposed to browser

---

## 🚀 Option 1: Test Locally (Quick)

**Time:** 10 minutes | **Requires:** AWS account + credentials

### Step 1: Disable Static Export
In `next.config.js`:
```javascript
const nextConfig = {
  // output: 'export',  // Comment this out
  images: {
    unoptimized: true,
  },
}
```

### Step 2: Create S3 Bucket
```bash
aws s3api create-bucket \
  --bucket hfi-rfq-uploads \
  --region us-east-1 \
  --acl private
```

### Step 3: Configure CORS on Bucket
Create `cors.json`:
```json
{
  "CORSRules": [{
    "AllowedOrigins": ["http://localhost:3000"],
    "AllowedMethods": ["PUT", "POST"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }]
}
```

Apply:
```bash
aws s3api put-bucket-cors --bucket hfi-rfq-uploads --cors-configuration file://cors.json
```

### Step 4: Set Environment Variables
Create `.env.local`:
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_S3_BUCKET_NAME=hfi-rfq-uploads
```

### Step 5: Run Dev Server
```bash
npm run dev
```

### Step 6: Test Upload
1. Visit http://localhost:3000/quote
2. Complete steps 1-2
3. Upload a test PDF file
4. Click "Submit Quote Request"
5. Watch progress bars fill up
6. Verify success screen

### Step 7: Verify Upload
```bash
aws s3 ls s3://hfi-rfq-uploads/rfq-uploads/
```

---

## 🏭 Option 2: Deploy to Production (Complete)

**Time:** 45-60 minutes | **Requires:** AWS account

See detailed instructions in **`AWS_DEPLOYMENT_GUIDE.md`**

**Steps:**
1. Create S3 bucket (encrypted, private)
2. Create IAM role for Lambda
3. Deploy Lambda function
4. Set up API Gateway
5. Configure frontend environment variable
6. Build and deploy static site

**Result:**
- Production API endpoint: `https://[api-id].execute-api.us-east-1.amazonaws.com/production/api/presigned-url`
- Static site on S3 + CloudFront
- Fully serverless architecture

---

## 📁 Files to Review

| File | Purpose |
|------|---------|
| `lib/aws/presigned-url.ts` | Core upload utilities |
| `lib/aws/lambda-handler.ts` | Lambda function for AWS |
| `app/api/presigned-url/route.ts` | Local dev API route |
| `components/quote-engine/step-contact.tsx` | Upload integration |
| `components/quote-engine/file-dropzone.tsx` | Progress UI |
| `AWS_DEPLOYMENT_GUIDE.md` | Complete deployment guide |
| `AWS_INTEGRATION_SUMMARY.md` | What was built |

---

## 🧪 Quick Test

### Test API Endpoint (Local Dev)
```bash
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

Expected response:
```json
{
  "success": true,
  "presignedUrls": [{
    "uploadUrl": "https://hfi-rfq-uploads.s3.amazonaws.com/...",
    "fileKey": "rfq-uploads/1234567890-abc123-test.pdf",
    "expiresIn": 900
  }]
}
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] S3 bucket is private (no public access)
- [ ] Server-side encryption enabled (AES256)
- [ ] CORS configured with specific origins only
- [ ] Lambda IAM role has minimal permissions
- [ ] Presigned URLs expire after 15 minutes
- [ ] File type validation enabled
- [ ] File size limits enforced (50MB)
- [ ] No AWS credentials in frontend code
- [ ] CloudWatch logging enabled
- [ ] Cost alerts configured

---

## 💰 Cost Estimate

**Development:** $0/month (free tier)

**Production (500 quotes/month):**
- S3 Storage: $0.23
- S3 Requests: $0.01
- Lambda: $0 (free tier)
- API Gateway: $0 (free tier)
- **Total: ~$0.50/month**

See `AWS_DEPLOYMENT_GUIDE.md` for scaling costs.

---

## 🐛 Troubleshooting

### "CORS policy" error
→ Check CORS on S3 bucket and API Gateway OPTIONS method

### "AWS credentials not found"
→ Add credentials to `.env.local`

### "File type not allowed"
→ Check `lib/aws/presigned-url.ts` FILE_EXTENSIONS array

### Upload fails after retries
→ Check S3 bucket exists, verify CloudWatch logs

---

## 📚 Documentation

- **`AWS_DEPLOYMENT_GUIDE.md`** - Complete AWS setup (750 lines)
- **`AWS_INTEGRATION_SUMMARY.md`** - What was built (500 lines)
- **`lib/aws/README.md`** - Developer reference (350 lines)
- **`.env.example`** - Environment variable template

---

## ✅ What's Next

### Remaining Tasks (from handoff.xml):
1. ~~Task #1: AWS Lambda presigned URL function~~ ✅ DONE
2. ~~Task #2: Client-side upload integration~~ ✅ DONE
3. Task #3: E2E testing with Playwright (4-6 hours)
4. Task #4: Responsive design testing (2-3 hours)
5. Task #5: Image optimization (2-4 hours)
6. Task #6: Hero video background (1-2 hours)

### Integration TODOs:
- [ ] Deploy AWS infrastructure (follow deployment guide)
- [ ] Test upload flow end-to-end
- [ ] Integrate file keys with quote submission API
- [ ] Add virus scanning (optional, recommended)

---

## 🤝 Need Help?

- **Local testing issues:** Check `lib/aws/README.md`
- **AWS deployment:** Follow `AWS_DEPLOYMENT_GUIDE.md`
- **Code questions:** Review `AWS_INTEGRATION_SUMMARY.md`
- **Security concerns:** See Security Checklist above

---

**Status:** ✅ COMPLETE - Ready for deployment
**Build:** ✅ PASSING - No TypeScript errors
**Dependencies:** ✅ INSTALLED - AWS SDK ready

**Get started:** Choose Option 1 (local) or Option 2 (production) above!
