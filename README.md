# Authentication UI Flow

A modern authentication UI with **real auth** via **Supabase** (free tier). React, Vite, Tailwind CSS. Dark theme, email confirmation required before sign-in, and a protected dashboard.

## Features

- **Sign up** — Create account → confirmation email sent → **congratulations page** with link to sign in
- **Email confirmation** — User must click the link in the email to confirm; **sign in is blocked until confirmed**
- **Sign in** — After confirmation, sign in → redirect to **dashboard** with user content
- **Auth callback** — Confirmation link redirects to `/auth/callback`, then to dashboard (or sign-in with “Email confirmed!”)
- **Forgot password** — Sends reset email via Supabase
- **Protected dashboard** — Only signed-in users can access; shows user info and sign out

## Supabase setup (free)

1. Create a project at [supabase.com](https://supabase.com) (free tier).
2. In the dashboard go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. Enable **email confirmation** (required so users can’t sign in before confirming):
   - **Authentication → Providers → Email** → turn on **“Confirm email”**.
4. Add redirect URLs:
   - **Authentication → URL Configuration**
   - **Redirect URLs**: add `http://localhost:5173/auth/callback` (local) and `https://your-app.vercel.app/auth/callback` (production).
   - **Site URL**: `http://localhost:5173` for local dev; set to your production URL (e.g. `https://your-app.vercel.app`) so confirmation emails link to your live app, not localhost.

Create a `.env` file in the project root (see `.env.example`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Quick start

```bash
npm install
cp .env.example .env   # then edit .env with your Supabase values
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). You’ll be redirected to `/login`.

## Deploying to Vercel

1. In **Vercel → Project → Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - **`VITE_APP_URL`** = your Vercel URL (e.g. `https://authentication-eta-gules.vercel.app`) so confirmation and password-reset emails point to your app instead of localhost.
2. In **Supabase → Authentication → URL Configuration**:
   - **Site URL**: set to your Vercel URL (e.g. `https://your-app.vercel.app`).
   - **Redirect URLs**: include `https://your-app.vercel.app/auth/callback`.
3. Redeploy after changing env vars.

## Routes

| Path                | Page / behavior |
|---------------------|------------------|
| `/`                 | Redirects to `/login` |
| `/login`            | Sign in → on success → `/dashboard` |
| `/signup`           | Create account → `/signup/success` |
| `/signup/success`   | Congratulations + “Go to sign in” |
| `/forgot-password`  | Request password reset email |
| `/auth/callback`    | Handles email confirmation link → dashboard or `/login?confirmed=1` |
| `/dashboard`       | Protected; user content + sign out |

## Flow summary

1. **Sign up** → User submits form → Supabase sends confirmation email → app shows **congratulations** page and link to sign in.
2. **Confirm email** → User clicks link in email → Supabase redirects to `/auth/callback` → app establishes session and redirects to **dashboard** (or to `/login?confirmed=1` if no session).
3. **Sign in** → If email not confirmed, Supabase returns an error and the app shows “Please confirm your email first.” If confirmed, sign in succeeds and user is redirected to **dashboard**.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Stack

- React 18, React Router 6, Vite 5, Tailwind CSS 4
- Supabase (Auth): sign up, sign in, email confirmation, password reset
