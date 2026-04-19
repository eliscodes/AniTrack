# 🚀 Getting Started with AniTrack

Welcome to AniTrack! This guide will get you up and running in 10 minutes.

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- Git ([Download](https://git-scm.com))
- A free [Supabase](https://supabase.com) account (PostgreSQL database)
- A free [Clerk](https://clerk.com) account (authentication)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/eliscodes/AniTrack.git
cd AniTrack
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Create `.env.local` File

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Setup Database

```bash
npm run db:generate
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 🎉

---

## 📚 Full Documentation

- **[README.md](./README.md)** - Project overview and features
- **[QUICKSTART.md](./QUICKSTART.md)** - Detailed setup guide (German)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to Vercel with custom domain
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project structure and conventions

---

## 🌍 Deployment

Deploy to **Vercel** + **Supabase** in 5 minutes:

1. Push to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com)
3. Import this repository
4. Add environment variables
5. Deploy! 🚀

Your app will run on `anitrack.watchlist` (or your custom domain)

---

## 💡 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + React 18 + TypeScript |
| Styling | TailwindCSS + Dark Mode |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Supabase) + Prisma |
| Auth | Clerk (not yet integrated) |

---

## 🎯 Current Features

✅ Anime CRUD operations  
✅ Episode tracking (season + episode)  
✅ Favorite marking  
✅ Search functionality  
✅ Responsive dashboard  
✅ Dark mode default  
✅ Statistics & progress tracking  

---

## 📝 Next Steps

- Integrate Clerk authentication
- Add Framer Motion animations
- Add import/export functionality
- Add MyAnimeList API suggestions
- Deploy to production!

---

## 🐛 Troubleshooting

**"npm install fails"**
```bash
npm install --legacy-peer-deps --force
```

**"DATABASE_URL is invalid"**
- Check your Supabase connection string format
- Test with: `psql $DATABASE_URL -c "SELECT version();"`

**"Prisma error"**
```bash
npm run db:generate  # Regenerate Prisma client
npm run db:push      # Sync schema with DB
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📞 Support

- 📖 Read the docs in the project root
- 🐛 Create an issue on GitHub
- 💬 Check existing discussions

---

**Happy anime tracking! 🎌**
