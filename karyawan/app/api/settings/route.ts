import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongoose';
import Settings from '../../../models/Settings';

export async function GET() {
  await connectToDatabase();
  const s = await Settings.findOne();
  return NextResponse.json(s || {});
}

export async function PUT(req: Request) {
  const payload = await req.json();
  await connectToDatabase();
  let s = await Settings.findOne();
  if (!s) s = await Settings.create(payload);
  else Object.assign(s, payload);
  await s.save();
  return NextResponse.json(s);
}