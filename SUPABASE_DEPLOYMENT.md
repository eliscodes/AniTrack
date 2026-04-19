# 🚀 AniTrack: Supabase + Vercel Deployment Guide

Deploy your AniTrack app to production in under 10 minutes with **Supabase** (database) and **Vercel** (hosting).

---

## 📋 Prerequisites

- GitHub account with AniTrack repository pushed
- Vercel account (free, creates automatically with GitHub)
- Supabase account (free tier)

---

## Step 1: Setup Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in with GitHub
3. Click **"New Project"**
   - **Project Name:** `anitrack`
   - **Database Password:** Save this securely
   - **Region:** Select closest to you
4. Click **"Create new project"** (takes ~2 minutes)

### 1.2 Get Database Connection String

Once your project is ready:

1. Go to **Settings** → **Database**
2. Under **Connection Pooling**, copy the **Connection string**
3. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:6543/postgres?schema=public
   ```

### 1.3 Initialize Database Schema

1. Clone your AniTrack repo locally (if not already):
   ```bash
   git clone https://github.com/yourusername/AniTrack.git
   cd AniTrack
   ```

2. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` and paste your Supabase connection string:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:6543/postgres?schema=public
   ```

4. Install dependencies and setup database:
   ```bash
   npm install
   npm run db:generate
   npm run db:push
   ```

5. ✅ Your Supabase database is now ready!

---

## Step 2: Deploy to Vercel

### 2.1 Import Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Select **"Import Git Repository"**
4. Find and select your **AniTrack** repository
5. Click **"Import"**

### 2.2 Configure Environment Variables

On the Vercel import screen:

1. Under **Environment Variables**, add:
   ```
   DATABASE_URL = postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:6543/postgres?schema=public
   ```
   (Copy the same value from your local `.env.local`)

2. Click **"Deploy"** 🚀

3. Wait for deployment to complete (takes ~2-3 minutes)

### 2.3 Verify Deployment

1. Once deployed, you'll see a **"Visit"** button
2. Click it to open your live app
3. Test creating a new anime entry
4. Verify data persists (refresh the page)

---

## Step 3: Setup Custom Domain (Optional)

Your app will be deployed at `https://anitrack-[random].vercel.app`

To use your custom domain `anitrack.watchlist`:

### 3.1 In Vercel Settings

1. Go to your **Vercel project** → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `anitrack.watchlist`
4. Follow instructions to add DNS records to your domain registrar

### 3.2 Verify DNS

Vercel will provide DNS records to add to your registrar. Once added:
- Wait 5-10 minutes for DNS to propagate
- Your app will be live at `https://anitrack.watchlist` ✅

---

## 📝 Environment Variables Reference

| Variable | Example | Source |
|----------|---------|--------|
| `DATABASE_URL` | `postgresql://...@supabase.co:6543/...` | Supabase Dashboard → Settings → Database |
| `NEXT_PUBLIC_APP_URL` | `https://anitrack.watchlist` | Your domain |

---

## 🔄 Deployment Workflow

After initial deployment, any push to GitHub automatically deploys to Vercel:

```bash
# Make changes locally
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin main

# Vercel automatically deploys! 🚀
```

---

## 🐛 Troubleshooting

### Database connection fails on Vercel
- ✅ Verify `DATABASE_URL` in Vercel Settings → Environment Variables
- ✅ Check Supabase is running and hasn't hit rate limits
- ✅ Try redeploying from Vercel dashboard

### Build fails with "DATABASE_URL not found"
- ✅ Make sure `DATABASE_URL` is in Vercel environment variables
- ✅ It's NOT in `.env.local` on the server (Vercel uses its own env vars)

### "Cannot find prisma client"
```bash
# Rebuild Prisma client
npm run db:generate
```

### Custom domain not working
- ✅ Wait 10-15 minutes for DNS propagation
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Check DNS records were added correctly to domain registrar

---

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Prisma + Supabase](https://www.prisma.io/docs/orm/overview/databases/supabase)

---

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Database connection string copied
- [ ] `.env.local` created locally
- [ ] Database schema initialized (`npm run db:push`)
- [ ] Repository pushed to GitHub
- [ ] Vercel project imported
- [ ] `DATABASE_URL` added to Vercel environment variables
- [ ] Deployment successful
- [ ] App working at live URL
- [ ] (Optional) Custom domain configured

---

**🎉 Your AniTrack app is now live in the cloud!**
