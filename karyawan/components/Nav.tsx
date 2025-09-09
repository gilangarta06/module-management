import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="flex gap-4 mb-6">
      <Link href="/"><span className="px-3 py-2 rounded hover:bg-gray-700">Dashboard</span></Link>
      <Link href="/employees"><span className="px-3 py-2 rounded hover:bg-gray-700">Karyawan</span></Link>
      <Link href="/attendance"><span className="px-3 py-2 rounded hover:bg-gray-700">Absensi</span></Link>
      <Link href="/reports"><span className="px-3 py-2 rounded hover:bg-gray-700">Laporan</span></Link>
      <Link href="/settings"><span className="px-3 py-2 rounded hover:bg-gray-700">Pengaturan</span></Link>
    </nav>
  );
}