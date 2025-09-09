import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  employeeName: string;
  position: string;
  photoPath?: string;
  lat: number;
  lng: number;
  distance: number;
  status: 'accepted' | 'rejected';
  createdAt: Date;
}

const AttendanceSchema: Schema = new Schema({
  employeeName: String,
  position: String,
  photoPath: String,
  lat: Number,
  lng: Number,
  distance: Number,
  status: { type: String, enum: ['accepted', 'rejected'], default: 'accepted' },
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);