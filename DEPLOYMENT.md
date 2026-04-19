# 🚀 Deployment Guide - AniTrack

Deploy your AniTrack app to **Vercel** (hosting) + **Supabase** (database) for free in 10 minutes.

---

## 🎯 Quick Start (5-10 Minutes)

### Step 1: Create Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create new project:
   - **Name:** `anitrack`
   - **Password:** Save securely
   - **Region:** Choose closest to you
4. Wait for project to initialize (~2 minutes)
5. Go to **Settings** → **Database** → **Connection Pooling**
6. Copy the connection string

### Step 2: Setup Local Environment

```bash
# Clone repo
git clone https://github.com/eliscodes/AniTrack.git
cd AniTrack

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:6543/postgres?schema=public
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Initialize Database

```bash
npm run db:generate
npm run db:push
npm run dev
```

Visit http://localhost:3000 to verify everything works ✅

### Step 4: Push to GitHub

If not already done:
```bash
git add .
git commit -m "chore: configure supabase"
git push origin main
```

### Step 5: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Select **Import Git Repository**
4. Choose your **AniTrack** repository
5. Under **Environment Variables**, add:
   ```
   DATABASE_URL = postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:6543/postgres?schema=public
   ```
6. Click **Deploy** 🚀

Wait 2-3 minutes for deployment to complete.

### Step 6: Verify Live App

1. Once deployed, click **Visit**
2. Create a new anime entry
3. Refresh the page - your data persists ✅

---

## 🌐 Setup Custom Domain (Optional)

Your app will be at: `https://anitrack-[random].vercel.app`

To use `anitrack.watchlist`:

1. In Vercel project settings, go to **Domains**
2. Click **Add Domain**
3. Enter `anitrack.watchlist`
4. Add DNS records to your registrar
5. Wait 5-10 minutes for DNS to propagate

---

## ✅ Deployment Checklist

- [ ] Supabase project created
- [ ] Database connection string copied
- [ ] Local .env.local configured
- [ ] Database schema initialized (`npm run db:push`)
- [ ] Local app runs (`npm run dev`)
- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Live app verified
- [ ] (Optional) Custom domain configured

---

## 🐛 Troubleshooting

### Deployment fails with "DATABASE_URL not set"
- Check Environment Variables in Vercel settings
- Make sure the value is copied correctly (full string)
- Redeploy from Vercel dashboard

### Database connection fails
- Verify Supabase project is active
- Check Supabase connection string is correct
- Test locally first before deploying

### Custom domain not working
- Wait 10-15 minutes for DNS propagation
- Check DNS records were added correctly
- Clear browser cache (Ctrl+Shift+Delete)

---

## 🔄 Continuous Deployment

After initial setup, any push to `main` automatically deploys:

```bash
# Make changes locally
git add .
git commit -m "feat: add feature"
git push origin main

# Vercel automatically deploys! 🚀
```

---

## 📚 See Also

- [GETTING_STARTED.md](./GETTING_STARTED.md) - Local setup guide
- [SUPABASE_DEPLOYMENT.md](./SUPABASE_DEPLOYMENT.md) - Detailed Supabase guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure

---

**🎉 Your app is now live in the cloud!**
