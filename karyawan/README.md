# Absensi Digital (Next.js 14 + TypeScript + App Router)

Project skeleton for a digital attendance system (Absensi Digital).

## Features
- Employee management (CRUD) saved in MongoDB via Mongoose
- Attendance form with:
  - Camera selfie upload saved to `/public/uploads`
  - Browser GPS capture
  - Location validation using Haversine formula with configurable office point & radius
- Reports with filtering & CSV export
- Settings to configure office coordinates, radius, and working hours
- Tailwind CSS with dark theme

## How to run (locally)
1. Extract `absensi-digital.zip`.
2. Create `.env` in the project root with:
```
MONGODB_URI="your_mongodb_connection_string"
NEXT_PUBLIC_OFFICE_LAT=...
NEXT_PUBLIC_OFFICE_LNG=...
```
3. Install dependencies:
```bash
npm install
```
4. Create uploads folder:
```bash
mkdir -p public/uploads
```
5. Run:
```bash
npm run dev
```

## Notes
- API routes are under `app/api/*`.
- Uploads are saved to `public/uploads`. In production, consider external object storage.
- Use modern browsers for camera & geolocation features.