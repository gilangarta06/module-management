import mongoose, { Schema } from "mongoose";

export interface ISettings {
  officeLat: number;
  officeLng: number;
  radiusMeters: number;
  jamMasuk: string;
  jamPulang: string;
}

const SettingsSchema = new Schema<ISettings>({
  officeLat: { type: Number, required: true, default: 0 },
  officeLng: { type: Number, required: true, default: 0 },
  radiusMeters: { type: Number, required: true, default: 100 },
  jamMasuk: { type: String, required: true, default: "09:00" },
  jamPulang: { type: String, required: true, default: "17:00" },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
