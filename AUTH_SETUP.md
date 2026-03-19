# Partner Authentication System Setup

## Overview
Complete NextAuth.js v5 authentication system for partner login and admin login integrated with Etudia.

## Environment Variables Required

Add these to `.env.local`:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Admin Credentials (use bcryptjs to hash the password)
ADMIN_EMAIL=admin@etudia.com
ADMIN_PASSWORD_HASH=your-bcrypt-hashed-password

# Database (already configured)
DATABASE_URL=your-postgres-connection-string
```

## Creating Hashed Passwords

To generate a bcryptjs hash for admin password:

```bash
node -e "require('bcryptjs').hash('your-password', 10).then(h => console.log(h))"
```

## Components Created

### Authentication
- `src/lib/auth.ts` - NextAuth configuration with partner & admin credentials providers
- `src/lib/auth-types.ts` - TypeScript type definitions for NextAuth
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API handler

### Partner Pages
- `src/app/[locale]/partenaire/connexion/page.tsx` - Partner login page
- `src/app/[locale]/partenaire/mot-de-passe-oublie/page.tsx` - Password reset page
- `src/app/[locale]/partenaire/layout.tsx` - Partner section layout

### Components
- `src/components/partner/login-form.tsx` - Partner login form (client)
- `src/components/partner/forgot-password-form.tsx` - Password reset form (client)

### Navigation Updates
- Updated `src/components/layout/header.tsx` - Added "Espace partenaire" button
- Updated `src/components/layout/mobile-nav.tsx` - Added partner area link

### Translations
- Updated `src/messages/fr.json` - French translations for partner auth
- Updated `src/messages/en.json` - English translations for partner auth

## Usage

### Partner Login
1. Navigate to `/fr/partenaire/connexion` (or `/en/partner/login`)
2. Enter partner email and password
3. On success, redirects to `/partenaire/tableau-de-bord` (dashboard)

### Forgot Password
1. Navigate to `/fr/partenaire/mot-de-passe-oublie`
2. Enter email
3. Shows success message (email sending via Resend to be implemented)

### Admin Login
Future: Will be accessible at `/admin/login` using admin credentials

## Session Management

- Strategy: JWT (no database sessions)
- Max Age: 30 days
- Token contains: `id`, `role` (partner|admin), `referralCode` (for partners)
- Session exposes: `user.id`, `user.role`, `user.referralCode`

## Database Models

Uses existing `Partner` model from Prisma schema:
- `id`: unique partner identifier
- `email`: unique email
- `passwordHash`: bcryptjs hash
- `referralCode`: unique affiliate code
- `role`: implicit from partner record
- Relations: referrals, commissions, payoutRequests, linkClicks

## Next Steps

1. Install dependencies: `pnpm install`
2. Set environment variables in `.env.local`
3. Create admin user (hashed password)
4. Implement password reset email via Resend
5. Create partner dashboard at `/partenaire/tableau-de-bord`
6. Implement middleware-based route protection (optional - currently handled via page-level session checks)

## Testing

```bash
# Type check
pnpm tsc --noEmit

# Build
pnpm build

# Dev server
pnpm dev
```

Both type check and build should pass with 0 errors.
