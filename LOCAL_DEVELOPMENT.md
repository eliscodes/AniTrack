# 🗄️ Local Development with DBeaver & PostgreSQL

This guide explains how to use DBeaver for local database development.

## ✅ What is DBeaver?

DBeaver is a **database management tool** that lets you:
- ✅ Visualize your database structure
- ✅ View and edit data directly
- ✅ Run SQL queries
- ✅ Manage users and permissions
- ✅ Create backups

## 🚀 Setup Steps

### 1. Install PostgreSQL

**Windows:**
```bash
# Option A: Download from https://www.postgresql.org/download/windows/
# Option B: Use Chocolatey
choco install postgresql

# Remember the password you set for 'postgres' user!
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Local Database

```bash
# Connect to PostgreSQL default database
psql -U postgres

# Create new database for AniTrack
CREATE DATABASE anitrack_db;

# Exit psql
\q
```

### 3. Open DBeaver & Connect

1. **Open DBeaver**
2. **File → New Database Connection**
3. **Select PostgreSQL** → Next
4. **Fill in details:**
   - Host: `localhost`
   - Port: `5432` (default)
   - Database: `anitrack_db`
   - Username: `postgres`
   - Password: (what you set during PostgreSQL install)
5. **Test Connection** → Should show ✓
6. **Finish**

### 4. Setup AniTrack

```bash
# Clone project
git clone https://github.com/eliscodes/AniTrack.git
cd AniTrack

# Install dependencies
npm install --legacy-peer-deps

# Create .env.local with local database
echo 'DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/anitrack_db' > .env.local

# Generate Prisma Client
npm run db:generate

# Create tables in your local database
npm run db:push

# Start dev server
npm run dev
```

### 5. View Data in DBeaver

1. **In DBeaver**, expand your connection
2. **Databases → anitrack_db**
3. **Public → Tables**
4. You should see:
   - `User` table
   - `Anime` table
5. **Right-click table → Edit Data** to insert/view records

---

## 📊 Common Database Operations

### View All Anime

```sql
SELECT * FROM "Anime";
```

### View User's Anime

```sql
SELECT * FROM "Anime" WHERE "userId" = 'your-user-id';
```

### Add Test Data

```sql
INSERT INTO "User" (id, "clerkId", email, name)
VALUES ('user-1', 'clerk-1', 'test@example.com', 'Test User');

INSERT INTO "Anime" (id, "userId", title, "currentSeason", "currentEpisode", "isFavorite")
VALUES (
  'anime-1',
  'user-1',
  'Attack on Titan',
  1,
  5,
  true
);
```

### Delete Test Data

```sql
DELETE FROM "Anime" WHERE id = 'anime-1';
DELETE FROM "User" WHERE id = 'user-1';
```

---

## 🔄 Database Workflow

### After Code Changes

If you modify `prisma/schema.prisma`:

```bash
# 1. Generate Prisma Client with new schema
npm run db:generate

# 2. Apply changes to database
npm run db:push

# 3. Check in DBeaver if tables updated ✓
```

### Reset Database (⚠️ Deletes all data!)

```bash
# Drop all tables and recreate them
npm run prisma db push -- --force-reset
```

---

## 🚨 Troubleshooting

### "Connection refused" in DBeaver
- **Check:** Is PostgreSQL running?
  ```bash
  # macOS
  brew services list | grep postgresql
  
  # Windows: Check Services → look for PostgreSQL
  ```
- **Solution:** Start PostgreSQL service

### "Database does not exist"
```bash
# Connect and create it
psql -U postgres
CREATE DATABASE anitrack_db;
\q
```

### "Wrong password"
- Remember: You set this during PostgreSQL installation
- Can reset in PostgreSQL settings or use:
```bash
psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'newpassword';"
```

### Prisma "ERROR: relation does not exist"
```bash
# Rebuild all tables
npm run db:push -- --force-reset
```

---

## 📱 Switching to Cloud (Later)

When you're ready to deploy:

### 1. Create Supabase Account
- Go to https://supabase.com
- Create new project
- Get connection string

### 2. Update .env.local
```env
# Change from:
DATABASE_URL=postgresql://postgres:...@localhost:5432/anitrack_db

# To:
DATABASE_URL=postgresql://...@project-id.supabase.co:5432/postgres
```

### 3. Push to Cloud
```bash
npm run db:push
```

### 4. Deploy to Vercel
- Set same DATABASE_URL in Vercel environment variables
- Push code to GitHub
- Vercel auto-deploys ✓

---

## ✅ You're All Set!

Your local development is ready:
- ✅ PostgreSQL running locally
- ✅ DBeaver connected
- ✅ Prisma synced
- ✅ App running on http://localhost:3000
- ✅ Database manageable via DBeaver

**Next:** Start developing your features!

---

## 📚 Helpful Commands

```bash
# View database structure
npm run db:studio          # Opens Prisma Studio (web UI)

# Check for schema conflicts
npm run prisma validate

# See migration history
npm run prisma migrate history

# Seed database with test data
npm run db:seed            # (if you create db/seed.ts)
```

---

**Happy coding! 🎌**
