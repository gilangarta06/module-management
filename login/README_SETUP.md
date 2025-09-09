## Setup notes & caveats

- Apple Sign-in often requires additional keys/certs and a generated client secret (JWT). Use the Apple developer console to configure.
- For OAuth providers, make sure redirect URIs include: `http://localhost:3000/api/auth/callback/{provider}`
  e.g. `http://localhost:3000/api/auth/callback/google`
- This template uses NextAuth callbacks to create a Mongoose user for OAuth sign-ins.
- Ensure MONGODB_URI and NEXTAUTH_SECRET are set in `.env.local`.
