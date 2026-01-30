# Deploy & Git — Quick reference

## Git (main branch)

```bash
# See status
git status

# Stage all changes
git add -A

# Commit
git commit -m "Your message"

# Push to main (triggers Vercel deploy if connected)
git push origin main
```

**One-liner (after editing):**
```bash
git add -A && git commit -m "Your message" && git push origin main
```

---

## Deploy (Vercel)

**Option A — Push to GitHub (recommended)**  
If the repo is linked in Vercel, every push to `main` auto-deploys.

```bash
git push origin main
```

**Option B — Vercel CLI**
```bash
# First time: npm i -g vercel && vercel login
npx vercel --prod    # production
npx vercel           # preview
```

**Or use npm scripts:**
```bash
npm run deploy         # production (vercel --prod)
npm run deploy:preview # preview
```

---

## Local build (test before deploy)

```bash
npm run build   # must succeed
npm run start   # run production build locally
```

---

## Remote

- **Origin:** `git@github.com:sarahkitay/IVY.git`
- **Branch:** `main`

```bash
git remote -v
git branch -a
```
