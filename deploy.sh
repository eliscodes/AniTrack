#!/bin/bash

# 🚀 AniTrack - Vercel Deployment Cheat Sheet
# Use this script to easily deploy to Vercel with anitrack.watchlist domain

# ============================================
# STEP 1: Verify Everything is Pushed to GitHub
# ============================================
echo "✓ Checking Git status..."
git status
echo ""
echo "⚠️  Make sure everything is committed and pushed to:"
echo "   https://github.com/eliscodes/AniTrack"
echo ""

# ============================================
# STEP 2: Manual Vercel Setup (Can't automate)
# ============================================
echo "📋 NEXT STEPS (Manual):"
echo ""
echo "1️⃣  Go to https://vercel.com"
echo "2️⃣  Click 'Add New' → 'Project'"
echo "3️⃣  Select 'Import an Existing Project'"
echo "4️⃣  Search for 'AniTrack' repository"
echo "5️⃣  Click 'Import'"
echo ""
echo "6️⃣  Scroll to 'Environment Variables' and add:"
echo "   • DATABASE_URL         (from Supabase)"
echo "   • NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   • CLERK_SECRET_KEY"
echo ""
echo "7️⃣  Click 'Deploy' (takes 2-3 min)"
echo ""
echo "8️⃣  After deployment:"
echo "    a) Go to Project Settings"
echo "    b) Click 'Domains'"
echo "    c) Add custom domain: anitrack.watchlist"
echo "    d) Follow DNS configuration steps"
echo ""
echo "9️⃣  Done! App will be live at:"
echo "    🌍 https://anitrack.watchlist"
echo ""

# ============================================
# QUICK LINKS
# ============================================
echo "📚 Quick Links:"
echo "  • Vercel:  https://vercel.com"
echo "  • Supabase: https://supabase.com"
echo "  • Clerk:   https://clerk.com"
echo "  • GitHub:  https://github.com/eliscodes/AniTrack"
echo ""

# ============================================
# TROUBLESHOOTING
# ============================================
echo "🐛 Troubleshooting:"
echo ""
echo "If deployment fails with 'npm error':"
echo "  → vercel.json has --legacy-peer-deps configured"
echo "  → This is expected for Next.js 15 + React 19 compatibility"
echo ""
echo "If database connection fails:"
echo "  → Double-check DATABASE_URL format"
echo "  → Test locally: npm run dev"
echo ""
echo "If domain not connecting:"
echo "  → Wait 24-48 hours for DNS propagation"
echo "  → Check DNS records in Vercel dashboard"
echo ""

echo "✅ All set! Follow the 9 steps above to deploy."
