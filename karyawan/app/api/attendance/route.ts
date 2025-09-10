// app/api/attendance/route.ts
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { connectToDatabase } from '../../../lib/mongoose';
import Attendance from '../../../models/Attendance';
import Settings from '../../../models/Settings';
import { haversineDistance } from '../../../utils/haversine';
import { NextResponse } from 'next/server';

// Setup multer storage untuk public/uploads
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'selfie-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

// Create the handler
const handler = nextConnect();

// Middleware: upload single file (photo)
handler.use(upload.single('photo'));

// POST /api/attendance – Absensi dengan foto
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json(); // Gunakan req.json() di Edge Runtime
    const { name, position, lat, lng } = body;

    // Ambil pengaturan kantor
    const s = await Settings.findOne();
    const officeLat = s?.officeLat ?? Number(process.env.NEXT_PUBLIC_OFFICE_LAT) ?? 0;
    const officeLng = s?.officeLng ?? Number(process.env.NEXT_PUBLIC_OFFICE_LNG) ?? 0;
    const radius = s?.radiusMeter ?? Number(process.env.NEXT_PUBLIC_RADIUS) ?? 100;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    const distance = haversineDistance(latNum, lngNum, Number(officeLat), Number(officeLng));

    const status = distance <= Number(radius) ? 'accepted' : 'rejected';

    // Simpan ke database
    const doc = await Attendance.create({
      employeeName: name,
      position,
      photoPath: req['file'] ? '/uploads/' + req['file'].filename : undefined,
      lat: latNum,
      lng: lngNum,
      distance,
      status
    });

    return NextResponse.json(doc, { status: 200 });
  } catch (error: any) {
    console.error('Error saat mencatat absensi:', error);
    return NextResponse.json(
      { message: 'Gagal mencatat absensi', error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/attendance?name=...&from=...&to=...
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url, 'http://localhost');
    const name = url.searchParams.get('name') || undefined;
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const query: any = {};
    if (name) {
      query.employeeName = { $regex: name, $options: 'i' };
    }
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) {
        const dt = new Date(to);
        dt.setDate(dt.getDate() + 1);
        query.createdAt.$lte = dt;
      }
    }

    const rows = await Attendance.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error('Error saat mengambil data absensi:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data absensi', error: error.message },
      { status: 500 }
    );
  }
}
