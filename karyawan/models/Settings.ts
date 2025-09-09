import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  officeLat: number;
  officeLng: number;
  radiusMeter: number;
  workStart: string;
  workEnd: string;
}

const SettingsSchema: Schema = new Schema({
  officeLat: { type: Number, default: 0 },
  officeLng: { type: Number, default: 0 },
  radiusMeter: { type: Number, default: 100 },
  workStart: { type: String, default: '08:00' },
  workEnd: { type: String, default: '17:00' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);