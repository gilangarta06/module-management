import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  position: string;
  nik: string;
  photo?: string;
  createdAt: Date;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  nik: { type: String, required: true, unique: true },
  photo: { type: String },
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);