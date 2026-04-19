# 🚀 Deployment Guide - AniTrack

Dieses Projekt kann mit **Vercel** (kostenloses Hosting) + **Supabase** (kostenloses PostgreSQL) deployed werden.

## 🎯 Schnell-Start (5-10 Minuten)

### 1️⃣ Supabase Database Setup

1. Gehe zu https://supabase.com und registriere dich (kostenlos)
2. Erstelle neues Project
3. Warte bis Projekt ready ist
4. Gehe zu **Settings → Database → Connection Strings**
5. Kopiere **Connection String** (URI)
6. Ersetze `[YOUR-PASSWORD]` mit deinem Passwort

### 2️⃣ Clerk Authentication Setup

1. Gehe zu https://clerk.com und registriere dich (kostenlos)
2. Erstelle neue App
3. Wähle Sign-in Methods (Google, GitHub empfohlen)
4. Gehe zu **API Keys**
5. Kopiere:
   - `NEXT_PUBLIC_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 3️⃣ Environment Variablen konfigurieren

Lokal testen:

```bash
# .env.local
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/[database]
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4️⃣ Datenbank Setup

```bash
npm install
npm run db:generate
npm run db:push
npm run dev
```

Öffne http://localhost:3000

### 5️⃣ GitHub Repository

```bash
git add .
git commit -m "initial: setup anitrack project"
git remote add origin https://github.com/YOUR_USERNAME/anitrack.git
git push -u origin main
```

### 6️⃣ Vercel Deployment

1. Gehe zu https://vercel.com und melde dich an
2. Klicke **Import Project**
3. Verbinde dein GitHub Account
4. Wähle `anitrack` Repository
5. Unter **Environment Variables** hinzufügen:
   ```
   DATABASE_URL = [deine-supabase-url]
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = [dein-clerk-key]
   CLERK_SECRET_KEY = [dein-clerk-secret]
   ```
6. Klicke **Deploy**
7. Fertig! App läuft auf `anitrack.vercel.app`

---

## ✅ Checklist vor Deployment

- [ ] Supabase Projekt erstellt
- [ ] Clerk App erstellt
- [ ] Environment Variablen gesetzt
- [ ] `npm run db:push` erfolgreich
- [ ] Lokale App läuft (`npm run dev`)
- [ ] Code zu GitHub gepusht
- [ ] Vercel Deployment erfolgreich

---

## 🐛 Troubleshooting

### "DATABASE_URL is invalid"
```bash
# Überprüfe Supabase Connection String
# Format: postgresql://[user]:[password]@[host]:[port]/[database]
```

### "Clerk API Keys ungültig"
- Überprüfe API Keys in Clerk Dashboard
- Stelle sicher, dass Keys für richtige Umgebung sind

### "Prisma Migration fehlgeschlagen"
```bash
npm run prisma db push -- --force-reset  # ⚠️ WARNUNG: Löscht Daten!
```

---

## 📱 Custom Domain (Optional)

Nach erfolgreichem Vercel Deployment:

1. Gehe zu Vercel Project Settings
2. Klicke **Domains**
3. Gib deine Domain ein
4. Folge Anweisungen zu DNS-Konfiguration

---

## 🔒 Production Best Practices

- [ ] Nutze Production Clerk Keys (nicht Test Keys)
- [ ] Database Backup aktivieren (Supabase Auto-Backups: kostenlos ✅)
- [ ] Monitor Error Logs (Vercel Analytics)
- [ ] Regelmäßig Dependencies updaten

---

Fragen? Erstelle ein Issue auf GitHub!
