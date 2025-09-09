import mongoose, { Schema } from "mongoose";

export interface IKaryawan {
  nama: string;
  jabatan: string;
  nip: string;
  foto?: string;
}

const KaryawanSchema = new Schema<IKaryawan>({
  nama: { type: String, required: true },
  jabatan: { type: String, required: true },
  nip: { type: String, required: true, unique: true },
  foto: { type: String }
}, { timestamps: true });

export default mongoose.models.Karyawan || mongoose.model("Karyawan", KaryawanSchema);
