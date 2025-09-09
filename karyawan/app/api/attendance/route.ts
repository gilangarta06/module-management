import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { connectToDatabase } from '../../../lib/mongoose';
import Attendance from '../../../models/Attendance';
import Settings from '../../../models/Settings';
import { haversineDistance } from '../../../utils/haversine';
import { NextResponse } from 'next/server';

// setup multer storage to public/uploads
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'selfie-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

const handler = nextConnect();

handler.use(upload.single('photo'));

handler.post(async (req:any, res:any) => {
  try {
    await connectToDatabase();
    const { name, position, lat, lng } = req.body;
    const s = await Settings.findOne();
    const officeLat = s?.officeLat ?? Number(process.env.NEXT_PUBLIC_OFFICE_LAT) ?? 0;
    const officeLng = s?.officeLng ?? Number(process.env.NEXT_PUBLIC_OFFICE_LNG) ?? 0;
    const radius = s?.radiusMeter ?? Number(process.env.NEXT_PUBLIC_RADIUS) ?? 100;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    const distance = haversineDistance(latNum, lngNum, Number(officeLat), Number(officeLng));

    const status = distance <= Number(radius) ? 'accepted' : 'rejected';

    const doc = await Attendance.create({
      employeeName: name,
      position,
      photoPath: req.file ? '/uploads/' + req.file.filename : undefined,
      lat: latNum,
      lng: lngNum,
      distance,
      status
    });

    return res.status(200).json(doc);
  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

handler.get(async (req:any, res:any) => {
  try {
    await connectToDatabase();
    const url = new URL(req.url, 'http://localhost');
    const name = url.searchParams.get('name') || undefined;
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const query:any = {};
    if (name) query.employeeName = { $regex: name, $options: 'i' };
    if (from || to) query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) {
      const dt = new Date(to);
      dt.setDate(dt.getDate()+1);
      query.createdAt.$lte = dt;
    }

    const rows = await Attendance.find(query).sort({ createdAt: -1 }).lean();
    return res.status(200).json(rows);
  } catch (e:any) {
    return res.status(500).json({ message: e.message });
  }
});

export const GET = async (req: Request) => {
  // fallback for Next.js edge handling - delegate to handler
  return new Response('Use /api/attendance with GET/POST via node handler', { status: 200 });
};

export default handler;