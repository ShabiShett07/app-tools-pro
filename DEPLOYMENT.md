# Deployment Guide - App Tools Pro

This guide explains how to deploy your local changes to production on Vercel.

## Prerequisites

- Git installed and configured
- GitHub account connected
- Vercel CLI installed (`npm install -g vercel`)
- Vercel account connected to GitHub

---

## Deployment Process

### Step 1: Make Your Changes Locally

Work on your code in the project directory:
```bash
cd /Users/shabareeshshetty/Developer/app-tools-pro
```

### Step 2: Test Locally

Run the development server to test your changes:
```bash
npm run dev
```

Visit `http://localhost:3000` to verify everything works.

### Step 3: Stage Your Changes

Add all modified files to git:
```bash
git add .
```

Or add specific files:
```bash
git add path/to/file.tsx
```

### Step 4: Commit Your Changes

Create a commit with a descriptive message:
```bash
git commit -m "Description of your changes"
```

**Example:**
```bash
git commit -m "Add new feature: user dashboard"
```

**For detailed commits (recommended):**
```bash
git commit -m "$(cat <<'EOF'
Add user dashboard feature

- Created dashboard layout component
- Added user stats display
- Integrated API endpoints
- Added responsive design

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Step 5: Push to GitHub

Push your commits to the main branch:
```bash
git push
```

Or if you need to specify the branch:
```bash
git push origin main
```

### Step 6: Deploy to Vercel

Deploy to production using Vercel CLI:
```bash
vercel --prod --yes
```

**What this does:**
- Uploads your code to Vercel
- Builds your Next.js application
- Deploys to your production domain (apptoolspro.com)
- Shows deployment URL when complete

### Step 7: Verify Deployment

1. Wait for deployment to complete (~2-3 minutes)
2. Visit your production site: https://apptoolspro.com
3. Test your new changes
4. Check for any errors in Vercel dashboard if needed

---

## Quick Reference Commands

### Complete Deployment Workflow

```bash
# 1. Stage all changes
git add .

# 2. Commit with message
git commit -m "Your commit message here"

# 3. Push to GitHub
git push

# 4. Deploy to Vercel
vercel --prod --yes
```

### One-Line Deployment (after testing)

```bash
git add . && git commit -m "Your message" && git push && vercel --prod --yes
```

---

## Environment Variables

If you add new environment variables:

1. **Add to `.env.local` (for local development)**
   ```bash
   NEXT_PUBLIC_YOUR_NEW_VAR=your-value
   ```

2. **Add to Vercel (for production)**
   - Go to: https://vercel.com/shabareesh-shettys-projects/app-tools-pro/settings/environment-variables
   - Click "Add New"
   - Enter variable name and value
   - Select environments: Production, Preview, Development
   - Click "Save"

3. **Redeploy after adding env vars**
   ```bash
   vercel --prod --yes
   ```

---

## Troubleshooting

### Build Fails on Vercel

1. Check build logs:
   ```bash
   vercel logs <deployment-url>
   ```

2. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies

### Changes Not Showing

1. Hard refresh browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Clear browser cache
3. Check deployment URL matches your domain
4. Verify deployment completed successfully

### Rollback to Previous Version

If you need to rollback:

1. Go to Vercel dashboard: https://vercel.com/shabareesh-shettys-projects/app-tools-pro
2. Click "Deployments" tab
3. Find the working deployment
4. Click "..." → "Promote to Production"

---

## Database Changes (Supabase)

If you modify the database schema:

1. **Update local schema:**
   - Edit `supabase-schema.sql`

2. **Apply to Supabase:**
   - Go to: https://supabase.com/dashboard/project/ssocmuomtwykjfqvnhby
   - Click "SQL Editor"
   - Run your SQL changes

3. **Commit schema file:**
   ```bash
   git add supabase-schema.sql
   git commit -m "Update database schema"
   git push
   ```

---

## Best Practices

### Before Deploying

- ✅ Test locally on `http://localhost:3000`
- ✅ Check console for errors
- ✅ Test all new features
- ✅ Verify mobile responsiveness
- ✅ Check database integration (if modified)

### Commit Messages

Use clear, descriptive commit messages:
- ✅ Good: "Add email validation to waitlist form"
- ❌ Bad: "fix bug"
- ✅ Good: "Update success page styling for mobile"
- ❌ Bad: "changes"

### Deployment Frequency

- Deploy after completing a feature
- Don't deploy broken code
- Test thoroughly before deploying
- Deploy during low-traffic times if possible

---

## Quick Deploy Script

Create a script for faster deployment:

```bash
# Save this as deploy.sh in your project root
#!/bin/bash

echo "🚀 Deploying to production..."

# Stage changes
git add .

# Commit
read -p "Enter commit message: " message
git commit -m "$message"

# Push to GitHub
git push

# Deploy to Vercel
vercel --prod --yes

echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Use it:
```bash
./deploy.sh
```

---

## Important URLs

- **Production Site:** https://apptoolspro.com
- **Vercel Dashboard:** https://vercel.com/shabareesh-shettys-projects/app-tools-pro
- **GitHub Repository:** https://github.com/ShabiShett07/app-tools-pro
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ssocmuomtwykjfqvnhby

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review GitHub Actions (if enabled)
3. Check Supabase logs for database errors
4. Review browser console for client-side errors

---

**Last Updated:** December 2024
**Maintained by:** Shabareesh Shetty
