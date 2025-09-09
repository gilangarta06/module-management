# Next.js NextAuth Mongoose Auth (TypeScript)

Project created as a template to satisfy the user's requirements:
- Next.js (Pages Router) with TypeScript
- NextAuth with Google, Facebook, Github, Apple, Credentials
- MongoDB + Mongoose
- User model with bcrypt-hashed password for credentials login
- Dark mode UI with TailwindCSS
- Routes: /auth/login and /auth/register
- Single project for frontend + backend (API routes in /pages/api)

**How to run**
1. Copy `.env.example` to `.env.local` and fill values.
2. Install dependencies: `npm install`
3. Run dev: `npm run dev`

Note: OAuth providers require valid client IDs and secrets; for Apple, the setup is more involved (use appropriate keys). This template uses environment variables as placeholders.
