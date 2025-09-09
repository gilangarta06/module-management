import mongoose, { Schema } from "mongoose";

export interface IAttendance {
  karyawanId?: mongoose.Types.ObjectId;
  nama: string;
  jabatan: string;
  fotoPath: string;
  lat: number;
  lng: number;
  status: "accepted" | "rejected";
  reason?: string;
  createdAt?: Date;
}

const AttendanceSchema = new Schema<IAttendance>({
  karyawanId: { type: Schema.Types.ObjectId, ref: "Karyawan" },
  nama: { type: String, required: true },
  jabatan: { type: String, required: true },
  fotoPath: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  status: { type: String, enum: ["accepted", "rejected"], required: true },
  reason: { type: String }
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
