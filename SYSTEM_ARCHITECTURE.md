# AniTrack - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│  (Desktop, Tablet, Mobile - Responsive)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTPS Connection
                             │
            ┌────────────────▼─────────────────┐
            │                                  │
            │      VERCEL DEPLOYMENT           │
            │  (anitrack.watchlist)            │
            │                                  │
            │  ┌──────────────────────────┐   │
            │  │  Next.js Frontend        │   │
            │  │  - React 18 Components   │   │
            │  │  - TailwindCSS Styling   │   │
            │  │  - Client-side Logic     │   │
            │  └────────┬─────────────────┘   │
            │           │                     │
            │  ┌────────▼──────────────────┐   │
            │  │  Next.js API Routes      │   │
            │  │  /api/anime/*            │   │
            │  │  (REST Endpoints)        │   │
            │  └────────┬─────────────────┘   │
            │           │                     │
            └───────────┼─────────────────────┘
                        │
                        │ HTTPS/REST
                        │
        ┌───────────────▼───────────────┐
        │                               │
        │   SUPABASE (Database)         │
        │                               │
        │  ┌────────────────────────┐   │
        │  │   PostgreSQL DB        │   │
        │  │   - Users              │   │
        │  │   - Animes             │   │
        │  │   - Progress Records   │   │
        │  │   - Audit Logs         │   │
        │  └────────────────────────┘   │
        │                               │
        │  ┌────────────────────────┐   │
        │  │   Auto Backups         │   │
        │  │   (Daily + Realtime)   │   │
        │  └────────────────────────┘   │
        │                               │
        └───────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                   CLERK AUTHENTICATION                          │
│              (Login, Registration, OAuth)                       │
│                                                                 │
│   Third-party service - Not hosted by us                       │
│   Handles: Google Login, GitHub Login, JWT Tokens              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request/Response Flow

### Creating a New Anime Entry

```
1. User clicks "Add Anime" in Browser
                    ↓
2. React Component renders AnimeForm
                    ↓
3. User fills form and clicks "Create"
                    ↓
4. POST /api/anime/
   {
     "title": "Attack on Titan",
     "currentSeason": 1,
     "currentEpisode": 1,
     "notes": "Amazing series!"
   }
                    ↓
5. Next.js API Route validates input
   - Check title not empty
   - Check episode > 0
                    ↓
6. Prisma ORM creates record in PostgreSQL
                    ↓
7. Return 201 Created + new Anime object
                    ↓
8. React updates state
                    ↓
9. UI re-renders with new anime in list
```

### Fetching Anime List

```
Dashboard Page loads
         ↓
useEffect(() => fetch('/api/anime'))
         ↓
GET /api/anime?q=search&page=1&limit=20
         ↓
Prisma queries PostgreSQL
         ↓
Return JSON array of animes
         ↓
React renders AnimeList component
         ↓
User sees all their animes 🎉
```

---

## 📊 Database Schema

```sql
-- Users Table
CREATE TABLE User {
  id        String  PRIMARY KEY
  clerkId   String  UNIQUE
  email     String  UNIQUE
  name      String?
  createdAt DateTime
  updatedAt DateTime
}

-- Animes Table
CREATE TABLE Anime {
  id             String  PRIMARY KEY
  userId         String  (Foreign Key → User.id)
  title          String
  coverUrl       String?
  isFavorite     Boolean
  notes          String?
  currentSeason  Int?
  currentEpisode Int
  createdAt      DateTime
  updatedAt      DateTime
}

-- Relationships
User 1:N Anime (one user has many animes)
```

---

## 🔐 Security Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
   HTTPS Only
       │
       ▼
┌──────────────────────────────┐
│  Clerk Authentication        │
│  ✓ OAuth (Google, GitHub)    │
│  ✓ JWT Token Generation      │
│  ✓ Session Management        │
└──────┬───────────────────────┘
       │
   Valid JWT Token
       │
       ▼
┌──────────────────────────────┐
│  Next.js API Routes          │
│  ✓ Verify JWT Token          │
│  ✓ Extract userId            │
│  ✓ Validate Input (Zod)      │
│  ✓ Rate Limiting (TODO)      │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Prisma ORM                  │
│  ✓ Parameterized Queries     │
│  ✓ SQL Injection Prevention  │
│  ✓ Type Safety               │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  PostgreSQL Database         │
│  ✓ Row-level Security (RLS)  │
│  ✓ Encryption at rest        │
│  ✓ SSL Connections           │
│  ✓ Auto Backups              │
└──────────────────────────────┘
```

---

## 📱 Component Hierarchy

```
app/
├── layout.tsx                  (Root)
│   │
│   ├── page.tsx               (Landing page)
│   │
│   └── (dashboard)            (Protected routes)
│       │
│       └── page.tsx           (Main dashboard)
│           │
│           ├── <Header />
│           │   ├── Navigation
│           │   └── User menu
│           │
│           ├── <SearchBar />
│           │   └── Search/Filter anime
│           │
│           ├── <StatsCards />
│           │   ├── Total anime count
│           │   ├── Favorite count
│           │   ├── Episodes watched
│           │   └── Favorite ratio
│           │
│           ├── <AnimeList />
│           │   │
│           │   └── <AnimeCard /> (repeated)
│           │       ├── Title & Progress
│           │       ├── Notes display
│           │       ├── Progress bar
│           │       ├── Action buttons
│           │       │   ├── <Button> Edit
│           │       │   ├── <Button> +1 Episode
│           │       │   ├── <Button> Delete
│           │       │   └── <Button> Favorite
│           │       │
│           │
│           └── <AnimeForm />   (Modal/Inline)
│               ├── <Input> Title
│               ├── <Input> Season
│               ├── <Input> Episode
│               ├── <Input> Notes
│               └── <Button> Submit
```

---

## 🚀 Deployment Pipeline

```
Developer commits code
        ↓
git push to GitHub
        ↓
GitHub receives push
        ↓
Vercel webhook triggered
        ↓
Vercel clones repository
        ↓
npm install --legacy-peer-deps
        ↓
npm run build
        ↓
Next.js compiles & optimizes
        ↓
Tests run (if configured)
        ↓
Build succeeds ✅
        ↓
Deployment to edge network
        ↓
Live at anitrack.watchlist 🌍
        ↓
Environment variables injected
        ↓
API routes connect to Supabase
        ↓
Ready for users!
```

---

## 🔄 CI/CD Considerations (Future)

```
GitHub Actions could add:
  ✓ Run ESLint
  ✓ Run TypeScript type check
  ✓ Run tests (Jest)
  ✓ Run E2E tests (Cypress)
  ✓ Code coverage reports
  ✓ Security scanning
  ✓ Dependency updates
  ✓ Deploy to staging on PR
  ✓ Deploy to production on main
```

---

**This architecture is designed for:**
- ✅ Scalability (handles 1000+ users easily)
- ✅ Security (authentication, SQL injection prevention)
- ✅ Performance (CDN edge deployment)
- ✅ Reliability (automatic backups, monitoring)
- ✅ Developer Experience (modern tools, TypeScript)
