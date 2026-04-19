# 🚀 AniTrack - Quick Start Guide

Willkommen bei AniTrack! Diese Anleitung hilft dir, die App in wenigen Minuten zum Laufen zu bringen.

## 📋 Voraussetzungen

- Node.js 18+ (Download: https://nodejs.org)
- Git (Download: https://git-scm.com)
- Ein GitHub Account (für Deployment)
- 15 Minuten Zeit

---

## ✅ Step-by-Step

### 1️⃣ Repository clonen

```bash
git clone https://github.com/YOUR_USERNAME/anitrack.git
cd anitrack
```

### 2️⃣ Dependencies installieren

```bash
npm install
```

Das dauert 2-3 Minuten. ☕ Kaffee trinken 😄

### 3️⃣ Supabase Database Setup

**Warum Supabase?** Kostenlose PostgreSQL Database mit UI. Perfekt für MVP.

1. Gehe zu https://supabase.com
2. Sign up (kostenlos)
3. Create new Project
4. Warte bis Projekt initialisiert ist (5-10 Min)
5. Kopiere **Connection String**:
   - Settings → Database → Connection Strings → URI
   - Kopiere: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

**In Terminal:**
```bash
# Erstelle .env.local Datei
cp .env.example .env.local

# Öffne .env.local und füge DATABASE_URL ein:
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### 4️⃣ Clerk Setup (Authentication)

**Warum Clerk?** Modern, sicher, kostenlos bis 10k Users.

1. Gehe zu https://clerk.com
2. Sign up
3. Create Application
4. Wähle Sign-in Methods (Google + GitHub empfohlen)
5. Gehe zu **API Keys**
6. Kopiere:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
7. Füge in `.env.local` ein

**Fertige `.env.local` sollte so aussehen:**
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 5️⃣ Datenbank initialisieren

```bash
npm run db:generate   # Prisma Client generieren
npm run db:push       # Schema zur DB pushen
```

### 6️⃣ Development Server starten

```bash
npm run dev
```

Output:
```
> anitrack@0.1.0 dev
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
  
Ready in 1234ms
```

✅ Öffne http://localhost:3000 im Browser!

---

## 🎌 Deine erste App Session

1. **Startseite laden** → "AniTrack" Heading sehen
2. **Navigate zu Dashboard** → http://localhost:3000/dashboard
3. **Add Anime klicken**
4. **Anime eintragen:**
   - Title: "Attack on Titan"
   - Season: 1
   - Episode: 1
5. **Create klicken**
6. **Card erscheint mit +1 Episode Button** ✨

---

## 🚀 Deployment (5 Min)

Wenn alles lokal läuft:

### 1. GitHub Repository erstellen

```bash
git add .
git commit -m "initial: setup anitrack"
git remote add origin https://github.com/YOUR_USERNAME/anitrack.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment

1. Gehe zu https://vercel.com
2. Sign up / Login
3. Click "Import Project"
4. Verbinde GitHub
5. Wähle `anitrack` Repository
6. Environment Variables einstellen:
   ```
   DATABASE_URL = [deine-supabase-url]
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_...
   CLERK_SECRET_KEY = sk_test_...
   ```
7. Click **Deploy**
8. Warte 2-3 Min...
9. App ist LIVE! 🎉

**Deine App ist jetzt unter `anitrack.vercel.app` erreichbar**

---

## 🐛 Häufige Fehler

### "DATABASE_URL is invalid"
```bash
# Überprüfe:
# 1. Supabase Connection String korrekt kopiert?
# 2. .env.local Datei in Root-Verzeichnis?
# 3. Richtiger Passwort in der URL?

# Test:
psql $DATABASE_URL -c "SELECT version();"
```

### "Cannot find module 'next'"
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Clerk Keys funktionieren nicht
```bash
# Stelle sicher, dass du PUBLISHABLE (nicht SECRET) als NEXT_PUBLIC nutzt:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_... ✅
CLERK_SECRET_KEY=sk_... ✅
```

---

## 📚 Nächste Schritte

Nach erfolgreichem Setup:

1. **Erkunde den Code:**
   - `app/page.tsx` - Landing Page
   - `app/(dashboard)/page.tsx` - Dashboard
   - `src/components/anime/` - Anime Components

2. **Verstehe die Struktur:**
   - Lies `ARCHITECTURE.md` für Überblick
   - Schau `prisma/schema.prisma` für DB Schema

3. **Entwickle Features:**
   - Neue Komponenten in `src/components/`
   - Neue API Routes in `app/api/`
   - Neue Seiten in `app/(dashboard)/`

4. **Committe regelmäßig:**
   ```bash
   git add .
   git commit -m "feat: add feature name"
   git push
   ```

---

## 🆘 Brauchst du Hilfe?

- 📖 Lies `README.md` für große Überblick
- 📄 Schau `DEPLOYMENT.md` für Deployment-Fragen
- 📁 Lies `ARCHITECTURE.md` für Code-Struktur
- 🐛 Create GitHub Issue für Bugs

---

## 🎉 Herzlichen Glückwunsch!

Du hast AniTrack erfolgreich lokal laufen! 🚀

**Nächster Schritt:** Pushe zu GitHub & deploye auf Vercel für echte Online-Nutzung!

Happy Coding! 🎌
