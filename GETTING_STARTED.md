# 🚀 Getting Started with AniTrack

Welcome! This guide will get your AniTrack app running in 5 minutes.

---

## 📋 Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org))
- **Git** ([Download](https://git-scm.com))
- **Supabase account** (free at [supabase.com](https://supabase.com))

---

## ⚡ Quick Start (Supabase + Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/eliscodes/AniTrack.git
cd AniTrack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase Database

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project:
   - **Name:** `anitrack`
   - **Password:** Save it securely
   - **Region:** Select one closest to you
3. Wait for project to initialize (~2 minutes)
4. Go to **Settings** → **Database** → **Connection Pooling**
5. Copy the connection string (starts with `postgresql://`)

### 4. Create `.env.local`

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your Supabase connection string:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:6543/postgres?schema=public
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Initialize Database Schema

```bash
npm run db:generate
npm run db:push
```

This creates all tables in your Supabase database automatically.

### 6. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## ✅ That's It!

Your app is now running locally with a cloud database. You can:

- ✅ Create, read, update, delete anime
- ✅ Track episode progress
- ✅ Mark favorites
- ✅ Search and filter
- ✅ All data synced to Supabase cloud

---

## 🚀 Next: Deploy to Production

When ready, deploy to Vercel for free:

See **[SUPABASE_DEPLOYMENT.md](./SUPABASE_DEPLOYMENT.md)** for step-by-step instructions.

---

## 🐛 Troubleshooting

### "npm install fails"
```bash
npm install --force
```

### "DATABASE_URL is invalid"
- Check the connection string format starts with `postgresql://`
- Verify your Supabase password doesn't have special characters (or is URL-encoded)
- Test: `npm run db:generate`

### "Prisma error during db:push"
```bash
# Regenerate Prisma client
npm run db:generate

# Then try again
npm run db:push
```

### "localhost:3000 shows blank page"
- Check console for errors (F12)
- Verify DATABASE_URL is set correctly
- Restart dev server: `npm run dev`

---

## 📚 Full Documentation

- **[README.md](./README.md)** - Project overview
- **[SUPABASE_DEPLOYMENT.md](./SUPABASE_DEPLOYMENT.md)** - Deploy to production
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Code structure

---

## 💡 Tech Stack

- **Frontend:** Next.js 15 + React 18 + TypeScript
- **Styling:** TailwindCSS (dark mode)
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase) + Prisma
- **Hosting:** Vercel (when ready to deploy)

---

**Happy anime tracking! 🎌**
