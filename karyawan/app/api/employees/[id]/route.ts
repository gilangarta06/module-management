import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongoose';
import Employee from '../../../../models/Employee';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = req.url.split('/').pop();
  await connectToDatabase();
  const doc = await Employee.findById(id);
  if (!doc) return NextResponse.json({message:'Not found'},{status:404});
  return NextResponse.json(doc);
}

export async function PUT(req: Request) {
  const id = req.url.split('/').pop();
  const payload = await req.json();
  await connectToDatabase();
  const doc = await Employee.findByIdAndUpdate(id, payload, { new: true });
  return NextResponse.json(doc);
}

export async function DELETE(req: Request) {
  const id = req.url.split('/').pop();
  await connectToDatabase();
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}