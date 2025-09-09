import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongoose';
import Employee from '../../../models/Employee';

export async function GET() {
  await connectToDatabase();
  const data = await Employee.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const payload = await req.json();
  await connectToDatabase();
  try {
    const doc = await Employee.create(payload);
    return NextResponse.json(doc);
  } catch (e:any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}