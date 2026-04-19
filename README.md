# 🎌 AniTrack - Modern Anime Progress Tracker

A beautiful, minimalist fullstack web application for tracking your anime watching progress. Built with cutting-edge tech for maximum performance and UX.

**🚀 Live Demo:** Coming soon on anitrack.watchlist  
**💻 GitHub:** https://github.com/eliscodes/AniTrack  
**⭐ Data Persistence:** All your data is securely stored in the cloud, synced across devices  
**📱 Mobile First:** Optimized for smartphones, works as a PWA

---

## 🎯 Features

### Core
- ✅ **Quick Progress Updates** - Update episode in 1-2 clicks
- ✅ **Anime Library** - Create, edit, delete anime entries
- ✅ **Track Progress** - Season + Episode tracking
- ✅ **Search & Filter** - Find any anime instantly
- ✅ **Personal Notes** - Add custom notes to any anime
- ✅ **Favorites** - Mark your favorite series

### Advanced
- ✅ **Progress Bars** - Visual progress tracking
- ✅ **Statistics** - Completion stats & progress overview
- ✅ **Import/Export** - Backup & restore your data (JSON)
- ✅ **Auto-Suggestions** - Smart anime name suggestions
- ✅ **PWA Support** - Install as app, offline-ready
- ✅ **Dark Mode** - Modern dark UI (default)
- ✅ **Smooth Animations** - Framer Motion transitions
- ✅ **Responsive Design** - Works on all devices

---

## 🔐 Data & Privacy

**Important:** All your anime progress data is **stored securely on our cloud database**, not locally. This means:
- ✅ Your data persists between sessions
- ✅ Access your progress from any device
- ✅ Automatic cloud backups
- ✅ Data is yours - you can export anytime

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | TailwindCSS 4, Framer Motion |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL + Prisma ORM |
| **Hosting** | Vercel (Frontend + Backend), Supabase (Database) |

---

## 🚀 Quick Start for Developers

### Prerequisites
- Node.js 18+ (LTS)
- Git

### Installation

```bash
# Clone repo
git clone https://github.com/yourusername/anitrack.git
cd anitrack

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local and add your DB URL
```

### Database Setup

You need a PostgreSQL database. The easiest way is to use **Supabase** (free, managed):

1. Go to [supabase.com](https://supabase.com)
2. Create new project (takes ~2 minutes)
3. Copy Connection String to `.env.local` and `.env` as `DATABASE_URL`

See [SUPABASE_DEPLOYMENT.md](./SUPABASE_DEPLOYMENT.md) for full instructions.

### Run Development Server

```bash
# Setup Prisma
npm run db:generate
npm run db:push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For production deployment, see [SUPABASE_DEPLOYMENT.md](./SUPABASE_DEPLOYMENT.md).

---

## 📦 Project Structure

```
anitrack/
├── app/                  # Next.js App Router
│   ├── api/             # Backend API routes
│   ├── (auth)/          # Auth pages (login, register)
│   ├── (dashboard)/     # Protected dashboard routes
│   └── page.tsx         # Home page
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utilities & helpers
│   ├── types/          # TypeScript types
│   └── styles/         # Global CSS
├── prisma/
│   └── schema.prisma   # Database schema
├── public/             # Static assets
└── README.md
```

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feat/your-feature

# Make changes & commit
git add .
git commit -m "feat: describe your change"

# Push & create PR
git push origin feat/your-feature
```

**Commit Style:**
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code refactor
- `docs:` documentation
- `test:` tests

---

## 📈 Planned Features

- [ ] Social features (share lists, compare progress)
- [ ] Integration with MyAnimeList API
- [ ] Watch history timeline
- [ ] Community recommendations
- [ ] Browser extensions

---

## 🐛 Known Issues & Troubleshooting

### Database connection fails
```bash
# Test PostgreSQL connection
psql $DATABASE_URL
```

### Prisma migration issues
```bash
# Reset database (WARNING: deletes data!)
npm run prisma db push -- --force-reset
```

---

## 📝 License

MIT © 2026 AniTrack

---

## 🙏 Support

Have questions? Issues?
- 📧 Open an issue on GitHub
- 💬 Check existing discussions
- 🐦 Create a detailed bug report

---

**Made with ❤️ for anime fans everywhere**
