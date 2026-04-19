# 📁 AniTrack - Projektstruktur

```
anitrack/
│
├── 📁 app/                           # Next.js App Router (13+)
│   ├── 📁 api/                       # Backend API Routes
│   │   └── 📁 anime/
│   │       ├── route.ts             # GET (list), POST (create)
│   │       └── 📁 [id]/
│   │           └── route.ts         # GET, PATCH, DELETE
│   │
│   ├── 📁 (auth)/                   # Auth-geschützte Routen
│   │   ├── login/
│   │   ├── register/
│   │   └── callback/
│   │
│   ├── 📁 (dashboard)/              # Dashboard-Routen
│   │   ├── page.tsx                 # Home/Liste
│   │   ├── [id]/
│   │   │   └── page.tsx            # Detail-View
│   │   └── settings/
│   │       └── page.tsx            # User-Einstellungen
│   │
│   ├── layout.tsx                   # Root Layout (wichtig!)
│   ├── page.tsx                     # Landing/Home
│   └── globals.css                  # Global Styles
│
├── 📁 src/
│   │
│   ├── 📁 components/               # React-Komponenten
│   │   ├── 📁 ui/                  # Base UI Components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Modal.tsx            # TODO
│   │   │   └── Badge.tsx            # TODO
│   │   │
│   │   ├── 📁 anime/               # Anime-Feature Components
│   │   │   ├── AnimeCard.tsx       # Single Anime Card
│   │   │   ├── AnimeList.tsx       # Anime List/Grid
│   │   │   ├── AnimeForm.tsx       # Create/Edit Form
│   │   │   ├── AnimeDetail.tsx     # Detail-Seite
│   │   │   └── QuickUpdate.tsx     # Episode +1 Button
│   │   │
│   │   └── 📁 layout/              # Layout Components
│       ├── Header.tsx              # Navigation
│       ├── Sidebar.tsx             # Side Navigation
│       └── Footer.tsx              # Footer
│   │
│   ├── 📁 lib/                     # Utilities & Helper
│   │   ├── prisma.ts              # Prisma Client
│   │   ├── utils.ts               # String, Format helpers
│   │   └── api.ts                 # API Client (axios wrapper)
│   │
│   ├── 📁 hooks/                  # Custom React Hooks
│   │   ├── useAsync.ts
│   │   ├── useAnime.ts            # TODO
│   │   ├── useAuth.ts             # TODO
│   │   └── useLocalStorage.ts     # TODO
│   │
│   ├── 📁 types/                  # TypeScript Types
│   │   └── index.ts               # All types exported
│   │
│   └── 📁 styles/                 # Additional Styles
       └── globals.css              # TailwindCSS + custom
│
├── 📁 prisma/
│   ├── schema.prisma              # Database Schema (wichtig!)
│   └── 📁 migrations/             # DB Migrations (auto-generated)
│
├── 📁 public/                     # Static Files
│   ├── favicon.ico
│   └── logo.svg                   # TODO
│
├── 📦 Configuration Files
│   ├── package.json               # Dependencies
│   ├── tsconfig.json             # TypeScript Config
│   ├── next.config.ts            # Next.js Config
│   ├── tailwind.config.ts        # TailwindCSS Config
│   ├── postcss.config.mjs        # PostCSS Config
│   └── eslint.config.mjs         # ESLint Rules
│
├── 📝 Documentation
│   ├── README.md                  # Main README (start hier!)
│   ├── DEPLOYMENT.md              # Deployment Guide
│   ├── CONTRIBUTING.md            # Contributing Rules
│   └── ARCHITECTURE.md            # This file
│
└── 🔐 Secrets (NOT in Git)
    └── .env.local                 # Local environment variables
        └── .env.production        # Production (Vercel only)
```

---

## 🔄 Data Flow

```
User Browser
    ↓
Next.js Frontend (React)
    ↓
Next.js API Routes (/api/anime)
    ↓
Prisma ORM
    ↓
PostgreSQL (Supabase)
```

---

## 📦 Key Files Erklärung

### `app/layout.tsx` ⭐
- **Wichtigste Datei!** Wrapping alle Seiten
- Imports: global CSS, Font-Konfiguration
- Wo Clerk Auth-Provider kommt (später)

### `app/api/anime/route.ts`
- Backend für Anime-CRUD
- GET: Alle Animes abrufen (mit Filtern)
- POST: Neuen Anime erstellen

### `prisma/schema.prisma`
- **Database Schema** (strukturelle Definition)
- Definiert: User, Anime, Relationships
- `npm run db:push` deployt Schema

### `src/lib/prisma.ts`
- Prisma Client Singleton
- Verhindert mehrere DB-Connections

### `tailwind.config.ts`
- TailwindCSS Konfiguration
- Custom Colors (z.B. dark theme)
- Animations Definition

---

## 🎯 Common Development Tasks

### Neue Komponente hinzufügen
```
src/components/anime/MyNewComponent.tsx
```

### Neue API Route
```
app/api/anime/new-endpoint/route.ts
```

### Neue Seite
```
app/(dashboard)/my-page/page.tsx
```

### DB Schema ändern
```
1. Ändere prisma/schema.prisma
2. npm run db:generate  (erzeugt Prisma Client)
3. npm run db:push     (synced mit DB)
```

---

## 🚀 Development Server

```bash
npm run dev
# Läuft auf http://localhost:3000

# Mit Live Reload & Hot Module Replacement
# Ändere Datei → Browser aktualisiert automatisch
```

---

## ✅ Naming Conventions

- **Komponenten**: PascalCase (`AnimeCard.tsx`)
- **Hooks**: camelCase, prefix `use` (`useAnime.ts`)
- **Utils**: camelCase (`formatProgress.ts`)
- **Types**: PascalCase (`Anime.ts`)
- **API Routes**: kebab-case (`/api/anime/quick-update`)

---

**Happy Coding! 🎌**
